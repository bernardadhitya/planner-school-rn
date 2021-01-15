import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBoy46A_88qGbu8AQJ2Q3LKGUoUijhaUrc",
  authDomain: "school-planny-service.firebaseapp.com",
  projectId: "school-planny-service",
  storageBucket: "school-planny-service.appspot.com",
  messagingSenderId: "202842890181",
  appId: "1:202842890181:web:1ebcdfa922c378d0a075ac"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// export const createAssignment = async (assignmentData, classId) => {
//   const { title, instructions, dueDate } = assignmentData;
//   await db.collection('assignments').add({
//     title,
//     instructions,
//     dueDate
//   })
//   .then(async (assignmentRef) => {
//     const classData = await getClassById(classId);
//     const { assignments } = classData;
//     assignments.push({
//       assignment_id: assignmentRef.id,
//       title,
//       students: {
//         graded: [],
//         submitted: []
//       }
//     });
//     await db.collection('classes').doc(classId).update({
//       assignments
//     });
//   })
// }

export const createMoodPost = async (moodData) => {
  const { datePosted, responses, userID } = moodData;
  await db.collection('moods').add({
    datePosted,
    responses,
    userID
  });
}

export const createAssignmentPost = async (assignmentData) => {
  const { chapter, deadline, note, title, subject, classID } = assignmentData;
  console.log('data to send:', assignmentData);

  await db.collection('assignments').add({
    chapter,
    deadline,
    note,
    title,
    subject,
    classID
  });

  console.log('data sent')
}

// export const createSubmission = async (submissionData) => {
//   const { assignmentId, studentId, classId, attachment } = submissionData;
//   await db.collection('submissions').add({
//     assignment_id: assignmentId,
//     student_id: studentId,
//     class_id: classId,
//     attachment,
//     status: 'submitted'
//   });
// }

// export const gradeSubmissionById = async (submissionId, grade) => {
//   const { score, teacherNote } = grade;
//   const submissionData = await getSubmissionById(submissionId);
//   const { class_id: classId, assignment_id, student_id } = submissionData;

//   //give additional fields score and teacher note, and change status to graded
//   await db.collection('submissions').doc(submissionId).update({
//     score,
//     teacher_note: teacherNote,
//     status: 'graded'
//   })

//   const classWithAssignment = await getClassById(classId);
//   const { assignments } = classWithAssignment;

//   //move the previously submitted assignment in class to graded
//   const updatedAssignments = assignments.map((assignment) => {
//     const { assignment_id: id, students } = assignment;
//     if (id === assignment_id) {
//       const { submitted, graded } = students;
//       const newSubmitted = submitted.filter((student) => student !== student_id);
//       const newGraded = graded;
//       newGraded.push(student_id);

//       return {
//         assignment_id: id,
//         students: {
//           submitted: newSubmitted,
//           graded: newGraded
//         }
//       }
//     } else {
//       return assignment
//     }
//   });

//   await db.collection('classes').doc(classId).update({
//     assignments: updatedAssignments
//   });
// }

export const getAssignmentsByClassId = async (classID) => {
  const response = await db.collection('assignments').where("classID", "==", classID).get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { assignment_id: responseId, ...responseData }
  });
  return data;
}

export const getAllClasses = async () => {
  const response = await db.collection('classes').get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { class_id: responseId, ...responseData }
  });
  return data;
}

export const getAllUsers = async () => {
  const response = await db.collection('users').get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { user_id: responseId, ...responseData }
  });
  return data;
}

export const getAllStudents = async () => {
  const response = await db.collection('users').where("role", "==", "student").get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { user_id: responseId, ...responseData }
  });
  return data;
}

export const getAllTeachers = async () => {
  const response = await db.collection('users').where("role", "==", "teacher").get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { user_id: responseId, ...responseData }
  });
  return data;
}

export const getAllMoodsByUserId = async (userID) => {
  const response = await db.collection('moods').where("userID", "==", userID).get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { mood_id: responseId, ...responseData }
  });
  return data;
}

export const getClassById = async (classId) => {
  const response = await db.collection('classes').doc(classId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { classId: responseId, ...responseData};
}

export const getUserById = async (userId) => {
  const response = await db.collection('users').doc(userId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { userId: responseId, ...responseData};
}

export const getAssignmentById = async (assignmentId) => {
  const response = await db.collection('assignments').doc(assignmentId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { assignmentId: responseId, ...responseData};
}

// export const getSubmissionById = async (submissionId) => {
//   const response = await db.collection('submissions').doc(submissionId).get();
//   const responseId = response.id;
//   const responseData = response.data();
//   return { submissionId: responseId, ...responseData};
// }

export const getClassesByUserId = async (userId) => {
  const userData = await getUserById(userId);
  const { classes } = userData;

  const getClassesData = async () => {
    return Promise.all(classes.map(classId => getClassById(classId)));
  };

  const classesData = await getClassesData();

  return classesData;
}

export const getAllStudentsMood = async () => {
  const allStudents = await getAllStudents();

  const getAllStudentsMoodData = async (students) => {
    return Promise.all(students.map(async (student) => {
      const studentMoods = await getAllMoodsByUserId(student.user_id)
      return {
        user_id: student.user_id,
        name: student.name,
        moods: studentMoods
      }
    }));
  };

  const allStudentsMoodData = await getAllStudentsMoodData(allStudents);

  return allStudentsMoodData;
}

// export const getSubmissionByUserIdAndAssignmentId = async (userId, assignmentId) => {
//   const response = await db.collection('submissions')
//     .where('student_id', '==', userId)
//     .where('assignment_id', '==', assignmentId)
//     .get();
//   const responseId = response.id;
//   const responseData = response.data();
//   return { submissionId: responseId, ...responseData};
// }

// export const getUsersByUserId = async (usersId) => {
//   const getUsersData = async () => {
//     return Promise.all(usersId.map(userId => getUserById(userId)));
//   }

//   const usersData = await getUsersData();

//   return usersData;
// }

// export const getGradedAssignmentsByUserId = async (userId) => {
//   const userData = await getUserById(userId);
//   const { classes } = userData;

//   const getGradedAssignments = async () => {
//     return Promise.all(classes.map(async (classId) => {
//       const classData = await getClassById(classId);
//       const { assignments } = classData;
      
//       const gradedAssignments = assignments.map((assignment) => {
//         const { assignment_id, students: { graded } } = assignment;
//         if (userId in graded) {
//           return assignment_id
//         } else {
//            return;
//         }
//       });
//       return gradedAssignments;
//     }))
//   }
  
// }
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

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
const storage = firebase.storage().ref();

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
  await db.collection('assignments').add({
    chapter,
    deadline,
    note,
    title,
    subject,
    classID
  });
}

export const createSubmissionPost = async (submissionData) => {
  const { studentID, assignmentID, filePath } = submissionData;
  const response = await db.collection('submissions').add({
    studentID,
    assignmentID,
    filePath
  });
  const submissionId = response.id;
  return submissionId;
}

export const uploadImage = async (uri, imageFulPath) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = storage.child(imageFulPath);
  return ref.put(blob);
}

export const getImageUrlByImageRef = async (imageRef) => {
  const response = await imageRef.getDownloadURL().then((url) => {
    return url;
  }).catch(function (error) {
    console.log(error)
  });
  return response;
}

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

export const getAllSchedules = async () => {
  const response = await db.collection('schedules').get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { schedule_id: responseId, ...responseData }
  });
  return data;
}

export const getSchedulesByClassId = async (classID) => {
  const response = await db.collection('schedules').where("classID", "==", classID).get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { schedule_id: responseId, ...responseData }
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

export const getSubmissionById = async (submissionId) => {
  const response = await db.collection('submissions').doc(submissionId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { submissionId: responseId, ...responseData};
}

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

export const getAllSchedulesByTeacherId = async (teacherID) => {
  const userData = await getUserById(teacherID);
  const { classes } = userData;

  const getSchedulesData = async () => {
    return Promise.all(classes.map(classData => getSchedulesByClassId(classData.classID)));
  };

  const schedulesData = await getSchedulesData();

  return schedulesData;
}

export const getSubmissionStatus = async (assignment, studentID) => {
  const getMedia = async (result) => {
    return await getImageUrlByImageRef(result[0])
  };
  const {assignment_id} = assignment;
  console.log(assignment_id, studentID)
  const response = await db.collection('submissions')
    .where("assignmentID", "==", assignment_id)
    .where("studentID", "==", studentID)
    .get();
  
  const submitted = response.docs.length > 0;
  const submissionID = submitted ? response.docs[0].id : null;
  const submissionData = submitted ? response.docs[0].data() : null;

  const folderPath = `/${submissionID}`;
  const fileNames = await storage.child(folderPath).listAll();
  const image = submitted ? await getMedia(fileNames.items) : null;

  console.log(image);

  const submittedData = submitted ? {
    submissionID,
    ...submissionData,
    image
  } : null;
  return { ...assignment, submitted, submittedData };
}

export const getAllSubmissionStatusByUserId = async (studentID, classID) => {
  const assignmentsData = await getAssignmentsByClassId(classID);
  console.log(assignmentsData);

  const getAllSubmissionStatusData = async () => {
    return Promise.all(assignmentsData.map(assignment => {
      const submissionStatus = getSubmissionStatus(assignment, studentID);
      return submissionStatus;
    }));
  };

  const allSubmissionStatusData = await getAllSubmissionStatusData();

  return allSubmissionStatusData;
}
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherHomePage from "../../Containers/HomePage/TeacherHomePage";
import TeacherClassPage from "../../Containers/LiveClassPage/TeacherClassPage";
import TeacherAssignmentPage from "../../Containers/AssignmentPage/TeacherAssignmentPage";
import TeacherStudentPage from "../../Containers/StudentPage/TeacherStudentPage";
import LiveClassVideoCallPage from "../../Containers/LiveClassPage/LiveClassVideoCallPage";
import TeacherGamePage from "../../Containers/GamesPage/TeacherGamePage";
import TeacherMoodTrackerPage from "../../Containers/MoodTrackerPage/TeacherMoodTrackerPage";
import MoodTrackerPage from "../../Containers/MoodTrackerPage/MoodTrackerPage";
import MoodTrackerSinglePage from "../../Containers/MoodTrackerPage/MoodTrackerSinglePage";
import CalendarPage from "../../Containers/CalendarPage/CalendarPage";
import TeacherAllAssignmentPage from "../../Containers/AssignmentPage/TeacherAllAssignmentPage";
import TeacherStudentSubmissionsPage from "../../Containers/AssignmentPage/TeacherStudentSubmissionsPage";

const Stack = createStackNavigator();

const TeacherMoodTrackerRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="MoodTrackers"
    >
      <Stack.Screen
        options={{
          headerTitle: "MoodTrackers"
        }}
        name="MoodTrackers"
        component={TeacherMoodTrackerPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "MoodTracker"
        }}
        name="MoodTracker"
        component={MoodTrackerPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "MoodTrackerSingle"
        }}
        name="MoodTrackerSingle"
        component={MoodTrackerSinglePage}
      />
    </Stack.Navigator>
  )
}

const TeacherRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        options={{
          headerTitle: "Home"
        }}
        name="Home"
        component={TeacherHomePage}
      />
      <Stack.Screen
        options={{
          headerTitle: "MoodTracker"
        }}
        name="MoodTracker"
        component={TeacherMoodTrackerRoute}
      />
      <Stack.Screen
        options={{
          headerTitle: "Assignments"
        }}
        name="Assignments"
        component={TeacherAssignmentPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "Students"
        }}
        name="Students"
        component={TeacherStudentPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "Calendar"
        }}
        name="Calendar"
        component={CalendarPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "AllAssignments"
        }}
        name="AllAssignments"
        component={TeacherAllAssignmentPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "Submissions"
        }}
        name="Submissions"
        component={TeacherStudentSubmissionsPage}
      />
    </Stack.Navigator>
  )
}

export default TeacherRouter;
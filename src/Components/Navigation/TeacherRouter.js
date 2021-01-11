import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherHomePage from "../../Containers/HomePage/TeacherHomePage";
import TeacherClassPage from "../../Containers/LiveClassPage/TeacherClassPage";
import TeacherAssignmentPage from "../../Containers/AssignmentPage/TeacherAssignmentPage";
import TeacherStudentPage from "../../Containers/StudentPage/TeacherStudentPage";
import LiveClassVideoCallPage from "../../Containers/LiveClassPage/LiveClassVideoCallPage";
import TeacherGamePage from "../../Containers/GamesPage/TeacherGamePage";
import TeacherMoodTrackerPage from "../../Containers/MoodTrackerPage/TeacherMoodTrackerPage";

const Stack = createStackNavigator();

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
        component={TeacherMoodTrackerPage}
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
        component={LiveClassVideoCallPage}
      />
    </Stack.Navigator>
  )
}

export default TeacherRouter;
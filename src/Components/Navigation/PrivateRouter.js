import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import IconHome from "../../Assets/icons/IconHome";
import IconAssignments from "../../Assets/icons/IconCalendar";
import AssignmentPage from "../../Containers/AssignmentPage/AssignmentPage";
import HomePage from "../../Containers/HomePage/HomePage";
import CalendarPage from "../../Containers/CalendarPage/CalendarPage";
import AllAssignmentPage from "../../Containers/AssignmentPage/AllAssignmentPage";
import IconMood from "../../Assets/icons/IconMood";
import IconProfile from "../../Assets/icons/IconProfile";
import MoodTrackerPage from "../../Containers/MoodTrackerPage/MoodTrackerPage";
import DailyQuizPage from "../../Containers/MoodTrackerPage/DailyQuizPage";

const Tabs = AnimatedTabBarNavigator();
const Stack = createStackNavigator();

const HomeRoute = () => {
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
        component={HomePage}
      />
      <Stack.Screen
        options={{
          headerTitle: "Assignments"
        }}
        name="Assignments"
        component={AllAssignmentPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "Assignment"
        }}
        name="Assignment"
        component={AssignmentPage}
      />
    </Stack.Navigator>
  )
}

const MoodTrackerRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="MoodTracker"
    >
      <Stack.Screen
        options={{
          headerTitle: "MoodTracker"
        }}
        name="MoodTracker"
        component={MoodTrackerPage}
      />
      <Stack.Screen
        options={{
          headerTitle: "DailyQuiz"
        }}
        name="DailyQuiz"
        component={DailyQuizPage}
      />
    </Stack.Navigator>
  )
}

const PrivateRouter = () => {

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#FFFFFF",
        inactiveTintColor: '#598BFF'
      }}

      appearence={{
        activeTabBackgrounds: ['#598BFF', '#598BFF', '#598BFF', '#598BFF'],
        shadow: true,
        whenActiveShow: 'icon-only'
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeRoute}
        options={{ tabBarIcon: ({ focused }) => (
          <IconHome color='#FFFFFF' focused={focused}/>
        )}}
      />
      <Tabs.Screen
        name="Calendar"
        component={CalendarPage}
        options={{ tabBarIcon: ({ focused }) => (
          <IconAssignments color='#FFFFFF' focused={focused}/>
        )}}
      />
      <Tabs.Screen
        name="Mood"
        component={MoodTrackerRoute}
        options={{ tabBarIcon: ({ focused }) => (
          <IconMood color='#FFFFFF' focused={focused}/>
        )}}
      />
      <Tabs.Screen
        name="Profile"
        component={CalendarPage}
        options={{ tabBarIcon: ({ focused }) => (
          <IconProfile color='#FFFFFF' focused={focused}/>
        )}}
      />
    </Tabs.Navigator>
  );
};

export default PrivateRouter;
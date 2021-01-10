import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import IconHome from "../../Assets/icons/IconHome";
import IconAssignments from "../../Assets/icons/IconAssignments";
import AssignmentPage from "../../Containers/AssignmentPage/AssignmentPage";
import HomePage from "../../Containers/HomePage/HomePage";
import CalendarPage from "../../Containers/CalendarPage/CalendarPage";
import AllAssignmentPage from "../../Containers/AssignmentPage/AllAssignmentPage";

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

const PrivateRouter = () => {

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#FFFFFF",
        inactiveTintColor: '#598BFF'
      }}

      appearence={{
        activeTabBackgrounds: ['#598BFF', '#598BFF'],
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
          <IconAssignments color='#56BBB4' focused={focused}/>
        )}}
      />
    </Tabs.Navigator>
  );
};

export default PrivateRouter;
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import IconHome from "../../Assets/icons/IconHome";
import IconAssignments from "../../Assets/icons/IconAssignments";
import AssignmentPage from "../../Containers/AssignmentPage/AssignmentPage";
import HomePage from "../../Containers/HomePage/HomePage";

const Tabs = AnimatedTabBarNavigator();

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
        component={HomePage}
        options={{ tabBarIcon: ({ focused }) => (
          <IconHome color='#FFFFFF' focused={focused}/>
        )}}
      />
      <Tabs.Screen
        name="Assignments"
        component={AssignmentPage}
        options={{ tabBarIcon: ({ focused }) => (
          <IconAssignments color='#56BBB4' focused={focused}/>
        )}}
      />
    </Tabs.Navigator>
  );
};

export default PrivateRouter;
import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import { Fonts } from "../../Constants/Fonts";
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { AuthContext } from "../../Helper/AuthProvider";
import HomePanel from '../../Components/HomePanel/HomePanel';
import { View } from 'react-native';
import IconLogout from '../../Assets/icons/IconLogout';
import { getAssignmentsByClassId } from '../../../firebase';

const Stack = createStackNavigator();

const Feed = () => {
  const {
    user: {
      name,
      class: { classID }
    },
    logout
  } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAssignments = await getAssignmentsByClassId(classID);
      setAssignments(fetchedAssignments);
    }
    fetchData();
  }, []);
  
  if(!fontsLoaded){
    return <AppLoading/>
  } else {
    return ( 
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: "center",
              marginTop: 64,
              marginBottom: 16
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity style={{
                marginRight: 10,
                height: 50,
                width: 50,
                backgroundColor: '#598BFF',
                borderRadius: 25,
                marginTop: 10
              }}>
              </TouchableOpacity>
              <View style={{
                paddingTop: 14,
                paddingBottom: 6,
                paddingHorizontal: 10
              }}>
                <Text style={{ fontFamily: 'Bold', fontSize: 20 }}>
                  Hi, {name}!
                </Text>
                <Text style={{ fontFamily: 'SemiBold', fontSize: 12, marginVertical: 10 }}>
                  Sabtu, 24 Oktober 2020
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10
                }}
                onPress={() => {
                  logout();
                }}
              >
                <IconLogout />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.View}>
            <HomePanel type='Calendar'/>
          </View>
          <View style={styles.View}>
            <HomePanel type='Assignments' viewAll data={assignments}/>
          </View>
          <View style={{height: 100}}></View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const HomePage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          }
        }}
        component={Feed}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  View: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
});

export default HomePage;
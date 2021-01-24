import React, { useContext, useState, useEffect, useRef } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  Button
} from "react-native";
import { Fonts } from "../../Constants/Fonts";
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { AuthContext } from "../../Helper/AuthProvider";
import HomePanel from '../../Components/HomePanel/HomePanel';
import { View } from 'react-native';
import IconLogout from '../../Assets/icons/IconLogout';
import { getAllSubmissionStatusByUserId, getSchedulesByClassId } from '../../../firebase';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import moment from 'moment';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomePage = () => {
  const {
    user: { user_id, name, class: { classID } },
    logout
  } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
    } );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAssignments = await getAllSubmissionStatusByUserId(user_id, classID);
      const fetchedSchedules = await getSchedulesByClassId(classID);

      console.log(fetchedAssignments);

      const scheduleToday = fetchedSchedules.filter(schedule => {
        const scheduleDay = new Date(schedule.dayAndTime.seconds * 1000).getDay();
        const currentDay = new Date().getDay();
        return scheduleDay === currentDay;
      }).sort((a,b) => {
        const firstDate = new Date(a.dayAndTime.seconds * 1000);
        const secondDate = new Date(b.dayAndTime.seconds * 1000);
        return firstDate.getHours() - secondDate.getHours();
      });

      const currentDate = new Date().getTime();
      const filteredAssignments =
        fetchedAssignments.filter(assignment => {
          const { deadline } = assignment;
          return deadline.seconds * 1000 > currentDate;
        }).sort((firstAssignment, secondAssignment) => {
          return firstAssignment.deadline.seconds - secondAssignment.deadline.seconds
        });

      setAssignments(filteredAssignments);
      setSchedules(scheduleToday);
    }
    fetchData();
  }, []);

  const generateNotificationBody = () => {
    const unsubmittedAssignments = assignments.filter(assignment => !assignment.submitted)
    return schedules.length > 0 ?
      `Jangan lupa kamu ada ${schedules.length} kelas hari ini!`
      : `Jangan lupa kerjain ${unsubmittedAssignments.length} PR kamu yahh`

  }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: `Halo, ${name} 😁`,
      body: generateNotificationBody(),
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  
  const getDateStringInIndonesian = (date) => {
    const daysInIndonesia = [
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
      'Minggu'
    ];
    const monthsIndIndonesia = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];

    const time = moment(date).format('HH:mm')

    return `${daysInIndonesia[date.getDay()]}, ${date.getDate()} ${monthsIndIndonesia[date.getMonth()]} ${date.getFullYear()} \t${time} WIB`;
  }

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
              <Image
                source={require('../../Assets/logo/Student.png')}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <TouchableOpacity
                style={{
                  paddingTop: 14,
                  paddingBottom: 6,
                  paddingHorizontal: 10
                }}
                onPress={async () => {await sendPushNotification(expoPushToken)}}
              >
                <Text style={{ fontFamily: 'Bold', fontSize: 20 }}>
                  Hi, {name}!
                </Text>
                <Text style={{ fontFamily: 'SemiBold', fontSize: 12, marginVertical: 10 }}>
                  {getDateStringInIndonesian(new Date())}
                </Text>
              </TouchableOpacity>
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
            <HomePanel type='Calendar' data={schedules}/>
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
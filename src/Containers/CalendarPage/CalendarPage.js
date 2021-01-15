import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import { Calendar } from '@ui-kitten/components';
import IconBook from '../../Assets/icons/IconBook';
import IconBookmark from '../../Assets/icons/IconBookmark';
import IconClock from '../../Assets/icons/IconClock';
import { useContext } from 'react';
import { AuthContext } from '../../Helper/AuthProvider';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import { getAllSchedules } from '../../../firebase';
import moment from 'moment';
import _ from 'lodash';

const CalendarPage = () => {
  const navigation = useNavigation();
  const { user: { role } } = useContext(AuthContext);
  let [fontsLoaded] = useFonts(Fonts);
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAllSchedules = await getAllSchedules();
      const formattedSchedules = fetchedAllSchedules.map(schedule => {
        const { schedule_id, subject, dayAndTime } = schedule;
        const startDate = new Date(dayAndTime.seconds * 1000);
        const endDate = new Date((dayAndTime.seconds + 3600) * 1000);

        const startTime = moment(startDate).format('hh:mm');
        const endTime = moment(endDate).format('hh:mm');
        
        return {
          schedule_id,
          subject,
          date: startDate,
          day: startDate.getDay(),
          startTime,
          endTime
        }
      })
      setSchedules(formattedSchedules);
    }
    fetchData();
  }, []);

  const renderSchedule = (schedule) => {
    const { subject } = schedule;
    return (
      <View
        style={{
          borderWidth: 1,
          padding: 20,
          borderRadius: 8,
          borderColor: '#DDDDDD',
          marginTop: 14
        }}
      >
        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: '#598BFF'}}>
          {subject}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <IconClock/>
          <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
            1 Jam (60 menit)
          </Text>
        </View>
      </View>
    )
  }

  const renderSchedules = () => {
    const schedulesOnSelectedDay = schedules.filter(schedule => 
      schedule.day === date.getDay()
    ).sort((a,b) => {return a.date.getHours() - b.date.getHours()});

    return schedulesOnSelectedDay.map(schedule => {
      const { startTime, endTime } = schedule;

      return (
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 21
          }}>
            <IconBookmark/>
            <Text style={{
              fontFamily: 'SemiBold',
              marginLeft: 10
            }}>
             { `${startTime} - ${endTime}`}
            </Text>
          </View>
          {renderSchedule(schedule)}
        </View>
      )
    })
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return ( 
      <SafeAreaView
        style={{
          flex: 1,
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
              marginTop: 50,
              marginBottom: 30,
              flexDirection: 'row'
            }}
          >
            {role === 'teacher' ? <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => { navigation.goBack() }}
            >
              <IconBack/>
            </TouchableOpacity> : null}
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Kalender</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
          }}>
            <Calendar
              date={date}
              onSelect={nextDate => setDate(nextDate)}
            />
          </View>
          {renderSchedules()}
          <View style={{height: 50}}></View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default CalendarPage;
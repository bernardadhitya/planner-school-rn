import React, { useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import { Calendar } from '@ui-kitten/components';
import IconBook from '../../Assets/icons/IconBook';
import IconBookmark from '../../Assets/icons/IconBookmark';
import IconClock from '../../Assets/icons/IconClock';

const CalendarPage = () => {
  let [fontsLoaded] = useFonts(Fonts);
  const [date, setDate] = useState(new Date());

  const renderSchedule = () => {
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
          Ilmu Pengetahuan Alam
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <IconBook/>
          <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
            Reaksi Redoks dan Elektrokimia
          </Text>
        </View>
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
            07.30 - 08.30
          </Text>
        </View>
        {renderSchedule()}
        {renderSchedule()}
      </View>
    );
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
              marginTop: 50
            }}
          >
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Kalender</Text>
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
            {renderSchedules()}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default CalendarPage;
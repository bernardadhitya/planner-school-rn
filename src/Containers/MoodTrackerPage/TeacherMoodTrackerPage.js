import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import { getAllStudentsMood } from '../../../firebase';
import IconEmotion2 from '../../Assets/icons/IconEmotion2';
import IconEmotion3 from '../../Assets/icons/IconEmotion3';
import IconEmotion4 from '../../Assets/icons/IconEmotion4';

const TeacherMoodTrackerPage = () => {
  const navigation = useNavigation();
  const [studentsData, setStudentsData] = useState([]);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAllStudentsMoodData = await getAllStudentsMood();
      setStudentsData(fetchedAllStudentsMoodData);
    }
    fetchData();
  }, []);

  const renderStudentMoodCard = (userID, name, moods) => {
    console.log('moods ===>', moods);
    const recentMood = moods.sort((firstMood, secondMood) => secondMood.datePosted.seconds - firstMood.datePosted.seconds)[0];
    const { responses } = recentMood;
    const averageMood = 
    Math.round((responses['1'] + responses['2'] + responses['3'] + responses['4']) / 4);

    const IconEmotions = {
      0: <IconEmotion1 focused/>,
      1: <IconEmotion2 focused/>,
      2: <IconEmotion3 focused/>,
      3: <IconEmotion4 focused/>,
      4: <IconEmotion4 focused/>,
    }
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderColor: '#C7C7C7'
        }}
        onPress={() => { navigation.navigate('MoodTracker',
          {
            userID,
            studentName: name
          }
        ) }}
      >
        <Image
          source={require('../../Assets/logo/Student.png')}
          style={{
            width: 75,
            height: 75,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'SemiBold'
            }}
          >
            { name }
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Regular',
              marginTop: 8
            }}
          >
            {`Total refleksi: ${moods.length}`}
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
          <View style={{ justifyContent: 'center' }}>
            { IconEmotions[averageMood]}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderStudentMoodPanel = () => {
    if (studentsData.length < 1) return;
    return studentsData.map(student => 
      renderStudentMoodCard(student.user_id, student.name, student.moods)
    )
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return ( 
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <ScrollView style={{paddingHorizontal: 20}}>
          <View
            style={{
              flex: 1,
              marginTop: 50,
              marginBottom: 30,
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => { navigation.goBack() }}
            >
              <IconBack/>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Mood Tracker</Text>
          </View>
          {renderStudentMoodPanel()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherMoodTrackerPage;
import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Helper/AuthProvider';
import IconBack from '../../Assets/icons/IconBack';
import { getAllMoodsByUserId } from '../../../firebase';
import IconEmotion2 from '../../Assets/icons/IconEmotion2';
import IconEmotion3 from '../../Assets/icons/IconEmotion3';
import IconEmotion4 from '../../Assets/icons/IconEmotion4';
import MoodLegend from '../../Components/MoodTrackerPanel/MoodLegend';
import getDateStringInIndonesian from '../../Constants/Date';

const MoodTrackerPage = (props) => {
  const { user: { user_id, role, name } } = useContext(AuthContext);
  const { route: { params } } = props;
  const [refresh, setRefresh] = useState(0);
  const [moods, setMoods] = useState([]);
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMoodsByUserID = await getAllMoodsByUserId(
        role === 'student' ? user_id : params.userID
      );
      const sortedFetchedMoods = fetchedMoodsByUserID.sort((firstMood, secondMood) =>
        secondMood.datePosted.seconds - firstMood.datePosted.seconds)
      setMoods(sortedFetchedMoods);
    }
    fetchData();
  }, [refresh]);

  const renderMoodCard = (datePosted, responses) => {
    const formattedDatePosted = new Date(datePosted.seconds * 1000);
    const averageMood = Math.round((responses[1] + responses[2] + responses[3] + responses[4]) / 4) ;
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
          borderTopWidth: 1,
          borderColor: '#C7C7C7'
        }}
        onPress={() => { navigation.navigate('MoodTrackerSingle', 
          {datePosted: getDateStringInIndonesian(formattedDatePosted, true), responses}
        )}}
      >
        <View style={{ justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Regular'
            }}
          >
            { getDateStringInIndonesian(formattedDatePosted, true) }
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
          <View style={{ justifyContent: 'center'}}>
            { IconEmotions[averageMood] }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderMoodPanel = () => {
    return (
      <View style={{width: '100%', marginTop: 20}}>
        { moods
          .sort((firstMood, secondMood) =>
            secondMood.datePosted.seconds - firstMood.datePosted.seconds)
          .map(mood => renderMoodCard(mood.datePosted, mood.responses)) }
      </View>
    )
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const hasFilledReflection = 
      moods.length === 0 || 
      getDateStringInIndonesian(new Date(), true) === getDateStringInIndonesian(new Date(moods[0].datePosted.seconds * 1000), true);
    const buttonColor = hasFilledReflection ? '#AAAAAA' : '#598BFF';
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
            { role === 'teacher' ? <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => { navigation.goBack() }}
            >
              <IconBack/>
            </TouchableOpacity> : null }
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Mood Tracker</Text>
          </View>
          <View style={{
            marginTop: 20,
            alignItems: 'center'
          }}>
            <Image
              source={require('../../Assets/logo/Student.png')}
              style={{
                width: 110,
                height: 110,
              }}
            />
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 21,
              marginTop: 20
            }}>
              { role === 'student' ? name : params.studentName }
            </Text>
            <Text style={{
              fontFamily: 'Regular',
              fontSize: 16,
              marginTop: 10
            }}>
              Total refleksi: { moods.length }
            </Text>
            { role === 'student' ? <TouchableOpacity
              style={{
                marginTop: 20,
                width: '100%',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                backgroundColor: buttonColor,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingTop: 16,
                paddingBottom: 16,
                alignItems: 'center',
              }}
              disabled={hasFilledReflection}
              onPress={() => {
                navigation.navigate(
                  'DailyQuiz',
                  { onGoBack: () => {setRefresh(refresh + 1)}}
                )
              }}
            >
              <Text
                style={{
                  fontFamily: 'Bold',
                  fontSize: 16,
                  color: '#FFFFFF'
                }}
              >
                Mulai Refleksi Hari Ini
              </Text>
            </TouchableOpacity> : null}
            <MoodLegend/>
            { renderMoodPanel() }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default MoodTrackerPage;
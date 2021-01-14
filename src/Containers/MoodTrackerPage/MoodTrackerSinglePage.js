import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import IconEmotion2 from '../../Assets/icons/IconEmotion2';
import IconEmotion3 from '../../Assets/icons/IconEmotion3';
import IconEmotion4 from '../../Assets/icons/IconEmotion4';

const MoodTrackerSinglePage = (props) => {
  const { route: { params } } = props;
  const { datePosted, responses } = params;
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const renderQuizCard = (question, response) => {
    return (
      <View style={{
        paddingVertical: 25,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#C7C7C7'
      }}>
        <Text style={{textAlign: 'center'}}>{question}</Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <View
            style={{margin: 20}}
          >
            <IconEmotion1 focused={response === 0}/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion2 focused={response === 1}/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion3 focused={response === 2}/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion4 focused={response === 3}/>
          </View>
        </View>
      </View>
    )
  }

  const renderQuizPanel = () => {
    return (
      <View>
        {renderQuizCard('Bagaimana harimu hari ini?', responses[1])}
        {renderQuizCard('Seberapa puas kamu dengan bimbingan guru yang telah diberikan?', responses[2])}
        {renderQuizCard('Bagaimana relasimu dengan teman-teman di sekolah?', responses[3])}
        {renderQuizCard('Apakah perilakuku sudah mencerminkan apa yang ingin aku capai?', responses[4])}
      </View>
    )
  }

  const renderResult = () => {
    const averageMood = Math.round((responses[1] + responses[2] + responses[3] + responses[4]) / 4) ;
    const IconEmotions = {
      0: <IconEmotion1 focused/>,
      1: <IconEmotion2 focused/>,
      2: <IconEmotion3 focused/>,
      3: <IconEmotion4 focused/>,
      4: <IconEmotion4 focused/>,
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderColor: '#C7C7C7'
        }}
      >
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Regular'
            }}
          >
            { datePosted }
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
          <View style={{justifyContent: 'center'}}>
            <Text>Mood hari ini: </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            { IconEmotions[averageMood] }
          </View>
        </View>
      </View>
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
          {renderResult()}
          {renderQuizPanel()}
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 20
            }}
          >
            {responses[5]}
          </Text>
        </ScrollView>
        <View style={{height: 50}}></View>
      </SafeAreaView>
    )
  }
}

export default MoodTrackerSinglePage;
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
import { Input } from '@ui-kitten/components';

const DailyQuizPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const renderQuizCard = (question) => {
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
          <TouchableOpacity
            style={{margin: 20}}
          >
            <IconEmotion1/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 20}}
          >
            <IconEmotion2/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 20}}
          >
            <IconEmotion3/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 20}}
          >
            <IconEmotion4/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderQuizPanel = () => {
    return (
      <View>
        {renderQuizCard('Bagaimana harimu hari ini?')}
        {renderQuizCard('Seberapa puas kamu dengan bimbingan guru yang telah diberikan?')}
        {renderQuizCard('Bagaimana relasimu dengan teman-teman di sekolah?')}
        {renderQuizCard('Apakah perilakuku sudah mencerminkan apa yang ingin aku capai?')}
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
          {renderQuizPanel()}
          <Input
            multiline={true}
            textStyle={{ minHeight: 128 }}
            placeholder='Tulis refleksimu hari ini...'
            style={{
              marginTop: 20
            }}
          />
          <TouchableOpacity
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
              backgroundColor: '#598BFF',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 16,
              paddingBottom: 16,
              alignItems: 'center',
            }}
            onPress={() => { navigation.navigate('DailyQuiz') }}
          >
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#FFFFFF'
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{height: 50}}></View>
      </SafeAreaView>
    )
  }
}

export default DailyQuizPage;
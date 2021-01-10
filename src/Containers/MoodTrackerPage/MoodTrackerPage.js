import React from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import { useNavigation } from '@react-navigation/native';

const MoodTrackerPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const renderMoodCard = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#C7C7C7'
        }}
        onPress={() => { navigation.navigate('MoodTrackerSingle') }}
      >
        <View style={{ justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Regular'
            }}
          >
            07/07/2020
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
          <View style={{ justifyContent: 'center'}}>
            <IconEmotion1/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderMoodPanel = () => {
    return (
      <View style={{width: '100%', marginTop: 20}}>
        { renderMoodCard() }
        { renderMoodCard() }
        { renderMoodCard() }
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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Mood Tracker</Text>
          </View>
          <View style={{
            marginTop: 20,
            alignItems: 'center'
          }}>
            <Image
              source={require('../../Assets/logo/Student.png')}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 21,
              marginTop: 20
            }}>
              Bernard
            </Text>
            <Text style={{
              fontFamily: 'Regular',
              fontSize: 16,
              marginTop: 10
            }}>
              Total refleksi: 20
            </Text>
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
                Mulai Refleksi Hari Ini
              </Text>
            </TouchableOpacity>
            { renderMoodPanel() }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default MoodTrackerPage;
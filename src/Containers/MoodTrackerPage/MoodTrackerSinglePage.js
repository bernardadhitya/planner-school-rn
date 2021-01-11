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

const MoodTrackerSinglePage = () => {
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
          <View
            style={{margin: 20}}
          >
            <IconEmotion1/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion2/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion3/>
          </View>
          <View
            style={{margin: 20}}
          >
            <IconEmotion4/>
          </View>
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

  const renderResult = () => {
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
            07/07/2020
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
            <IconEmotion1 focused/>
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
            Et enim dolor adipisicing consectetur laborum ullamco aute pariatur sit voluptate. Anim irure sint in aliqua ea occaecat mollit voluptate qui aliqua reprehenderit sunt fugiat veniam. Quis et minim dolore labore eiusmod irure sunt ullamco. Ut deserunt veniam ex magna est mollit incididunt sit nostrud. Nisi labore ullamco et ullamco veniam. Voluptate reprehenderit quis mollit cillum reprehenderit ullamco culpa nostrud laborum nisi.
          </Text>
        </ScrollView>
        <View style={{height: 50}}></View>
      </SafeAreaView>
    )
  }
}

export default MoodTrackerSinglePage;
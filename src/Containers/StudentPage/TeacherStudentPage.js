import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';

const TeacherMoodTrackerPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const renderStudentCard = () => {
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
            Biyan Alya Safira
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Regular',
              marginTop: 8
            }}
          >
           089512345678
          </Text>
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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Daftar Murid</Text>
          </View>
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
          {renderStudentCard()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherMoodTrackerPage;
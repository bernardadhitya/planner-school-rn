import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import DetailedSubjects from '../../Constants/Subjects';
import ThumbnailCard from '../../Components/ThumbnailCard/ThumbnailCard';
import { useNavigation } from '@react-navigation/native';

const AllAssignmentPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const renderThumbnails = () => {
    const formattedSubjects = [];
    let temp = []

    DetailedSubjects.forEach((subject, idx) => {
      if (idx % 2 === 0){
        temp = [subject];
      } else {
        temp.push(subject);
        formattedSubjects.push(temp);
      }
    })

    console.log(formattedSubjects);

    return formattedSubjects.map((subjects) => {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}>
          { subjects.map(subject => {
            return (
              <ThumbnailCard
                title={subject.name}
                subtitle={'Total: 3 tugas'}
                image={subject.image}
                redirectTo={'Assignment'}
              />
            )
          })}
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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Tugas</Text>
          </View>
          { renderThumbnails() }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default AllAssignmentPage;
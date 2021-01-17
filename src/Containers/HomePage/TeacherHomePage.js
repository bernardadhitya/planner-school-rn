import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import IconLogout from '../../Assets/icons/IconLogout';
import { AuthContext } from "../../Helper/AuthProvider";
import ThumbnailCard from '../../Components/ThumbnailCard/ThumbnailCard';
import TeacherMenu from '../../Constants/TeacherMenu';

const TeacherHomePage = () => {
  const { user: { name }, logout } = useContext(AuthContext);
  let [fontsLoaded] = useFonts(Fonts);

  const renderThumbnails = () => {
    const formattedSubjects = [];
    let temp = []

    TeacherMenu.forEach((subject, idx) => {
      if (idx % 2 === 0){
        temp = [subject];
        if (idx === TeacherMenu.length - 1) {
          formattedSubjects.push(temp);
        }
      } else {
        temp.push(subject);
        formattedSubjects.push(temp);
      }
    })

    return formattedSubjects.map((subjects) => {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          { subjects.map(subject => {
            return (
              <ThumbnailCard
                title={subject.name}
                image={subject.image}
                redirectTo={subject.redirectTo}
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
        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: "center",
              marginTop: 64,
              marginBottom: 16
            }}
          >
            <View style={styles.container}>
              <Image
                source={require('../../Assets/logo/Student.png')}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <View style={{
                paddingTop: 14,
                paddingBottom: 6,
                paddingHorizontal: 10
              }}>
                <Text style={{ fontFamily: 'Bold', fontSize: 20 }}>
                  Hi, {name}!
                </Text>
                <Text style={{ fontFamily: 'SemiBold', fontSize: 12, marginVertical: 10 }}>
                  Sabtu, 24 Oktober 2020
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10
                }}
                onPress={() => {
                  logout();
                }}
              >
                <IconLogout />
              </TouchableOpacity>
            </View>
          </View>
          {renderThumbnails()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  layout: {
    justifyContent: 'center',
    marginVertical: 10
  },
  center: {
    justifyContent: 'center',
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  }
});

export default TeacherHomePage;
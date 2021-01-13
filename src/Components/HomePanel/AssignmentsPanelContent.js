import React, { useContext } from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import CharacterMrTeacher from '../../Assets/characters/CharacterMrTeacher';
import { ScrollView } from 'react-native';
import { Characters } from '../../Constants/Characters';
import { Colors } from '../../Constants/Colors';
import { AuthContext } from '../../Helper/AuthProvider';

const ASSIGNMENTS = [
  {
    title: 'Play “Marry Has a Little Lamb”'
  }
]

const AssignmentsPanelContent = () => {
  const { user: {username} } = useContext(AuthContext);
  let [fontsLoaded] = useFonts(Fonts);

  const renderAssignmentsPanelCard = (backgroundColor, title, className, teacherName, avatar) => {
    return (
      <View style={styles.column, {marginRight: 4, padding: 10}}>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}>
          <View style={{
            margin: 8,
            backgroundColor: '#E3466D',
            width: 60,
            padding: 6,
            borderRadius: 10
          }}>
            <Text style={{
              textAlign: 'center',
              fontFamily: 'Regular',
              color: '#FFFFFF'
            }}>
              5 hari
            </Text>
          </View>
          <View style={{
            marginBottom: 15,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              source={require('../../Assets/logo/Chemistry.png')}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text style={{
              fontFamily: 'SemiBold',
              fontSize: 16,
              flexShrink: 1,
              textAlign: 'center',
              marginTop: 8
            }}>
              {title}
            </Text>
            <Text style={{
              fontFamily: 'Regular',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 8
            }}>
              26/10/2020
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const renderPanel = () => {
    return (
      <View style={styles.row}>
        <ScrollView horizontal>
          { renderAssignmentsPanelCard(Colors.aqua, 'Do exercise 2A\nno.1-5', 'Science', 'Naomi', 4) }
          { renderAssignmentsPanelCard(Colors.yellow, 'Exercise page\n12-13 no. 1-10', 'Mathematics', 'Naomi', 0) }
          { renderAssignmentsPanelCard(Colors.yellow, 'Exercise page\n1-5', 'Mathematics', 'Naomi', 0) }
        </ScrollView>
      </View>
    )
  }

  return fontsLoaded ? renderPanel() : <AppLoading/>;
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  View: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default AssignmentsPanelContent
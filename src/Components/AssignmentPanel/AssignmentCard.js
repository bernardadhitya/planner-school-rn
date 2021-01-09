import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Layout } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import CharacterMrTeacher from '../../Assets/characters/CharacterMrTeacher';
import IconImageAttachment from '../../Assets/icons/IconImageAttachment';
import { Characters } from '../../Constants/Characters';
import IconBook from '../../Assets/icons/IconBook';
import IconClock from '../../Assets/icons/IconClock';

const AssignmentCard = (props) => {
  const {title, color, avatar, teacherName, className, detail} = props;
  let [fontsLoaded] = useFonts(Fonts);

  return fontsLoaded ? (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        borderRadius: 8,
        borderColor: '#DDDDDD',
        marginTop: 14
      }}
    >
      <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: '#598BFF'}}>
        Ilmu Pengetahuan Alam
      </Text>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <IconBook/>
        <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
          Reaksi Redoks dan Elektrokimia
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <IconClock/>
        <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
          1 Jam (60 menit)
        </Text>
      </View>
    </View>
  ) : <AppLoading/>;
}

const styles = StyleSheet.create({
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
  }
});

export default AssignmentCard
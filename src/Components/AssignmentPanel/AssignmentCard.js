import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import IconBook from '../../Assets/icons/IconBook';
import IconClock from '../../Assets/icons/IconClock';
import getDateStringInIndonesian from '../../Constants/Date';

const AssignmentCard = (props) => {
  const {title, chapter, deadline, note, showNote, onClick} = props;
  let [fontsLoaded] = useFonts(Fonts);

  const formattedDeadline = new Date(deadline * 1000);
  const currentDate = new Date();
  const dueInDays = Math.floor((formattedDeadline - currentDate) / (1000*60*60*24));

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
        { title }
      </Text>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <IconBook/>
        <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
          { chapter }
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <IconClock/>
        <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
          {`Batas: ${getDateStringInIndonesian(formattedDeadline, true)} (${dueInDays} hari)`}
        </Text>
      </View>
      {showNote ?
        <View>
          <Text style={{fontFamily: 'SemiBold', fontSize: 12, marginTop: 12}}>
            Catatan:
          </Text>
          <Text style={{fontFamily: 'Regular', fontSize: 12, marginTop: 12}}>
            {note}
          </Text>
        </View>
      : null}
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
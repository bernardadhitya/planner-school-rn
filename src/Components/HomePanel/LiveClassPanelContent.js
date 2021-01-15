import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import IconBook from '../../Assets/icons/IconBook';
import IconClock from '../../Assets/icons/IconClock';
import moment from 'moment';

const LiveClassPanelContent = (props) => {
  const { schedules } = props;
  let [fontsLoaded] = useFonts(Fonts);

  const renderScheduleCard = (schedule) => {
    const { subject, dayAndTime } = schedule;

    const formattedStartDate = new Date(dayAndTime.seconds * 1000);
    const formattedEndDate = new Date((dayAndTime.seconds + 3600) * 1000);
    const startTime = moment(formattedStartDate).format('hh:mm');
    const endTime = moment(formattedEndDate).format('hh:mm');

    return (
      <View style={{backgroundColor: '#F9F9FB', borderRadius: 10, marginBottom: 10}}>
        <View style={styles.row}>
          <View style={{marginHorizontal: 25, marginVertical: 20}}>
            <Text style={{textAlign: 'center'}}>{startTime}</Text>
            <Text style={{textAlign: 'center'}}>-</Text>
            <Text style={{textAlign: 'center'}}>{endTime}</Text>
          </View>
          <View style={{
            height: 50,
            width: 1,
            backgroundColor: '#A7A7A9',
            marginRight: 20,
            marginTop: 20
          }}></View>
          <View style={styles.center}>
            <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: '#598BFF'}}>
              {subject}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <IconClock/>
              <Text style={{fontFamily: 'Regular', fontSize: 12, marginLeft: 10}}>
                1 Jam (60 menit)
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderPanel = () => {
    return schedules.length > 0 ?
      schedules.map(schedule => renderScheduleCard(schedule))
      : <View>
          <Text style={{fontFamily: 'SemiBold', textAlign: 'center'}}>
            Tidak ada jadwal hari ini
          </Text>
        </View>;
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

export default LiveClassPanelContent
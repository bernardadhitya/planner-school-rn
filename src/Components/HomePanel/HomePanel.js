import { useFonts } from '@use-expo/font';
import React from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconAssignments from '../../Assets/icons/IconCalendar';
import IconGames from '../../Assets/icons/IconGames';
import IconLiveClass from '../../Assets/icons/IconLiveClass';
import { Fonts } from '../../Constants/Fonts';
import AssignmentsPanelContent from './AssignmentsPanelContent';
import GamesPanelContent from './GamesClassPanelContent';
import LiveClassPanelContent from './LiveClassPanelContent';
import { useNavigation } from '@react-navigation/native';

const HomePanel = (props) => {
  const { type, viewAll, data } = props;
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const panelHeaders = {
    Calendar: {
      title: "Jadwal Hari Ini",
      content: <LiveClassPanelContent schedules={data}/>
    },
    Assignments: {
      title: "Tugas",
      content: <AssignmentsPanelContent assignments={data}/>
    }
  }

  return (
    <View
      style={styles.column}
    >
      <View
        style={styles.row}
      >
        <View>
          <Text style={{
            fontFamily: 'Bold',
            fontSize: 16
          }}>
            {panelHeaders[type].title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          { viewAll ? <TouchableOpacity onPress={() => {
              navigation.navigate('Assignments', { data });
            }}>
            <Text style={{
              fontFamily: 'Medium',
              fontSize: 16,
              color: '#598BFF',
              justifyContent: 'center'
            }}>
              Lihat Semua
            </Text> 
          </TouchableOpacity> : null}
        </View>
      </View>
      <View style={{marginTop: 14}}>
        {panelHeaders[type].content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  View: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
});

export default HomePanel;
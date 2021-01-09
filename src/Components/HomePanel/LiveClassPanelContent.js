import React, { useContext } from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import CharacterMrTeacher from '../../Assets/characters/CharacterMrTeacher';
import { Characters } from '../../Constants/Characters';
import { AuthContext } from '../../Helper/AuthProvider';
import { Colors } from '../../Constants/Colors';
import IconBook from '../../Assets/icons/IconBook';
import IconClock from '../../Assets/icons/IconClock';

const LiveClassPanelContent = () => {
  const {user: {username}} = useContext(AuthContext);
  let [fontsLoaded] = useFonts(Fonts);

  const renderPanel = () => {
    return username === 'Bernard' ? (
      <View style={styles.row}>
      <View style={styles.column}>
        <View style={{backgroundColor: '#F9F9FB', borderRadius: 10}}>
          <View style={styles.row}>
            <View style={{marginHorizontal: 25, marginVertical: 20}}>
              <Text style={{textAlign: 'center'}}>07.30</Text>
              <Text style={{textAlign: 'center'}}>-</Text>
              <Text style={{textAlign: 'center'}}>08.30</Text>
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
          </View>
        </View>
      </View>
    </View>
    ) : (
      <View style={{alignItems: 'center', paddingTop: 14}}>
        <Text style={{fontFamily: 'SemiBold', fontSize: 14}}>There is no class online right now</Text>
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

export default LiveClassPanelContent
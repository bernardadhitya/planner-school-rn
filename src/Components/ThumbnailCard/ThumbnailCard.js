import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ThumbnailCard = (props) => {
  const navigation = useNavigation();
  const { title, subtitle, image, redirectTo } = props;
  let [fontsLoaded] = useFonts(Fonts);

  return fontsLoaded ? (
    <View style={styles.column, {padding: 10, width: '50%'}}>
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
        elevation: 3
      }}>
        <TouchableOpacity
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {navigation.navigate(redirectTo)}}
        >
          <Image
            source={image}
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
            {subtitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : <AppLoading/>;
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
  layout: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default ThumbnailCard
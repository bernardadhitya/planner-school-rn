import { Card } from '@ui-kitten/components';
import React from 'react';
import { View, Text } from 'react-native';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import IconEmotion2 from '../../Assets/icons/IconEmotion2';
import IconEmotion3 from '../../Assets/icons/IconEmotion3';
import IconEmotion4 from '../../Assets/icons/IconEmotion4';

const MoodLegend = () => {
  const moods = [
    {
      icon: <IconEmotion1 focused/>,
      text: 'Kurang Baik'
    },
    {
      icon: <IconEmotion2 focused/>,
      text: 'Baik'
    },
    {
      icon: <IconEmotion3 focused/>,
      text: 'Sangat Baik'
    },
    {
      icon: <IconEmotion4 focused/>,
      text:'Luar Biasa'
    }
  ]
  return (
    <Card style={{width: '100%', marginTop: 13}}>
      <Text
        style={{
          fontFamily: 'SemiBold',
          textAlign: 'center',
          marginBottom: 14
        }}
      >
        Keterangan
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%'
        }}
      >
        {moods.map(mood => {
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
              {mood.icon}
              <View style={{height: 10}}></View>
              <Text
                style={{
                  fontFamily: 'Regular',
                  textAlign: 'center'
                }}
              >
                {mood.text}
              </Text>
            </View>
          )
        })}
      </View>
    </Card>
  )
}

export default MoodLegend;
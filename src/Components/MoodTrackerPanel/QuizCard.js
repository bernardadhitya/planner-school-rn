import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import IconEmotion1 from '../../Assets/icons/IconEmotion1';
import IconEmotion2 from '../../Assets/icons/IconEmotion2';
import IconEmotion3 from '../../Assets/icons/IconEmotion3';
import IconEmotion4 from '../../Assets/icons/IconEmotion4';

const QuizCard = (props) => {
  const { question, questionNumber, selectedOption, handleSelectOption } = props
  let [fontsLoaded] = useFonts(Fonts);

  return fontsLoaded ? (
    <View style={{
      paddingVertical: 25,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#C7C7C7'
    }}>
      <Text style={{textAlign: 'center'}}>{question}</Text>
      <View style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {handleSelectOption(questionNumber, 0)}}
        >
          <IconEmotion1
            focused={selectedOption === 0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {handleSelectOption(questionNumber, 1)}}
        >
          <IconEmotion2
            focused={selectedOption === 1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {handleSelectOption(questionNumber, 2)}}
        >
          <IconEmotion3
            focused={selectedOption === 2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {handleSelectOption(questionNumber, 3)}}
        >
          <IconEmotion4
            focused={selectedOption === 3}
          />
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

export default QuizCard
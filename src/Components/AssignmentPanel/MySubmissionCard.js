import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import MySubmissionCardContent from './MySubmissionCardContent';
import { Spinner } from '@ui-kitten/components';

const MySubmissionCard = (props) => {
  const {status, onClick, onSubmit, loading, image, fileName, grade, teacherNote} = props;
  let [fontsLoaded] = useFonts(Fonts);

  const renderGradedResult = () => {
    if (grade === -1) return;
    return (
      <>
        <Text style={{fontFamily: 'Bold', fontSize: 12, marginTop: 12}}>
          {`Nilai: ${grade}/100`}
        </Text>
        <Text style={{fontFamily: 'Bold', fontSize: 12, marginTop: 12}}>
          Catatan:
        </Text>
        <Text style={{fontFamily: 'Regular', fontSize: 12, marginTop: 8}}>
          {teacherNote}
        </Text>
      </>
    )
  }

  return fontsLoaded ? (
    <View style={styles.row, {marginVertical: 10}} level='3'>
      <View style={styles.column, {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
      }} level='3'>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 20
        }}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={{fontFamily: 'Medium', fontSize: 12}}>
                Status Tugas
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{
                fontFamily: 'Medium',
                fontSize: 12,
                textAlign: 'right',
                color: '#9CCB38',
                textTransform: 'capitalize'
              }}>
                {status}
              </Text>
            </View>
          </View>
          {renderGradedResult()}
          <MySubmissionCardContent
            status={status}
            image={image}
            fileName={fileName}
            onClick={onClick}
            onSubmit={onSubmit}
          />
          {loading ? <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <View style={{justifyContent: 'center'}}>
              <Spinner/>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily: 'SemiBold', marginLeft: 10}}>Uploading...</Text>
            </View>
          </View> : null}
        </View>
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

export default MySubmissionCard
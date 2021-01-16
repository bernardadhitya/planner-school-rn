import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity, Image } from 'react-native';
import IconImageAttachment from '../../Assets/icons/IconImageAttachment';

const MySubmissionCardContent = (props) => {
  const { status, image, fileName, onClick, onSubmit } = props
  let [fontsLoaded] = useFonts(Fonts);

  const renderAssignedContent = () => (
    <View>
      <Text style={{fontFamily: 'Regular', fontSize: 10, color: '#EF5B54', marginTop: 6}}>
        Jangan lupa unggah tugas sebelum batas pengumpulan!
      </Text>
      {image ? 
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{ uri: image }}
              style={{height: 50, width: 50, marginVertical: 10}}
            />
          </View>
          <View style={{justifyContent: 'center', marginLeft: 10}}>
            <Text style={{fontSize: 10, fontFamily: 'SemiBold', marginBottom: 4}}>{fileName}</Text>
            <Text style={{fontSize: 10, fontFamily: 'Regular'}}>{new Date().toLocaleDateString('id')}</Text>
          </View>
        </View>
      : null}
      <TouchableOpacity onPress={() => {onClick()}}>
        <View style={styles.center, {
          marginTop: 16,
          alignItems: 'center',
          paddingVertical: 10,
          borderColor: '#598BFF',
          borderWidth: 1,
          borderRadius: 8
        }}>
          <Text style={{fontFamily: 'Medium', fontSize: 12, color: '#598BFF'}}>
            + Unggah tugas
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {onSubmit()}}>
        <View style={styles.center, {
          marginTop: 12,
          alignItems: 'center',
          paddingVertical: 10,
          backgroundColor: '#598BFF',
          borderRadius: 8
        }}>
          <Text style={{fontFamily: 'Medium', fontSize: 12, color: '#FFFFFF'}}>
            Kumpulkan
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSubmittedContent = () => (
    <View>
      <Text style={{fontFamily: 'Regular', fontSize: 10, color: '#63C7FD', marginTop: 6}}>
        Your assignment has been submitted. Please wait for your teacher to check your work
      </Text>
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <View style={{
          marginTop: 6,
        }}>
          <Card>
            <Layout style={styles.row}>
              <Layout style={styles.column, {marginRight: 35}}>
                <IconImageAttachment />
              </Layout>
              <Layout style={styles.column}>
                <Text style={{fontFamily: 'Medium', fontSize: 10}}>Bernard_Exercise.jpg</Text>
                <Text style={{fontFamily: 'Regular', fontSize: 8}}>2.4 MB</Text>
              </Layout>
            </Layout>
          </Card>
        </View>
      </TouchableOpacity>
    </View>
  )

  const renderGradedContent = () => (
    <View>
      <Text style={{fontFamily: 'Regular', fontSize: 10, marginTop: 6}}>
        Score
      </Text>
      <Text style={{fontFamily: 'SemiBold', fontSize: 12}}>
        9/10
      </Text>
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <View style={{
          marginTop: 6,
        }}>
          <Card>
            <Layout style={styles.row}>
              <Layout style={styles.column, {marginRight: 35}}>
                <IconImageAttachment />
              </Layout>
              <Layout style={styles.column}>
                <Text style={{fontFamily: 'Medium', fontSize: 10}}>Bernard_Exercise.jpg</Text>
                <Text style={{fontFamily: 'Regular', fontSize: 8}}>2.4 MB</Text>
              </Layout>
            </Layout>
          </Card>
        </View>
      </TouchableOpacity>
      <Text style={{fontFamily: 'Regular', fontSize: 10, marginTop: 12}}>
        Teacher's Note
      </Text>
      <Card>
        <Text style={{fontFamily: 'Regular', fontSize: 12}}>
        Good job! Keep up the good work
        </Text>
      </Card>
    </View>
  )

  const renderSubmissionContent = () => {
    const submissionContents = {
      berjalan: renderAssignedContent(),
      selesai: renderSubmittedContent(),
      graded: renderGradedContent()
    }
    return submissionContents[status]
  };

  return fontsLoaded ? (
    <Layout>
      { renderSubmissionContent() }
    </Layout>
  ) : <AppLoading/>;
};

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

export default MySubmissionCardContent
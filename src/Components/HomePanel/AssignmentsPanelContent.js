import React from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native';
import DetailedSubjects from '../../Constants/Subjects';
import { useNavigation } from '@react-navigation/native';
import { assign } from 'lodash';

const AssignmentsPanelContent = (props) => {
  const navigation = useNavigation();
  const { assignments } = props;
  let [fontsLoaded] = useFonts(Fonts);

  const renderThumbnaiImage = (thumbnailSubject) => {
    const thumbailImage = DetailedSubjects.filter(
      subject => subject.name === thumbnailSubject)[0];
    return (
      <Image
        source={thumbailImage.image}
        style={{
          width: 80,
          height: 80,
        }}
      />
    )
  }

  const renderAssignmentsPanelCard = (assignment) => {
    const { title, deadline, subject } = assignment;

    const formattedDeadline = new Date(deadline.seconds * 1000)
    const currentDate = new Date();

    const dueInDays = Math.floor((formattedDeadline - currentDate) / (1000*60*60*24));

    return (
      <TouchableOpacity
        style={styles.column, {marginRight: 4, padding: 10}}
        onPress={() => {navigation.navigate('Assignment', { subject })}}
      >
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
          elevation: 3,
          width: 150,
          height: '100%'
        }}>
          <View style={{
            margin: 8,
            backgroundColor: '#E3466D',
            width: 80,
            padding: 6,
            borderRadius: 10
          }}>
            <Text style={{
              textAlign: 'center',
              fontFamily: 'Regular',
              color: '#FFFFFF'
            }}>
              {`${dueInDays} hari`}
            </Text>
          </View>
          <View style={{
            marginBottom: 15,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            { renderThumbnaiImage(subject) }
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
              {formattedDeadline.toLocaleDateString("id")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderPanel = () => {
    const currentDate = new Date().getTime();
    const filteredAssignments = assignments.length > 0 ?
      assignments.filter(assignment => {
        const { deadline } = assignment;
        return deadline.seconds * 1000 > currentDate;
      }).sort((firstAssignment, secondAssignment) => {
        return firstAssignment.deadline.seconds - secondAssignment.deadline.seconds
      })
    : [];

    return filteredAssignments.length > 0 ?
      <View style={styles.row}>
        <ScrollView horizontal>
          { assignments.map(assignment => renderAssignmentsPanelCard(assignment)) }
        </ScrollView>
      </View>
      : <View>
          <Text style={{fontFamily: 'SemiBold', textAlign: 'center'}}>
            Tidak ada tugas saat ini
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

export default AssignmentsPanelContent
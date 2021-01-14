import React, { useContext } from 'react';
import { useFonts } from '@use-expo/font';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native';
import { AuthContext } from '../../Helper/AuthProvider';
import DetailedSubjects from '../../Constants/Subjects';

const ASSIGNMENTS = [
  {
    title: 'Play “Marry Has a Little Lamb”'
  }
]

const AssignmentsPanelContent = (props) => {
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
      <View style={styles.column, {marginRight: 4, padding: 10}}>
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
      </View>
    )
  }

  const renderPanel = () => {
    if (assignments.length < 1) return null;
    return (
      <View style={styles.row}>
        <ScrollView horizontal>
          { assignments.map(assignment => renderAssignmentsPanelCard(assignment)) }
        </ScrollView>
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

export default AssignmentsPanelContent
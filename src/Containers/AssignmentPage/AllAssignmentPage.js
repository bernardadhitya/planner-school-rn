import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import DetailedSubjects from '../../Constants/Subjects';
import ThumbnailCard from '../../Components/ThumbnailCard/ThumbnailCard';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const AllAssignmentPage = (props) => {
  const navigation = useNavigation();
  const { route: { params }} = props;
  const { data } = params;
  const [assignments, setAssignments] = useState([]);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const formattedAssignments = data.map(assignment => {
        const { deadline } = assignment;
        const formattedDeadline = deadline.seconds;
        return {
          ...assignment,
          deadline: formattedDeadline,
        }
      })
      const groupedAssignments = _.groupBy(formattedAssignments, 'subject');
      console.log(groupedAssignments);
      setAssignments(groupedAssignments);
    }
    fetchData();
  }, []);

  const renderThumbnails = () => {
    const formattedSubjects = [];
    let temp = []

    DetailedSubjects.forEach((subject, idx) => {
      if (idx % 2 === 0){
        temp = [subject];
      } else {
        temp.push(subject);
        formattedSubjects.push(temp);
      }
    })

    return formattedSubjects.map((subjects) => {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}>
          { subjects.map(subject => {
            const totalAssignment = assignments[subject.name] !== undefined ?
              assignments[subject.name].length : 0
            return (
              <ThumbnailCard
                title={subject.name}
                subtitle={`Total: ${totalAssignment} tugas`}
                image={subject.image}
                redirectTo={'Assignment'}
              />
            )
          })}
        </View>
      )
    })
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return ( 
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <ScrollView style={{paddingHorizontal: 20}}>
          <View
            style={{
              flex: 1,
              marginTop: 50,
              marginBottom: 30,
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => { navigation.goBack() }}
            >
              <IconBack/>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Tugas</Text>
          </View>
          { renderThumbnails() }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default AllAssignmentPage;
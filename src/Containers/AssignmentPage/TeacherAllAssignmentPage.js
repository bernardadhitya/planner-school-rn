import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import AssignmentCard from '../../Components/AssignmentPanel/AssignmentCard';
import { AuthContext } from '../../Helper/AuthProvider';
import { getAllAssignmentsByClassesId } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

const TeacherAllAssignmentPage = () => {
  const navigation = useNavigation();
  const { user: {classes} } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date().getTime();
      const classesID = classes.map(classData => classData.classID);
      const fetchedAllAssignmentsByClassesId = await getAllAssignmentsByClassesId(classesID);
      const filteredAssignments =
        fetchedAllAssignmentsByClassesId
          .filter(assignment => {
            const { deadline } = assignment;
            return deadline.seconds * 1000 > currentDate;
          }).sort((firstAssignment, secondAssignment) => {
            return firstAssignment.deadline.seconds - secondAssignment.deadline.seconds
          });
      setAssignments(filteredAssignments);
    }
    fetchData();
  }, []);

  const renderAllAssignments = () => {
    return assignments.map(assignment => {
      return (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Submissions', {assignment})
        }}>
          <AssignmentCard
            title={assignment.title}
            chapter={assignment.chapter}
            deadline={assignment.deadline.seconds}
            note={assignment.note}
          />
        </TouchableOpacity>
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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Daftar Tugas</Text>
          </View>
          { renderAllAssignments() }
          <View style={{height: 50}}></View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherAllAssignmentPage;
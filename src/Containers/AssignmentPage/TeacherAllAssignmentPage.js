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

const TeacherAllAssignmentPage = () => {
  const { user: {classes} } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const classesID = classes.map(classData => classData.classID);
      const fetchedAllAssignmentsByClassesId = await getAllAssignmentsByClassesId(classesID);
      console.log(fetchedAllAssignmentsByClassesId);
      setAssignments(fetchedAllAssignmentsByClassesId);
    }
    fetchData();
  }, []);

  const renderAllAssignments = () => {
    return assignments.map(assignment => {
      return (
        <TouchableOpacity onPress={() => {}}>
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherAllAssignmentPage;
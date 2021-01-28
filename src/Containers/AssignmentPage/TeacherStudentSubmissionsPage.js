import React, { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import AssignmentCard from '../../Components/AssignmentPanel/AssignmentCard';
import { useNavigation } from '@react-navigation/native';
import { getSubmissionsDetailByAssignmentId } from '../../../firebase';
import IconSearch from '../../Assets/icons/IconSearch';
import ImageView from "react-native-image-viewing";


const TeacherStudentSubmissionsPage = (props) => {
  const navigation = useNavigation();
  const { route: { params } } = props;
  const { assignment: { assignment_id, title, chapter, deadline, note } } = params;
  const [submissions, setSubmissions] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [visible, setIsVisible] = useState(false);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSubmissionsDetail = await getSubmissionsDetailByAssignmentId(assignment_id);
      setSubmissions(fetchedSubmissionsDetail);
    }
    fetchData();
  }, []);

  const renderSubmissionCard = (submission) => {
    const { name, filePath, submissionID, submissionDate, image } = submission;
    const formattedSubmissionDate =
      new Date(submissionDate.seconds * 1000).toLocaleDateString("id");
    return (
      <View
        style={{
          borderWidth: 1,
          padding: 20,
          borderRadius: 8,
          borderColor: '#DDDDDD',
          marginTop: 14
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontFamily: 'SemiBold', fontSize: 16}}>
              {name}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Text style={{fontFamily: 'Regular', fontSize: 12, marginRight: 4}}>
                Waktu submit:
              </Text>
              <Text style={{fontFamily: 'Regular', fontSize: 12, color: '#298232'}}>
                { formattedSubmissionDate }
              </Text>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
            <View style={{width: 20}}></View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {
                setSelectedImage([{uri: image}])
                setIsVisible(true)
              }}>
                <IconSearch/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderSubmissionCards = () => {
    return submissions.length > 0 ? 
      submissions.map(submission => renderSubmissionCard(submission))
      :
      <View>
        <Text style={{fontFamily: 'SemiBold', textAlign: 'center', marginTop: 20}}>
          Tidak ada tugas saat ini
        </Text>
      </View>;
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
        <ImageView
          images={selectedImage}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>{title}</Text>
          </View>
          <AssignmentCard
            title={title}
            chapter={chapter}
            deadline={deadline.seconds}
            note={note}
            showNote
          />
          {renderSubmissionCards()}
        </ScrollView>
      </SafeAreaView>
    )
  }
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
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  }
});

export default TeacherStudentSubmissionsPage;
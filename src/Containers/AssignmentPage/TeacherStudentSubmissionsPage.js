import React, { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import AssignmentCard from '../../Components/AssignmentPanel/AssignmentCard';
import { useNavigation } from '@react-navigation/native';
import { getSubmissionsDetailByAssignmentId, gradeSubmissionPost } from '../../../firebase';
import IconSearch from '../../Assets/icons/IconSearch';
import ImageView from "react-native-image-viewing";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import MySubmissionCard from '../../Components/AssignmentPanel/MySubmissionCard';
import { Input } from '@ui-kitten/components';


const TeacherStudentSubmissionsPage = (props) => {
  const navigation = useNavigation();
  const { route: { params } } = props;
  const { assignment: { assignment_id, title, chapter, deadline, note } } = params;
  const [submissions, setSubmissions] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [teacherNote, setTeacherNote] = useState('');
  const [grade, setGrade] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSubmissionsDetail = await getSubmissionsDetailByAssignmentId(assignment_id);
      setSubmissions(fetchedSubmissionsDetail);
    }
    fetchData();
  }, [refresh]);

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
                setSelectedSubmission(submission);
                sheetRef.current.snapTo(1);
              }}>
                <IconSearch/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderAlert = () => {
    return Alert.alert(
      "Berhasil",
      "Nilai berhasil dimasukkan!",
      [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed")
        }
      ],
      { cancelable: false }
    );
  }

  const handleSubmitGrade = async () => {
    const { submission_id } = selectedSubmission;
    const gradingData = {
      submissionID: submission_id,
      grade,
      teacherNote
    };

    await gradeSubmissionPost(gradingData);

    sheetRef.current.snapTo(2);
    renderAlert();
    setGrade(0);
    setTeacherNote('');
    setRefresh(refresh + 1);
  }

  const renderGradingForm = () => {
    if (!selectedSubmission) return;
    if (selectedSubmission.grade !== -1) return;
    return (
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
            <Text style={{fontFamily: 'SemiBold', fontSize: 12, marginBottom: 12}}>
              Nilai Tugas
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Input
                placeholder='0'
                value={grade}
                onChangeText={nextValue => setGrade(nextValue)}
              />
              <View style={{justifyContent: 'center', marginLeft: 10}}>
                <Text style={{fontFamily: 'Bold'}}>/100</Text>
              </View>
            </View>
            <Text style={{fontFamily: 'SemiBold', fontSize: 12, marginVertical: 12}}>
              Catatan
            </Text>
            <Input
              multiline={true}
              textStyle={{ minHeight: 80 }}
              placeholder='Masukkan catatan disini'
              value={teacherNote}
              onChangeText={nextValue => setTeacherNote(nextValue)}
            />
            <TouchableOpacity onPress={() => {handleSubmitGrade()}}>
              <View style={styles.center, {
                marginTop: 12,
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: '#598BFF',
                borderRadius: 8
              }}>
                <Text style={{fontFamily: 'Medium', fontSize: 12, color: '#FFFFFF'}}>
                  Masukkan Nilai
                </Text>
              </View>
            </TouchableOpacity>
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

  let sheetRef = useRef(null);
  let fall = useMemoOne(() => new Animated.Value(1), []);

  const renderContent = () => {
    if (!selectedSubmission) return;
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{height: 10}}></View>
        <ScrollView
          style={{
            paddingTop: 40,
            paddingHorizontal: 16,
            height: 900
          }}
        >
          <Text style={{fontFamily: 'Bold', fontSize: 21}}>Tugas</Text>
          <MySubmissionCard
            grade={selectedSubmission.grade}
            teacherNote={selectedSubmission.teacherNote}
            status={'selesai'}
            onClick={() => {
              setSelectedImage([{uri: selectedSubmission.image}])
              setIsVisible(true)
            }}
            onSubmit={'handleSubmit'}
            loading={false}
            image={selectedSubmission.image}
            fileName={selectedSubmission.filePath}
          />
          {renderGradingForm()}
          <View style={{height: 800}}></View>
        </ScrollView>
      </View>
    )
  };

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    )
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
        <BottomSheet
          ref={sheetRef}
          initialSnap={2}
          callbackNode={fall}
          snapPoints={[600, 500, -100]}
          renderContent={renderContent}
          borderRadius={16}
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
        {renderShadow()}
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
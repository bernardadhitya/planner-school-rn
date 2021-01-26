import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Fonts } from "../../Constants/Fonts";
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import AssignmentCard from '../../Components/AssignmentPanel/AssignmentCard';
import AssignmentTabButton from '../../Components/AssignmentPanel/AssignmentTabButton';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MySubmissionCard from '../../Components/AssignmentPanel/MySubmissionCard';
import { useMemoOne } from 'use-memo-one';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import DetailedSubjects from '../../Constants/Subjects';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../../Helper/AuthProvider";
import { createSubmissionPost, getAllSubmissionStatusByUserId, uploadImage } from '../../../firebase';
import ImageView from "react-native-image-viewing";

const AssignmentPage = (props) => {
  const { user: { user_id, class: { classID } } } = useContext(AuthContext);
  const { route: {params} } = props;
  const { subject } = params;
  const navigation = useNavigation();
  const [assignments, setAssignments] = useState([]);
  const [selectedTab, setSelectedTab] = useState('berjalan');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAssignments = await getAllSubmissionStatusByUserId(user_id, classID);
      const currentDate = new Date().getTime();
      const assignmentsMatchSubject =
        fetchedAssignments
          .filter(assignment => assignment.subject === subject)
          .filter(assignment => {
            const { deadline } = assignment;
            return deadline.seconds * 1000 > currentDate;
          }).sort((firstAssignment, secondAssignment) => {
            return firstAssignment.deadline.seconds - secondAssignment.deadline.seconds
          });
      setAssignments(assignmentsMatchSubject);
    }
    fetchData();
  }, [refresh]);

  let sheetRef = useRef(null);
  let fall = useMemoOne(() => new Animated.Value(1), []);

  const handleClick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled){
      const filename = pickerResult.uri.split('/').pop();
      setFileName(filename);
      setImage(pickerResult.uri);
    }
  }

  const handleViewImage = () => {
    setSelectedImage([{uri: selectedAssignment.submittedData.image}])
    setIsVisible(true)
  }

  const renderAlert = () =>
    Alert.alert(
      "Berhasil",
      "Tugas berhasil ditambahkan!",
      [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed")
        }
      ],
      { cancelable: false }
    );



  const handleSubmit = async () => {
    setLoading(true);

    const submission = {
      studentID: user_id,
      assignmentID: selectedAssignment.assignment_id,
      filePath: fileName
    }

    const submissionID = await createSubmissionPost(submission);
    await uploadImage(image, submissionID + '/' + fileName);
    sheetRef.current.snapTo(2);

    setImage('');
    setFileName('');
    setLoading(false);
    renderAlert();
    setRefresh(refresh + 1);
  }

  const AssignedTab = () => {
    const assignedAssignments = assignments.filter(assignment => !assignment.submitted);

    return assignedAssignments.length > 0 ? assignedAssignments.map(assignment => {
      return (
        <TouchableOpacity onPress={() => {
          setSelectedAssignment(assignment);
          sheetRef.current.snapTo(1)
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
    :
    <Text style={{fontFamily: 'SemiBold', textAlign: 'center', marginTop: 21}}>
      Tidak ada tugas saat ini
    </Text>
  }

  const SubmittedTab = () => {
    const submittedAssignments = assignments.filter(assignment => assignment.submitted);

    return submittedAssignments.length > 0 ? submittedAssignments.map(assignment => {
      return (
        <TouchableOpacity onPress={() => {
          setSelectedAssignment(assignment);
          sheetRef.current.snapTo(1)
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
    :
    <Text style={{fontFamily: 'SemiBold', textAlign: 'center', marginTop: 21}}>
      Tidak ada tugas saat ini
    </Text>
  }

  const renderSelectedTab = () => {
    const tabsOption = {
      berjalan: <AssignedTab/>,
      selesai: <SubmittedTab/>
    }
    return tabsOption[selectedTab]
  }

  const renderContent = () => {
    console.log('selected assignment --->', selectedAssignment);
    if (selectedAssignment === null) return;
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 40,
          paddingHorizontal: 16,
          height: 900
        }}
      >
        <Text style={{fontFamily: 'Bold', fontSize: 21}}>Tugas</Text>
        <AssignmentCard
          title={selectedAssignment.title}
          chapter={selectedAssignment.chapter}
          deadline={selectedAssignment.deadline.seconds}
          note={selectedAssignment.note}
          showNote
        />
        <MySubmissionCard
          grade={
            !selectedAssignment.hasOwnProperty('submitted') || !selectedAssignment.submitted ? 
            -1 : selectedAssignment.submittedData.grade
          }
          teacherNote={
            !selectedAssignment.hasOwnProperty('submitted') || !selectedAssignment.submitted ?
            null : selectedAssignment.submittedData.teacherNote
          }
          status={selectedTab}
          onClick={selectedTab === 'berjalan' ? handleClick : handleViewImage}
          onSubmit={handleSubmit}
          loading={loading}
          image={
            !selectedAssignment.hasOwnProperty('submitted') || !selectedAssignment.submitted ? 
            image : selectedAssignment.submittedData.image
          }
          fileName={
            !selectedAssignment.hasOwnProperty('submitted') || !selectedAssignment.submitted ?
            fileName : selectedAssignment.submittedData.filePath
          }
        />
      </View>
    )
  };

  const renderAssignmentTabButton = (title) => {
    const isActive = selectedTab === title.toLowerCase();
    const active = isActive ? 'active' : 'inactive';
  
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setSelectedTab(title.toLowerCase())}
      >
        <AssignmentTabButton active={active} title={title}/>
      </TouchableOpacity>
    )
  }

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
            <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>Tugas</Text>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              source={DetailedSubjects.filter(
                subjectData => subjectData.name === subject)[0].image}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View style={{justifyContent: 'center', marginLeft: 20}}>
              <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>
                { subject }
              </Text>
              <Text style={{ fontFamily: 'Regular', fontSize: 14, marginTop: 10 }}>
                {`Total Tugas: ${assignments.length}`}
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            { renderAssignmentTabButton('Berjalan') }
            { renderAssignmentTabButton('Selesai') }
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 16,
              textTransform: 'capitalize'
            }}>
              {selectedTab}
            </Text>
            { renderSelectedTab() }
          </View>
          <View style={{height: 100}}></View>
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
export default AssignmentPage;
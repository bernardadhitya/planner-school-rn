import React, { useState, useRef } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image
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
import { Colors } from '../../Constants/Colors';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import DetailedSubjects from '../../Constants/Subjects';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { AuthContext } from "../../Helper/AuthProvider";
import { createSubmissionPost, uploadImage } from '../../../firebase';

const AssignmentPage = (props) => {
  const { user: { user_id } } = useContext(AuthContext);
  const { route: {params} } = props;
  const { subject, data: assignments } = params;
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('berjalan');
  const [selectedAssignment, setSelectedAssignment] = useState({});
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  let [fontsLoaded] = useFonts(Fonts);

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
      console.log(filename);
      console.log(pickerResult.uri);
      setFileName(filename);
      setImage(pickerResult.uri);
    }
  }

  const handleSubmit = async () => {
    setLoading(true);

    const submission = {
      studentID: user_id,
      assignmentID: selectedAssignment.assignment_id,
      filePath: fileName
    }
    console.log(submission);
    const submissionID = await createSubmissionPost(submission);
    await uploadImage(image, submissionID + '/' + fileName);
    sheetRef.current.snapTo(2);

    setImage('');
    setFileName('');
    setLoading(false);
  }

  const AssignedTab = () => {
    return assignments.map(assignment => {
      if (assignment.submitted) return;
      return (
        <TouchableOpacity onPress={() => {
          setSelectedAssignment(assignment);
          sheetRef.current.snapTo(1)
        }}>
          <AssignmentCard
            title={assignment.title}
            chapter={assignment.chapter}
            deadline={assignment.deadline}
            note={assignment.note}
          />
        </TouchableOpacity>
      )
    })
  }

  const SubmittedTab = () => {
    return assignments.map(assignment => {
      if (!assignment.submitted) return;
      return (
        <TouchableOpacity onPress={() => {
          setSelectedAssignment(assignment);
          sheetRef.current.snapTo(1)
        }}>
          <AssignmentCard
            title={assignment.title}
            chapter={assignment.chapter}
            deadline={assignment.deadline}
            note={assignment.note}
          />
        </TouchableOpacity>
      )
    })
  }
  
  const GradedTab = () => {
    return (
      <TouchableOpacity onPress={() => {
        sheetRef.current.snapTo(1)
      }}
      >
        <AssignmentCard
          className={'Mathematics - Class 1A'}
          teacherName={'Naomi'}
          avatar={0}
          color={Colors.yellow}
          title={'Exercise page 1-2 no. 1-5'}
        />
      </TouchableOpacity>
    )
  }

  const renderSelectedTab = () => {
    const tabsOption = {
      berjalan: <AssignedTab/>,
      selesai: <SubmittedTab/>,
      graded: <GradedTab/>
    }
    return tabsOption[selectedTab]
  }

  const renderContent = () => (
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
        deadline={selectedAssignment.deadline}
        note={selectedAssignment.note}
        showNote
      />
      <MySubmissionCard
        status={selectedTab}
        onClick={handleClick}
        onSubmit={handleSubmit}
        loading={loading}
        image={image}
        fileName={fileName}
      />
    </View>
  );

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
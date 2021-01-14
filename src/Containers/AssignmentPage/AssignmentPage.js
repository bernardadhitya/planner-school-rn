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

const AssignmentPage = (props) => {
  const { route: {params} } = props;
  const { subject, data: assignments } = params;
  console.log(assignments);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('assigned');
  let [fontsLoaded] = useFonts(Fonts);

  let sheetRef = useRef(null);
  let fall = useMemoOne(() => new Animated.Value(1), []);
  
  const AssignedTab = () => {
    return assignments.map(assignment => {
      return (
        <TouchableOpacity onPress={() => {
          sheetRef.current.snapTo(0)
        }}
        >
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
    return null
  }
  
  const GradedTab = () => {
    return (
      <TouchableOpacity onPress={() => {
        sheetRef.current.snapTo(0)
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
      assigned: <AssignedTab/>,
      submitted: <SubmittedTab/>,
      graded: <GradedTab/>
    }
    return tabsOption[selectedTab]
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 900
      }}
    >
      <Text style={{fontFamily: 'Bold', fontSize: 21}}>Assignments</Text>
      <AssignmentCard
        className={'Mathematics - Class 1A'}
        teacherName={'Naomi'}
        avatar={0}
        color={Colors.yellow}
        title={'Exercise page 12-13 no. 1-10'}
        detail
      />
      <MySubmissionCard status={selectedTab}/>
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
              source={require('../../Assets/logo/Chemistry.png')}
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
            { renderAssignmentTabButton('Assigned') }
            { renderAssignmentTabButton('Submitted') }
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
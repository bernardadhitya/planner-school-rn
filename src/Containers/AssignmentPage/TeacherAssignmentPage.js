import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import { Input, Select, SelectItem, IndexPath, Datepicker } from '@ui-kitten/components';

const TeacherAssignmentPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [date, setDate] = React.useState(new Date());

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
            <Text style={{fontFamily: 'Bold', fontSize: 21}}>Mood Tracker</Text>
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Input
              label='Judul'
            />
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Select
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
              label='Mata Pelajaran'
            >
              <SelectItem title='Option 1'/>
              <SelectItem title='Option 2'/>
              <SelectItem title='Option 3'/>
            </Select>
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Select
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
              label='Kelas'
            >
              <SelectItem title='Option 1'/>
              <SelectItem title='Option 2'/>
              <SelectItem title='Option 3'/>
            </Select>
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Datepicker
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              label='Batas Tanggal'
            />
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Input
              label='Subjek'
            />
          </View>

          <View style={{marginTop: 10, width: '100%'}}>
            <Input
              label='Catatan'
              multiline
              textStyle={{ minHeight: 80 }}
            />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              width: '100%',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              backgroundColor: '#598BFF',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 16,
              paddingBottom: 16,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#FFFFFF'
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View style={{height: 50}}></View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherAssignmentPage;
import React, { useEffect, useState} from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconBack from '../../Assets/icons/IconBack';
import { useNavigation } from '@react-navigation/native';
import { Input, Select, SelectItem, IndexPath, Datepicker } from '@ui-kitten/components';
import DetailedSubjects from '../../Constants/Subjects';
import { createAssignmentPost, getAllClasses } from '../../../firebase';

const TeacherAssignmentPage = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(new IndexPath(0));
  const [selectedClass, setSelectedClass] = useState(new IndexPath(0));
  const [chapter, setChapter] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [note, setNote] = useState('');
  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAllClasses = await getAllClasses();
      const allClassesData = fetchedAllClasses.map(
        fetchedClass => {
          return {
            class_id: fetchedClass.class_id,
            name: fetchedClass.name
          }
        }
      );
      setAllClasses(allClassesData);
    }
    fetchData();
  }, []);

  const handleCreateAssignment = async () => {
    const newAssignment = {
      chapter,
      deadline,
      note,
      title,
      subject: DetailedSubjects[selectedSubject.row].name,
      classID: allClasses[selectedClass.row].class_id
    }
    await createAssignmentPost(newAssignment);
    navigation.goBack();
  }

  const renderAlert = () => {
    return Alert.alert(
      "Peringatan",
      "Apakah anda yakin ingin kembali? Seluruh data tidak akan tersimpan",
      [
        {
          text: "Batal",
          onPress: () => console.log("batal"),
          style: "cancel"
        },
        {
          text: "Kembali",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
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
              onPress={() => { renderAlert() }}
            >
              <IconBack/>
            </TouchableOpacity>
            <Text style={{fontFamily: 'Bold', fontSize: 21}}>Tambah Tugas</Text>
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Input
              label='Judul'
              value={title}
              onChangeText={nextValue => setTitle(nextValue)}
              placeholder='Masukkan judul tugas disini'
            />
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Select
              selectedIndex={selectedSubject}
              onSelect={index => setSelectedSubject(index)}
              label='Mata Pelajaran'
              value={DetailedSubjects[selectedSubject.row].name}
            >
              { DetailedSubjects.map(subject => <SelectItem title={subject.name}/>)}
            </Select>
          </View>

          {
            allClasses.length > 0 ?
            <View style={{marginVertical: 10, width: '100%'}}>
              <Select
                selectedIndex={selectedClass}
                onSelect={index => setSelectedClass(index)}
                label='Kelas'
                value={allClasses[selectedClass.row].name}
              >
                { allClasses.map(classData => <SelectItem title={classData.name}/>)}
              </Select>
            </View> : null
          }

          <View style={{marginVertical: 10, width: '100%'}}>
            <Datepicker
              date={deadline}
              onSelect={nextDate => setDeadline(nextDate)}
              label='Batas Tanggal'
            />
          </View>

          <View style={{marginVertical: 10, width: '100%'}}>
            <Input
              label='Subjek'
              value={chapter}
              onChangeText={nextValue => setChapter(nextValue)}
              placeholder='Masukkan subjek tugas disini'
            />
          </View>

          <View style={{marginTop: 10, width: '100%'}}>
            <Input
              label='Catatan'
              multiline
              textStyle={{ minHeight: 80 }}
              value={note}
              onChangeText={nextValue => setNote(nextValue)}
              placeholder='Masukkan catatan anda disini'
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
            onPress={() => {handleCreateAssignment()}}
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
          <View style={{height: 200}}></View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TeacherAssignmentPage;
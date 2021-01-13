import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconSetting from '../../Assets/icons/IconSetting';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Helper/AuthProvider';
import { getAllTeachers, getClassById } from '../../../firebase';

const ProfilePage = () => {
  const {
    user: {
      user_id,
      name,
      class: { classID, name: grade },
      phone,
      dob,
      pob
    },
    logout
  } = useContext(AuthContext);
  const [teacherName, setTeacherName] = useState('');
  const [allTeachers, setAllTeachers] = useState([]);
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(Fonts);

  const dateOfBirth = new Date(dob.seconds * 1000).toLocaleDateString("id");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedClass = await getClassById(classID);
      const fetchedAllTeacher = await getAllTeachers();

      const { teacher: { name }} = fetchedClass;
      console.log(fetchedAllTeacher);

      setTeacherName(name);
      setAllTeachers(fetchedAllTeacher);
    }
    fetchData();
  }, []);

  const renderProfileDetail = () => {
    return (
      <View style={{
        width: '100%',
        backgroundColor: '#F9F9FB',
        borderRadius: 15,
        padding: 20,
        marginTop: 20
      }}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Name Lengkap</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>{name}</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Wali Kelas</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>
              {teacherName || '-'}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Kelas</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>{grade}</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>No. Telepon</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>{phone}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Tempat/Tanggal Lahir</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>
              {`${pob}, ${dateOfBirth}`}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>ID</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>{user_id}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderTeacherContactCard = (userName, userPhone) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderColor: '#C7C7C7'
        }}
      >
        <Image
          source={require('../../Assets/logo/Student.png')}
          style={{
            width: 75,
            height: 75,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'SemiBold'
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Regular'
            }}
          >
            Guru Kimia
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
          <View style={{ justifyContent: 'center' }}>
            <Text>{userPhone}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderTeacherContact = () => {

    return (
      <View>
        <View
          style={{
            marginTop: 25,
            flexDirection: 'row'
          }}
        >
          <View>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 16
            }}>
              Kontak Guru
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity onPress={() => {navigation.navigate('TeacherContactPage', {
              allTeachersData: allTeachers
            })}}>
              <Text style={{
                fontFamily: 'Medium',
                fontSize: 16,
                color: '#598BFF',
                justifyContent: 'center'
              }}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          allTeachers.length > 0 ?
            allTeachers.map(teacher => 
              renderTeacherContactCard(teacher.name, teacher.phone)  
            )
          : null
        }
      </View>
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
        <ScrollView style={{paddingHorizontal: 20}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 20,
          }}
        >
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 30,
            marginHorizontal: 30
          }}>
            <IconSetting/>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../Assets/logo/Student.png')}
            style={{
              width: 150,
              height: 150,
            }}
          />
          <Text style={{
            fontFamily: 'Bold',
            fontSize: 21,
            marginTop: 20
          }}>
            { name }
          </Text>
          <Text style={{
            fontFamily: 'Regular',
            fontSize: 16,
            marginTop: 10
          }}>
            {`Kelas: ${grade}`}
          </Text>
        </View>
        { renderProfileDetail() }
        { renderTeacherContact() }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default ProfilePage;
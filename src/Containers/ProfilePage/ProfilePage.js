import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import IconSetting from '../../Assets/icons/IconSetting';

const ProfilePage = () => {
  let [fontsLoaded] = useFonts(Fonts);

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
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>Bernard Adhitya</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Wali Kelas</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>Ms. Rina Radolph</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Kelas</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>XII IPA 3</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>No. Telepon</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>+6281234567890</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>Tempat/Tanggal Lahir</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>Jakarta, 3 Mei 1999</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 12}}>ID</Text>
            <Text style={{fontFamily: 'SemiBold', marginTop: 10}}>bernardadhitya</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderTeacherContactCard = () => {
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
            Ms. DIANA ROSIANNE
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
            <Text>+6281234567890</Text>
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
            <TouchableOpacity>
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
        { renderTeacherContactCard() }
        { renderTeacherContactCard() }
        { renderTeacherContactCard() }
        { renderTeacherContactCard() }
        { renderTeacherContactCard() }
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
            Bernard
          </Text>
          <Text style={{
            fontFamily: 'Regular',
            fontSize: 16,
            marginTop: 10
          }}>
            Kelas: XII IPA 4
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
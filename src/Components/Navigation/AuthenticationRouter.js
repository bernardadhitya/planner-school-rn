import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../Helper/AuthProvider";
import Center from "../Center/Center";
import { Text, Image, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFonts } from '@use-expo/font';
import { Fonts } from '../../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Input } from "@ui-kitten/components";
import { getAllUsers } from "../../../firebase";

const Stack = createStackNavigator();

const Login = () => {
  const navigation = useNavigation();
  const { loginAsStudent, loginAsTeacher } = useContext(AuthContext);
  let [fontsLoaded] = useFonts(Fonts);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAllUsers = await getAllUsers();
      setAllUsers(fetchedAllUsers);
    }
    fetchData();
  }, []);

  const checkLogin = () => {
    const matchingUser = allUsers.filter(userData => userData.user_id === email)[0];

    if (!matchingUser) return false;

    if (matchingUser.role === 'teacher'){
      loginAsTeacher(matchingUser);
    } else {
      loginAsStudent(matchingUser);
    }
  }

  return fontsLoaded ? (
    <View style={styles.center}>
      <Image
        source={require('../../Assets/logo/logo.png')}
        style={{width: 150, height: 150}}
      />
      <Text style={{
        fontFamily: 'Bold',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 4
      }}>SchoolPlanny</Text>
      <Text style={{
        fontFamily: 'Regular',
        fontSize: 14,
        marginTop: 12,
        marginBottom: 20,
        color: '#979797'
      }}>Aplikasi Pengelola Kegiatan Siswa</Text>
      <View style={{width: 300}}>
        <Input
          value={email}
          placeholder='Nomor ID siswa'
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          placeholder='Kata sandi'
          secureTextEntry={true}
          onChangeText={nextValue => setPassword(nextValue)}
        />
      </View>
      <View style={{height: 30}}></View>
      <TouchableOpacity style={styles.loginButton} onPress={() => {checkLogin()}}>
        <Text
          style={{
            fontFamily: 'Bold',
            fontSize: 16,
            color: '#FFFFFF'
          }}
        >
          Masuk
        </Text>
      </TouchableOpacity>
    </View>
  ) : <AppLoading/>;
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FFFFFF'
  },
  button: {
    marginVertical: 4,
    width: 277,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 6,
    alignItems: 'center'
  },
  loginButton: {
    marginVertical: 4,
    width: 277,
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
    alignItems: 'center'
  }
});

function Register({ navigation, route }) {
  return (
    <Center>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack()
        }}
      />
    </Center>
  );
}

const AuthenticationRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{
          headerTitle: "Sign In"
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: "Register"
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationRouter;
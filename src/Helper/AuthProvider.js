import React, { useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = React.createContext({
  user: null,
  loginAsStudent: () => {},
  loginAsTeacher: () => {},
  logout: () => {}
});

export const AuthProvider= ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsStudent: (student) => {
          setUser(student);
          AsyncStorage.setItem("user", JSON.stringify(student));
        },
        loginAsTeacher: (teacher) => {
          setUser(teacher);
          AsyncStorage.setItem("user", JSON.stringify(teacher));
        },
        register: (userData) => {
          const { userName } = userData;
          const newUser = {
            userId: 'WjitTbcn26lWeBUsj2Lk',
            username: userName,
            role: 'student'
          };
          setUser(newUser);
          AsyncStorage.setItem("user", JSON.stringify(newUser));
        },
        logout: () => {
          //logs out user
          setUser(null);
          AsyncStorage.removeItem("user");
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
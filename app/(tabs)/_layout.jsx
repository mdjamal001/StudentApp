import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { theme } from "../../Theme";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import InitialNavigation from "./InitialNavigation";
// import InitialNavigation from "../../Navigation/InitialNavigation";

const Layout = () => {
  // NavigationBar.setBorderColorAsync("#eeeeee");

  // const [hasStuData, setHasStuData] = useState(false);

  // useEffect(() => {
  //   const checkStuData = async () => {
  //     try {
  //       await AsyncStorage.removeItem("semester");
  //       const value = await AsyncStorage.getItem("semester");
  //       if (value != null) {
  //         setHasStuData(true);
  //       } else {
  //         setHasStuData(false);
  //       }
  //     } catch (e) {
  //       console.log("Error: ", e);
  //       setHasStuData(false);
  //     }
  //   };
  //   checkStuData();
  // });

  // if (!hasStuData) {
  //   return <InitialNavigation />;
  // }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primaryColor(1),
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={22} color={focused ? color : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="calendar"
              size={22}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="classroom"
        options={{
          title: "Classroom",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="book"
              size={22}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: "Clubs",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              name="users"
              size={22}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default Layout;

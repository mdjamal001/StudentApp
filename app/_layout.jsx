import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { theme } from "../Theme";
import { StatusBar } from "expo-status-bar";

NavigationBar.setBackgroundColorAsync("white");
NavigationBar.setBorderColorAsync("#eeeeee");

const Layout = () => {
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

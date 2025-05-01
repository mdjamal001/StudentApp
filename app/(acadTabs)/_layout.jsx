import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../Theme";

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
          title: "Resources",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="library"
              size={22}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="syllabus"
        options={{
          title: "Syllabus",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="book"
              size={22}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: "Assignments",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="assignment"
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

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { theme } from "../../Theme";
import "react-native-gesture-handler";

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

export default Layout;

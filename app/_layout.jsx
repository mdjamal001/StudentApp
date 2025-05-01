import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { SubjectProvider } from "../utils/SubjectContext";

export default function _layout() {
  NavigationBar.setBackgroundColorAsync("white");
  NavigationBar.setBorderColorAsync("eeeeee");

  return (
    <SubjectProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SubjectProvider>
  );
}

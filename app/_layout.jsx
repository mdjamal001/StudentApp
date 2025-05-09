import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

export default function _layout() {
  NavigationBar.setBackgroundColorAsync("white");
  NavigationBar.setBorderColorAsync("eeeeee");

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}

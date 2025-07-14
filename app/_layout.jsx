import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { SubjectProvider } from "../utils/SubjectContext";
import { SIdProvider } from "../utils/SIdContext";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../utils/AuthContext";

export default function _layout() {
  NavigationBar.setBackgroundColorAsync("white");
  NavigationBar.setBorderColorAsync("eeeeee");

  return (
    <AuthProvider>
      <SubjectProvider>
        <SIdProvider>
          <Stack
            screenOptions={{ headerShown: false, animation: "fade" }}
          ></Stack>
          <Toast />
        </SIdProvider>
      </SubjectProvider>
    </AuthProvider>
  );
}

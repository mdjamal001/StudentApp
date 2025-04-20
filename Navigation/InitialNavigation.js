import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseOption from "../screens/Initials/ChooseOption";
import GuestForm from "../screens/Initials/GuestForm";

const InitialNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="choose option"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="choose option" component={ChooseOption} />
      <Stack.Screen name="guest form" component={GuestForm} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default InitialNavigation;

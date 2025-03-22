import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrimaryAttendance from "../screens/Attendance/PrimaryAttendance";
import SubjectWiseList from "../screens/Attendance/SubjectWiseList";
import SubjectAttendance from "../screens/Attendance/SubjectAttendance";

const Stack = createNativeStackNavigator();

const AttendanceNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Primary Attendance"
    >
      <Stack.Screen name="Primary Attendance" component={PrimaryAttendance} />
      <Stack.Screen
        name="Subject-wise Attendance"
        component={SubjectWiseList}
      />
      <Stack.Screen name="Subject Attendance" component={SubjectAttendance} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AttendanceNavigation;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const Classroom = () => {
  return (
    <View className="flex-row flex-1 justify-center items-center">
      <Text className="text-3xl">Resources Page</Text>
      <CircularProgress radius={25} value={100} duration={1000} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Classroom;

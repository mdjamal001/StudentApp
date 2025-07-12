import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { theme } from "../../Theme";

const Assignments = () => {
  return (
    <View
      className="w-11/12 mx-4 mt-3 p-2 rounded-lg"
      style={{ backgroundColor: theme.secondaryColor(0.1) }}
    >
      <Text className="text-lg text-center">Upcoming Assignments</Text>
      <View className="w-full bg-gray-400 h-0.5 opacity-25 mt-2" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        className="p-3"
        style={{ height: 120 }}
      >
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-lg">OS</Text>
          <Text className="text-lg">Due: 20th July</Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-lg">COI</Text>
          <Text className="text-lg">Due: 21st July</Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-lg">DBMS</Text>
          <Text className="text-lg">Due: 23rd July</Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-lg">COSM</Text>
          <Text className="text-lg">Due: 26th July</Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-lg">BEFA</Text>
          <Text className="text-lg">Due: 26th July</Text>
        </View>
        <View className="h-5" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Assignments;

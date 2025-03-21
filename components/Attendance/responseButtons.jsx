import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const ResponseButtons = () => {
  return (
    <View className="flex-row justify-center gap-x-10 mt-2">
      <TouchableOpacity className="p-2 px-5 border-red-500 border-2 rounded-lg">
        <View>
          <Text className="text-red-500 text-lg">Absent</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 px-5 border-green-500 border-2 rounded-lg">
        <View>
          <Text className="text-green-500 text-lg">Present</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResponseButtons;

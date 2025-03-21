import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../Theme";
import { getCurrentDateInfo } from "../../utils/currentDate";
import ResponseButtons from "./responseButtons";

const ClassCard = ({ classData }) => {
  let currentDate = getCurrentDateInfo();
  return (
    <View
      className="my-2 p-2 py-5 pt-8 rounded-lg items-center"
      style={{ backgroundColor: theme.primaryColor(0.15) }}
    >
      <Text className="text-2xl line-clamp-1 mb-2">{classData.name}</Text>
      <View
        className="border-t-2 w-full "
        style={{ borderColor: theme.primaryColor(0.05) }}
      >
        {(currentDate.minute >= classData.startTime[1] &&
          currentDate.hour == classData.startTime[0]) ||
        currentDate.hour > classData.startTime[0] ? (
          <ResponseButtons />
        ) : (
          <View className="w-full items-center mt-4 ">
            <Text className="text-gray-500">
              Class begins at {classData.startTime[0] % 12}:
              {classData.startTime[1]}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassCard;

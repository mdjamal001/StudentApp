import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../Theme";
import { getCurrentDateInfo } from "../../utils/currentDate";
import Response from "./response";

const ClassCard = ({ classData }) => {
  let currentDate = getCurrentDateInfo();

  const class_shr = parseInt(classData.start_time.split(":")[0]);
  const class_smin = parseInt(classData.start_time.split(":")[1]);

  return (
    <View
      className="my-2 p-2 py-5 pt-8 rounded-xl items-center "
      style={{
        backgroundColor: theme.secondaryColor(0.1),
      }}
    >
      <Text className="text-2xl line-clamp-1 mb-2">{classData.subject}</Text>
      <View
        className="border-t-2 w-full "
        style={{ borderColor: theme.secondaryColor(0.05) }}
      >
        {(currentDate.minute >= class_smin && currentDate.hour == class_shr) ||
        currentDate.hour > class_shr ? (
          <Response subject={classData.subject} />
        ) : (
          <View className="w-full items-center mt-4 ">
            <Text className="text-gray-500">
              Class begins at {class_shr % 12}:
              {class_smin == 0 ? "00" : class_smin}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassCard;

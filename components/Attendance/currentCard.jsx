import React from "react";
import { Text, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { getCurrentDateInfo } from "../../utils/currentDate";
import { EvilIcons } from "@expo/vector-icons";
import { theme } from "../../Theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { classesSchedule } from "../../sampleData/classesSchedule";
import ClassCard from "./classCard";

const CurrentCard = () => {
  let currentDate = getCurrentDateInfo();
  const [key, setKey] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );
  return (
    <Animated.View
      key={key}
      entering={FadeInDown.delay(250).duration(500)}
      className="mx-3 p-3 bg-white rounded-lg"
    >
      {/* <View className="mx-3 p-3 bg-white rounded-lg"> */}
      <View className="flex-row justify-between mb-8">
        <Text className="text-xl font-bold">
          {currentDate.day}, {currentDate.date} {currentDate.month}{" "}
          {currentDate.year} {currentDate.time}
        </Text>
        <TouchableOpacity>
          <EvilIcons
            className="me-3"
            name="calendar"
            size={32}
            color={theme.primaryColor(1)}
          />
        </TouchableOpacity>
      </View>
      {currentDate.day == "Sunday" || currentDate.day == "Saturday" ? (
        <View className="h-60 flex-row justify-center items-center">
          <Text className="text-lg text-gray-500">No classes today!</Text>
        </View>
      ) : (
        <View>
          {classesSchedule[currentDate.day].map((classData, index) => {
            return <ClassCard classData={classData} key={index} />;
          })}
        </View>
      )}
      {/* </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default CurrentCard;

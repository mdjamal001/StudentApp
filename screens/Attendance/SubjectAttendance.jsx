import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../Theme";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const SubjectAttendance = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  return (
    <View>
      <View className="h-28 bg-white flex-row items-center pt-8 pl-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5 line-clamp-1">{params.subject}</Text>
      </View>
      <ScrollView>
        <Animated.View
          entering={FadeIn.delay(100).duration(800)}
          className="items-center bg-white p-5 m-2  mt-2 rounded-lg"
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          {/* <View className="items-center bg-white p-5 m-2  mt-2"> */}
          <CircularProgress
            radius={70}
            value={params.attendance_percent}
            duration={1500}
            titleColor="#252525"
            activeStrokeColor={theme.primaryColor(1)}
            inActiveStrokeColor={theme.primaryColor(0.2)}
            valueSuffix="%"
          />
          <View className="mt-5 flex-row justify-evenly w-full">
            <View
              className="items-center p-3 rounded-lg w-40"
              style={{ backgroundColor: theme.primaryColor(0.2) }}
            >
              <Text className="text-3xl font-semibold text-gray-800">
                {params.total_classes}
              </Text>
              <Text className="text-sm">Total classes</Text>
            </View>
            <View
              className="items-center p-3 rounded-lg w-40"
              style={{ backgroundColor: theme.primaryColor(0.2) }}
            >
              <Text className="text-3xl font-semibold text-gray-800">
                {params.attended_classes}
              </Text>
              <Text className="text-sm">Attended classes</Text>
            </View>
          </View>
          {/* </View> */}
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(200).duration(800)}
          className="m-2 mt-0 rounded-lg p-1 bg-white"
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          {/* <View className="m-2 mt-0"> */}
          <Calendar
            theme={{
              todayTextColor: theme.primaryColor(1),
              arrowColor: theme.primaryColor(1),
              textDayFontFamily: "Poppins_400Regular",
              textMonthFontFamily: "Poppins_500Medium",
              textDayHeaderFontFamily: "Poppins_500Medium",
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
            entering={FadeInDown.delay(100).duration(800)}
            hideExtraDays={true}
            markedDates={{
              "2025-03-17": {
                marked: true,
                dotColor: "green",
              },
            }}
          />
          {/* </View> */}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SubjectAttendance;

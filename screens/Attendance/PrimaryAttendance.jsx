import React from "react";
import { Text, View, TouchableNativeFeedback, ScrollView } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import CurrentCard from "../../components/Attendance/currentCard";
import { useNavigation } from "@react-navigation/native";

const PrimaryAttendance = () => {
  const navigation = useNavigation();

  const [key, setKey] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );

  return (
    <View>
      <View className="h-28 bg-white flex-row items-center pt-8 pl-2">
        <Text className="text-2xl  ml-5">Attendance</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <Animated.View
          key={key}
          className="bg-white m-3 pt-3 rounded-lg"
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <View className="flex-row justify-around items-center border-b-2 pb-3  border-gray-200">
            <Text className="text-2xl">Overall Attendance</Text>
            <CircularProgress
              radius={40}
              value={75}
              valueSuffix="%"
              activeStrokeColor={theme.primaryColor(1)}
              inActiveStrokeColor={theme.primaryColor(0.2)}
              inActiveStrokeWidth={8}
              duration={1000}
            />
            {/* <Text>75%</Text> */}
          </View>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("Subject-wise Attendance")}
          >
            <View className="pt-3 p-2 flex-row justify-between">
              <Text>Click to view subject-wise attendance</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color={theme.primaryColor(1)}
              />
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
        {/* </View> */}
        {/* current day's attendance */}
        <CurrentCard />
        <View className="h-28"></View>
      </ScrollView>
    </View>
  );
};

export default PrimaryAttendance;

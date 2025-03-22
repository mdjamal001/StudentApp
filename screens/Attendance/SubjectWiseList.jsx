import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { classes } from "../../sampleData/classes";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../Theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SubjectWiseList = () => {
  const classesData = classes;
  const navigation = useNavigation();

  return (
    <View>
      <View className="h-28 bg-white flex-row items-center pt-8 pl-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5">Subject-wise Attendance</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {classesData.map((classData, index) => {
          return (
            <Animated.View
              entering={FadeInDown.delay(index * 100).duration(800)}
              key={index}
            >
              {/* <View key={index}> */}
              <TouchableNativeFeedback
                onPress={() =>
                  navigation.navigate("Subject Attendance", { ...classData })
                }
              >
                <View className=" flex-row justify-between mx-3 mt-3 p-2 px-3 bg-white rounded-lg items-center">
                  <Text className="text-xl line-clamp-1 w-10/12">
                    {classData.name}
                  </Text>
                  <CircularProgress
                    radius={30}
                    value={75}
                    titleColor="#252525"
                    valueSuffix="%"
                    activeStrokeColor={theme.primaryColor(1)}
                    inActiveStrokeColor={theme.primaryColor(0.2)}
                    inActiveStrokeWidth={5}
                    duration={1000}
                  />
                </View>
              </TouchableNativeFeedback>
              {/* </View> */}
            </Animated.View>
          );
        })}
        <View className="mb-3" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SubjectWiseList;

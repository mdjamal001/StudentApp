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
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
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
              entering={FadeIn.delay(index * 100).duration(800)}
              key={index}
              className="mt-3 mx-2 bg-white rounded-lg items-center"
              style={{
                shadowColor: "black",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              {/* <View key={index}> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Subject Attendance", { ...classData })
                }
              >
                <View className=" flex-row justify-between mx-3  p-2 px-3 bg-white rounded-lg items-center">
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
              </TouchableOpacity>
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

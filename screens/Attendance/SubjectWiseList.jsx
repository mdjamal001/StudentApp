import React, { useEffect, useState } from "react";
import {
  Button,
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
import * as SQLite from "expo-sqlite";
import { Link } from "expo-router";

const SubjectWiseList = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getSubjectsData = async () => {
      const db = await SQLite.openDatabaseAsync("localStorage");
      const result = await db.getAllAsync(
        `SELECT * FROM subjects WHERE semester=4`
      );
      setSubjectsData(result);
    };
    getSubjectsData();
  }, [subjectsData]);

  return (
    <View className="bg-white">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 5 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5">Subject-wise Attendance</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subjectsData.map((subjectData, index) => {
          return (
            <Animated.View
              entering={FadeIn.delay(index * 100).duration(800)}
              key={index}
              className="mt-3 mx-2 bg-white rounded-lg items-center"
              style={{
                elevation: 5,
              }}
            >
              {/* <View key={index}> */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Subject Attendance", { ...subjectData })
                }
              >
                <View className=" flex-row justify-between mx-3  p-2 px-3 bg-white rounded-lg items-center">
                  <Text className="text-xl line-clamp-1 w-10/12">
                    {subjectData.subject_name}
                  </Text>
                  <CircularProgress
                    radius={30}
                    value={subjectData.attendance_percent}
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
        {/* <View className="mb-20" /> */}

        <View className="h-28 mt-2" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SubjectWiseList;

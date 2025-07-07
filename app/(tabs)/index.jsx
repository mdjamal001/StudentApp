import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Touchable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { db_init } from "../../LocalStorage/database";
import * as SQLite from "expo-sqlite";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../Theme";
import CircularProgress from "react-native-circular-progress-indicator";
import NoticeBoard from "../../components/Home/NoticeBoard";

const Index = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const getName = async () => {
      let n = await AsyncStorage.getItem("name");
      setName(n);
    };
    getName();
  });
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View
        className="h-28 flex-row items-center bg-white px-4 pt-12"
        style={{ elevation: 3 }}
      >
        <TouchableOpacity>
          <Feather name="menu" size={25} color={"black"} />
        </TouchableOpacity>
        <View className="flex-row items-center gap-x-1 ml-4">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text className="font-bold text-2xl">JConnect</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5 pt-8">
          <Text className="text-3xl font-bold">Hello!</Text>
          <Text className="text-4xl font-bold">{name}</Text>
        </View>
        <View className="gap-x-2 px-4 mt-2 mb-8">
          <Text className="text-2xl font-bold mb-3">
            Continue your preparation
          </Text>
          <ScrollView horizontal>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ backgroundColor: theme.secondaryColor(0.1) }}
              className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
            >
              <View
                style={{ backgroundColor: theme.secondaryColor(0.5) }}
                className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
              >
                <Text className="text-white" style={{ fontSize: 6 }}>
                  Semester
                </Text>
              </View>
              <CircularProgress
                radius={30}
                value={80}
                maxValue={100}
                valueSuffix="%"
                activeStrokeColor={theme.primaryColor(1)}
                inActiveStrokeColor={theme.primaryColor(0.2)}
                inActiveStrokeWidth={8}
                duration={1000}
              />
              <Text className="text-lg font-bold line-clamp-1">DBMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ backgroundColor: theme.secondaryColor(0.1) }}
              className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
            >
              <View
                style={{ backgroundColor: theme.secondaryColor(0.5) }}
                className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
              >
                <Text className="text-white" style={{ fontSize: 6 }}>
                  Skill Development
                </Text>
              </View>
              <CircularProgress
                radius={30}
                value={65}
                maxValue={100}
                valueSuffix="%"
                activeStrokeColor={theme.primaryColor(1)}
                inActiveStrokeColor={theme.primaryColor(0.2)}
                inActiveStrokeWidth={8}
                duration={1000}
              />
              <Text className="text-lg font-bold line-clamp-1">DSA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ backgroundColor: theme.secondaryColor(0.1) }}
              className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
            >
              <View
                style={{ backgroundColor: theme.secondaryColor(0.5) }}
                className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
              >
                <Text className="text-white" style={{ fontSize: 6 }}>
                  Skill Development
                </Text>
              </View>
              <CircularProgress
                radius={30}
                value={40}
                maxValue={100}
                valueSuffix="%"
                activeStrokeColor={theme.primaryColor(1)}
                inActiveStrokeColor={theme.primaryColor(0.2)}
                inActiveStrokeWidth={8}
                duration={1000}
              />
              <Text className="text-lg font-bold line-clamp-1">React</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ backgroundColor: theme.secondaryColor(0.1) }}
              className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
            >
              <View
                style={{ backgroundColor: theme.secondaryColor(0.5) }}
                className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
              >
                <Text className="text-white" style={{ fontSize: 6 }}>
                  Semester
                </Text>
              </View>
              <CircularProgress
                radius={30}
                value={20}
                maxValue={100}
                valueSuffix="%"
                activeStrokeColor={theme.primaryColor(1)}
                inActiveStrokeColor={theme.primaryColor(0.2)}
                inActiveStrokeWidth={8}
                duration={1000}
              />
              <Text className="text-lg font-bold line-clamp-1">OS</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* Notice Board */}
        <Text className="text-2xl font-bold mx-5">Notice Board</Text>
        <NoticeBoard />
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
        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;

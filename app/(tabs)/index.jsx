import { StatusBar } from "expo-status-bar";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import Preparation from "../../components/Home/Preparation";
import Assignments from "../../components/Home/Assignments";
import { AuthContext } from "../../utils/AuthContext";
import { supabase } from "../../utils/supabase";

const Index = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const [name, setName] = useState("");
  useEffect(() => {
    const getName = async () => {
      let n = await AsyncStorage.getItem("name");
      setName(n);
    };
    getName();
  });
  return (
    <>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View
          className="h-28 flex-row items-center bg-white px-4 pt-12"
          style={{ elevation: 3 }}
        >
          <TouchableOpacity>
            <Feather name="menu" size={25} color={"black"} />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center justify-between">
            <View className="flex-row items-center gap-x-1 ml-4">
              <Image
                source={require("../../assets/images/logo.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text className="font-bold text-2xl">JConnect</Text>
            </View>
            {user ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  supabase.auth.signOut();
                  AsyncStorage.removeItem("semester");
                  AsyncStorage.removeItem("branch");
                  router.push("/(auth)/signIn");
                }}
              >
                <Text className="text-lg text-red-600">Log Out</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => router.push("/(auth)/signIn")}
              >
                <Text
                  className="text-lg"
                  style={{ color: theme.primaryColor(1) }}
                >
                  Log In
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-5 pt-8">
            <Text className="text-3xl font-bold">Hello!</Text>
            <Text className="text-4xl font-bold">{name}</Text>
          </View>
          <Preparation />
          {/* Notice Board */}
          <Text className="text-2xl font-bold mx-5">Notice Board</Text>
          <NoticeBoard />
          <Assignments />
          <View className="h-10" />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default Index;

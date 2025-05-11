import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkStuData = async () => {
      try {
        const value = await AsyncStorage.getItem("semester");
        console.log("Semester value from AsyncStorage:", value);
        if (value !== null) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)");
        }
      } catch (error) {
        console.error("AsyncStorage error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStuData();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <StatusBar style="dark" />
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
    </View>
  );
}

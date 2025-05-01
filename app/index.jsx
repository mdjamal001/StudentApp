import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function Index() {
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [hasStuData, setHasStuData] = useState(false);

  useEffect(() => {
    const checkStuData = async () => {
      try {
        const value = await AsyncStorage.getItem("semester");
        console.log("Semester value from AsyncStorage:", value);
        if (value !== null) {
          setHasStuData(true);
        }
      } catch (error) {
        console.error("AsyncStorage error:", error);
      } finally {
        setHasCheckedStorage(true);
      }
    };

    checkStuData();
  }, []);

  if (!hasCheckedStorage) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={hasStuData ? "/(tabs)" : "/(auth)"} />;
}

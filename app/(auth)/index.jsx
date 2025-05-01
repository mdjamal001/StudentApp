import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../Theme";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-evenly items-center bg-white">
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeInUp.delay(100).duration(800).springify()}
        className="w-full items-center mb-10"
      >
        <LottieView
          source={require("../../assets/animations/welcomeAnimation.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
        <Text
          className="text-4xl font-extrabold pl-5"
          style={{ color: theme.primaryColor(1) }}
        >
          Your Welcome!
        </Text>
      </Animated.View>

      <View className="gap-y-8">
        <Animated.View
          entering={FadeInDown.delay(100).duration(800).springify()}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ borderWidth: 2, borderColor: theme.primaryColor(1) }}
            onPress={() => router.push("/(auth)/signIn")}
          >
            <Text
              className="text-2xl font-semibold"
              style={{ color: theme.primaryColor(1) }}
            >
              Login to continue
            </Text>
            <AntDesign name="forward" size={20} color={theme.primaryColor(1)} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(250).duration(800).springify()}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ backgroundColor: theme.primaryColor(1) }}
            onPress={() => router.push("/(auth)/signUp")}
          >
            <Text className="text-2xl font-semibold" style={{ color: "white" }}>
              Signup to continue
            </Text>
            <AntDesign name="forward" size={20} color={"white"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(800).springify()}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ backgroundColor: "orange" }}
            onPress={() => router.push("/(auth)/guestForm")}
          >
            <Text className="text-2xl font-semibold" style={{ color: "white" }}>
              Continue as guest
            </Text>
            <AntDesign name="forward" size={20} color={"white"} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Index;

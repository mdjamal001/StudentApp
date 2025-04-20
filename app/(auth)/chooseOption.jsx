import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../Theme";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const ChooseOption = () => {
  const router = useRouter();
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // Reset key to re-trigger animations
      setAnimationKey((prev) => prev + 1);
    }, [])
  );

  return (
    <View
      className="flex-1 justify-evenly items-center bg-white"
      key={animationKey}
    >
      <StatusBar style="dark" />

      <Animated.View
        key={`header-${animationKey}`}
        entering={FadeInUp.delay(100).duration(800).springify()}
        className="w-full items-center mb-10"
      >
        <LottieView
          key={`lottie-${animationKey}`} // 🔥 force restart animation
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
          key={`login-${animationKey}`}
          entering={FadeInDown.delay(100).duration(800).springify()}
        >
          <TouchableOpacity
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ borderWidth: 2, borderColor: theme.primaryColor(1) }}
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
          key={`signup-${animationKey}`}
          entering={FadeInDown.delay(250).duration(800).springify()}
        >
          <TouchableOpacity
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ backgroundColor: theme.primaryColor(1) }}
          >
            <Text className="text-2xl font-semibold" style={{ color: "white" }}>
              Signup to continue
            </Text>
            <AntDesign name="forward" size={20} color={"white"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          key={`guest-${animationKey}`}
          entering={FadeInDown.delay(400).duration(800).springify()}
        >
          <TouchableOpacity
            className="p-3 px-6 rounded-xl flex-row items-center gap-x-2"
            style={{ backgroundColor: "orange" }}
            onPress={() => router.push("/guestForm")}
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

export default ChooseOption;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../Theme";
import LottieView from "lottie-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../utils/supabase";

export default function ConfirmEmail() {
  const [showHourglass, setShowHourglass] = useState(true);
  const [debugText, setDebugText] = useState(
    "Waiting for email verification..."
  );
  const router = useRouter();
  const { email, password } = useLocalSearchParams();

  console.log("Email:", email);
  console.log("Password:", password);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!email || !password) {
          setDebugText("No stored credentials found");
          return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setDebugText("Still waiting for email verification...");
          console.log("Sign-in attempt failed:", error.message);
          return;
        }

        if (data?.user?.email_confirmed_at) {
          setDebugText("Email verified and signed in!");
          await AsyncStorage.setItem(
            "user_session",
            JSON.stringify(data.session)
          );
          setShowHourglass(false);
          clearInterval(interval);
        } else {
          setDebugText("Email not verified yet...");
        }
      } catch (err) {
        setDebugText("Error checking verification: " + err.message);
        console.error("Verification check error:", err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (showHourglass) {
    return (
      <View className="flex-1 justify-center items-center bg-white pb-28">
        <View className="mb-8">
          <LottieView
            source={require("../../assets/animations/waitingAnimation.json")}
            loop
            autoPlay
            style={{ height: 125, width: 125 }}
          />
        </View>
        <Text
          className="text-2xl font-bold"
          style={{ color: theme.primaryColor(1) }}
        >
          Check your mailbox!
        </Text>
        <Text className="mt-8">
          We've sent you a mail to confirm your email
        </Text>
        <Text className="mt-8">Debug text: {debugText}</Text>
      </View>
    );
  } else {
    return (
      <View className="flex-1 justify-center items-center bg-white pb-28">
        <View className="mb-8">
          <LottieView
            source={require("../../assets/animations/successAnimation.json")}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              setTimeout(() => {
                router.replace("/currentDetails");
              }, 2000);
            }}
            style={{ height: 250, width: 250 }}
          />
        </View>
        <Text className="text-3xl font-bold" style={{ color: "#15bf5f" }}>
          Email verified!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

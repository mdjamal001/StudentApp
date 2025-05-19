import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { theme } from "../../Theme";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../utils/supabase";
import { useRouter } from "expo-router";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const confirmEmail = () => {
  const [showHourglass, setShowHourglass] = useState(true);
  const [debugText, setDebugText] = useState("waitng for deep link...");

  const router = useRouter();

  async function handleDeepLink(event) {
    const url = event.url;
    console.log("Deep link received:", url);

    setDebugText("Deep link received: " + url);

    const queryIndex = url.indexOf("?");
    const hashIndex = url.indexOf("#");

    let query = "";
    if (queryIndex !== -1) {
      query = url.slice(queryIndex + 1);
    } else if (hashIndex !== -1) {
      query = url.slice(hashIndex + 1);
    } else {
      setDebugText("No query or hash string found in URL: " + url);
      return;
    }
    const parsed = queryString.parse(query);
    const { access_token, refresh_token } = parsed;

    if (access_token && refresh_token) {
      console.log(
        "Access and Refresh tokens received:",
        access_token,
        refresh_token
      );
      setDebugText("Access and Refresh tokens received");

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("Setting session failed:", error.message);
      } else {
        console.log("Session set successfully!");

        setDebugText("Supabse session set successfully!");

        // Save session locally
        try {
          await AsyncStorage.setItem(
            "user_session",
            JSON.stringify(data.session)
          );

          console.log("Session saved locally!");
          const sessionData = await AsyncStorage.getItem("user_session");
          console.log("Session data:", sessionData);

          setDebugText("Session saved locally!");

          setShowHourglass(false);
        } catch (e) {
          setDebugText("Failed to save session locally!" + e.message + e);
          console.error("Failed to save session:", e);
        }
      }
    } else {
      setDebugText("No tokens found in URL.");
      console.log("No tokens found in URL.");
    }
  }

  useEffect(() => {
    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    return () => {
      linkingListener.remove();
    };
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
        <Text className="mt-8">
          showHourGlass: {showHourglass ? "true" : "false"}
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
};

const styles = StyleSheet.create({});

export default confirmEmail;

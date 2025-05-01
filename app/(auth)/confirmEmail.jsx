import React, { useEffect } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { theme } from "../../Theme";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../utils/supabase";

const ConfirmEmail = () => {
  async function handleDeepLink(event) {
    const url = event.url;
    console.log("Deep link received:", url);

    const parsed = queryString.parseUrl(url);
    const { access_token, refresh_token } = parsed.query;

    if (access_token && refresh_token) {
      console.log(
        "Access and Refresh tokens received:",
        access_token,
        refresh_token
      );

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("Setting session failed:", error.message);
      } else {
        console.log("Session set successfully!");

        // Save session locally
        try {
          await AsyncStorage.setItem(
            "user_session",
            JSON.stringify(data.session)
          );
          console.log("Session saved locally!");
        } catch (e) {
          console.error("Failed to save session:", e);
        }
      }
    } else {
      console.log("No tokens found in URL.");
    }
  }

  useEffect(() => {
    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white pb-28">
      <StatusBar style="dark" />
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
      <Text className="mt-8">We've sent you a mail to confirm your email</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ConfirmEmail;

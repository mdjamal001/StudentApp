import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import "../global.css";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";

const Index = () => {
  const [key, setKey] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );

  return (
    <Animated.View
      key={key}
      entering={FadeInDown.delay(100).duration(1000)}
      className="flex-row flex-1 justify-center items-center"
    >
      <StatusBar style="dark" />
      <Text className="text-3xl">Home Page</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default Index;

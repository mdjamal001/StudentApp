import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Resources = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-sm ml-3 mr-5 mb-5 line-clamp-1">
          {params.subject}
          {" > "}
          {params.type}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Resources;

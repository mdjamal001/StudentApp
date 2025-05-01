import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSubject } from "../../utils/SubjectContext";
import { AntDesign } from "@expo/vector-icons";

const Assignments = () => {
  const { selectedAcademicSubject } = useSubject();

  return (
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <TouchableOpacity onPress={() => router.replace("../academics")}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5 line-clamp-1">
          {selectedAcademicSubject}
        </Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text>Assignments Page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Assignments;

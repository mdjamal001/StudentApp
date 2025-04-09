import { useFocusEffect } from "expo-router";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { getCurrentDateInfo } from "../../utils/currentDate";
import * as SQLite from "expo-sqlite";

const Response = ({ subject }) => {
  const [status, setStatus] = React.useState("");
  const currentDate = getCurrentDateInfo();

  useFocusEffect(() => {
    const checkStatus = async () => {
      const db = await SQLite.openDatabaseAsync("localStorage");
      const row = await db.getFirstAsync(
        `SELECT * FROM attendance WHERE subject="${subject}" AND date="${currentDate.date}-${currentDate.month}-${currentDate.year}"`
      );
      console.log("Row: ", row);
      if (row) {
        setStatus(row.status);
      }
    };
    checkStatus();
  });

  const setAttStatus = async (AttStatus) => {
    setStatus(AttStatus);
    const db = await SQLite.openDatabaseAsync("localStorage");
    await db.execAsync(
      `INSERT INTO attendance (date, subject, status) VALUES ("${currentDate.date}-${currentDate.month}-${currentDate.year}", "${subject}", "${AttStatus}")`
    );
  };

  if (status.length > 0) {
    if (status === "Present") {
      return (
        <View className="w-full items-center mt-4 ">
          <Text className="text-green-500 text-md">Marked as Present</Text>
        </View>
      );
    } else if (status === "Absent") {
      return (
        <View className="w-full items-center mt-4 ">
          <Text className="text-red-500 text-md">Marked as Absent</Text>
        </View>
      );
    } else if (status === "Cancelled") {
      return (
        <View className="w-full items-center mt-4 ">
          <Text className="text-orange-400 text-md">Marked as Cancelled</Text>
        </View>
      );
    }
  }

  return (
    <View className="flex-row justify-center gap-x-5 mt-2 mx-5">
      <TouchableOpacity
        onPress={() => setAttStatus("Absent")}
        className="p-2 px-3 border-red-500 border-2 rounded-lg"
      >
        <View>
          <Text className="text-red-500 text-md">Absent</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAttStatus("Cancelled")}
        className="p-2 px-3 border-orange-400 border-2 rounded-lg"
      >
        <View>
          <Text className="text-orange-400 text-md">Cancelled</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAttStatus("Present")}
        className="p-2 px-3 border-green-500 border-2 rounded-lg"
      >
        <View>
          <Text className="text-green-500 text-md">Present</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Response;

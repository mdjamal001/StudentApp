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
      console.log("ycgdcsd");
      const row = await db.getFirstAsync(
        `SELECT * FROM attendance WHERE subject_id=${subject.id} AND date="10-${currentDate.month}-${currentDate.year}"`
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

    console.log("Attendance status: ", AttStatus);
    const db = await SQLite.openDatabaseAsync("localStorage");
    await db.execAsync(
      `INSERT INTO attendance (date, subject_id, status) VALUES ("10-${currentDate.month}-${currentDate.year}", ${subject.id}, "${AttStatus}")`
    );
    console.log("Attendance status: ", AttStatus);
    if (AttStatus === "Present") {
      await db.execAsync(
        `UPDATE subjects SET attended_classes=attended_classes+1, total_classes=total_classes+1 WHERE id=${subject.id}`
      );
    } else if (AttStatus === "Absent") {
      await db.execAsync(
        `UPDATE subjects SET total_classes=total_classes+1 WHERE id=${subject.id}`
      );
    }
    await db.execAsync(
      `UPDATE subjects SET attendance_percent=(attended_classes/total_classes)*100 WHERE id=${subject.id}`
    );
    console.log("Attendance status updated");
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

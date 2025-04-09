import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getCurrentDateInfo } from "../../utils/currentDate";
import { EvilIcons } from "@expo/vector-icons";
import { theme } from "../../Theme";
import ClassCard from "./classCard";
import * as SQLite from "expo-sqlite";

const CurrentCard = () => {
  const [todaysSchedule, setTodaysSchedule] = useState([]);
  const currentDate = getCurrentDateInfo();

  useEffect(() => {
    const getTodaySchedule = async () => {
      const db = await SQLite.openDatabaseAsync("localStorage");

      const result = await db.getAllAsync(
        `SELECT * FROM timetable WHERE weekday="${currentDate.day}"`
      );

      setTodaysSchedule(result);
    };

    getTodaySchedule();
  }, [currentDate.day]);

  return (
    <View
      className="mx-3 p-3 bg-white rounded-lg"
      style={{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <View className="flex-row justify-between mb-8">
        <Text className="text-xl font-bold">
          {currentDate.day}, {currentDate.date} {currentDate.month}{" "}
          {currentDate.year} {currentDate.time}
        </Text>
        <TouchableOpacity>
          <EvilIcons
            className="me-3"
            name="calendar"
            size={32}
            color={theme.primaryColor(1)}
          />
        </TouchableOpacity>
      </View>

      {currentDate.day === "" || currentDate.day === "Saturday" ? (
        <View className="h-60 flex-row justify-center items-center">
          <Text className="text-lg text-gray-500">No classes today!</Text>
        </View>
      ) : todaysSchedule.length === 0 ? (
        <View className="h-60 flex-row justify-center items-center">
          <Text className="text-lg text-gray-500">Loading classes...</Text>
        </View>
      ) : (
        <View>
          {todaysSchedule.map((classData, index) => (
            <ClassCard classData={classData} key={index} />
          ))}
        </View>
      )}
    </View>
  );
};

export default CurrentCard;

import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import "../global.css";
import { db_init } from "../LocalStorage/database";
import * as SQLite from "expo-sqlite";

const Index = () => {
  const [key, setKey] = React.useState(0);

  useEffect(() => {
    const init = async () => {
      await db_init(); //Initialize the DB

      //print the timetable
      // const db = await SQLite.openDatabaseAsync("localStorage");
      // const rows = await db.getAllAsync(
      //   "SELECT * FROM timetable WHERE semester=4"
      // );
      // console.log("Rows: ", rows);
    };
    init();
  }, []);

  return (
    <View className="flex-row flex-1 justify-center items-center">
      <StatusBar style="dark" />
      <Text className="text-3xl">Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;

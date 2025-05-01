import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
// import { useRouter } from "expo-router";
import { router } from "expo-router";
import { useSubject } from "../../utils/SubjectContext";
// import CircularProgress from "react-native-circular-progress-indicator";

const Academics = () => {
  // const router = useRouter();

  const { setSelectedSubject } = useSubject();

  const [sem, setsem] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getSem = async () => {
        const res = await AsyncStorage.getItem("semester");
        setsem(parseInt(res));
      };
      if (sem === null) {
        getSem();
      }
      const getSubjects = async () => {
        const db = await SQLite.openDatabaseAsync("localStorage");
        const res = await db.getAllAsync(
          `SELECT subject_name FROM subjects WHERE semester=${sem}`
        );
        // console.log(res);

        if (res.length > 0) {
          setSubjects(res);
        }
      };
      getSubjects();
    }, [sem])
  );

  return (
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <Text className="text-2xl  ml-5">Academics</Text>
      </View>
      <View>
        {subjects.length > 0 ? (
          <ScrollView className="mt-1" showsVerticalScrollIndicator={false}>
            {subjects.map((subject, index) => {
              return (
                <View
                  className="m-1 mx-1.5 bg-white rounded-lg"
                  style={{ elevation: 5 }}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSubject(subject.subject_name);
                      router.push("(acadTabs)");
                    }}
                  >
                    <Text className="text-xl line-clamp-1 p-6">
                      {subject.subject_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <View className="h-28" />
          </ScrollView>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Academics;

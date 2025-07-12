import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../Theme";
import CircularProgress from "react-native-circular-progress-indicator";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useSId } from "../../utils/SIdContext";
import { useSubject } from "../../utils/SubjectContext";
import { useRouter } from "expo-router";

const Preparation = () => {
  const router = useRouter();
  const [prepStatus, setPrepStatus] = useState("start");
  const [subs, setSubjects] = useState([]);
  const [starterSubjects, setStarterSubjects] = useState([]);

  const { setSelectedSubject } = useSubject();
  const { setSelectedId } = useSId();

  const handlePress = (id, name) => {
    setSelectedSubject(name);
    setSelectedId(id);
    router.push({
      pathname: "/(acadTabs)/Syllabus/showSyll",
      params: { Etype: "sem" },
    });
  };

  useFocusEffect(
    useCallback(() => {
      const findSubs = async () => {
        try {
          const db = await SQLite.openDatabaseAsync("localStorage");

          const subjects = await db.getAllAsync(
            `SELECT id,subject_name FROM subjects WHERE semester = 4`
          );

          console.log("subjects:", subjects);

          if (subjects.length > 0) {
            for (let x of subjects) {
              const res = await db.getAllAsync(
                `SELECT status FROM syllabus WHERE subject_id=${x.id}`
              );
              console.log("subject id:", x, "    res:", res);
              if (res.length > 0) {
                let tot = 0,
                  mark = 0;
                for (let y of res) {
                  tot++;
                  if (y.status == true) {
                    setPrepStatus("continue");
                    mark++;
                  }
                }
                if (mark > 0) {
                  setSubjects((prev) => [
                    ...prev,
                    {
                      subject_id: x.id,
                      name: x.subject_name,
                      per: Math.round((mark / tot) * 100),
                    },
                  ]);
                  console.log(
                    "subject id:",
                    x,
                    "    percentage:",
                    Math.round((mark / tot) * 100)
                  );
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching preparation data:", error);
        }
        fetchSubs();
      };
      const fetchSubs = async () => {
        try {
          const db = await SQLite.openDatabaseAsync("localStorage");
          const subjects = await db.getAllAsync(
            `SELECT id, subject_name FROM subjects WHERE semester = 4 LIMIT 4`
          );
          console.log("Fetched subjects:", subjects);
          console.log("subs:", subs);
          if (subjects.length > 0) {
            setStarterSubjects(subjects);
          } else {
            console.log("No subjects found for semester 4.");
          }
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };
      setSubjects([]);
      setStarterSubjects([]);
      findSubs();
    }, [])
  );
  if (prepStatus == "start" && starterSubjects.length > 0) {
    return (
      <View>
        <View className="gap-x-2 px-4 mt-2 mb-8">
          <Text className="text-2xl font-bold mb-3">
            Start your preparation
          </Text>
          <ScrollView horizontal>
            {starterSubjects.map((sub) => (
              <View key={sub.id}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    handlePress(sub.id, sub.subject_name);
                  }}
                  style={{ backgroundColor: theme.secondaryColor(0.1) }}
                  className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
                >
                  <View
                    style={{ backgroundColor: theme.secondaryColor(0.5) }}
                    className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
                  >
                    <Text className="text-white" style={{ fontSize: 6 }}>
                      Semester
                    </Text>
                  </View>
                  <CircularProgress
                    radius={30}
                    value={0}
                    maxValue={100}
                    valueSuffix="%"
                    activeStrokeColor={theme.primaryColor(1)}
                    inActiveStrokeColor={theme.primaryColor(0.2)}
                    inActiveStrokeWidth={8}
                    duration={1000}
                  />
                  <Text className="text-lg font-bold line-clamp-1">
                    {sub.subject_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  } else if (prepStatus == "continue" && subs.length > 0) {
    return (
      <View>
        <View className="gap-x-2 px-4 mt-2 mb-8">
          <Text className="text-2xl font-bold mb-3">
            Continue your preparation
          </Text>
          <ScrollView horizontal>
            {subs.map((sub) => (
              <View key={sub.subject_id}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    handlePress(sub.subject_id, sub.name);
                  }}
                  style={{ backgroundColor: theme.secondaryColor(0.1) }}
                  className="p-5 gap-y-2 items-center rounded-lg mr-3 w-28"
                >
                  <View
                    style={{ backgroundColor: theme.secondaryColor(0.5) }}
                    className="px-1 pb-0.5 rounded-full mb-2 -mr-9 -mt-3"
                  >
                    <Text className="text-white" style={{ fontSize: 6 }}>
                      Semester
                    </Text>
                  </View>
                  <CircularProgress
                    radius={30}
                    value={sub.per}
                    maxValue={100}
                    valueSuffix="%"
                    activeStrokeColor={theme.primaryColor(1)}
                    inActiveStrokeColor={theme.primaryColor(0.2)}
                    inActiveStrokeWidth={8}
                    duration={1000}
                  />
                  <Text className="text-lg font-bold line-clamp-1">
                    {sub.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View className="h-60  items-center justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
};
const styles = StyleSheet.create({});

export default Preparation;

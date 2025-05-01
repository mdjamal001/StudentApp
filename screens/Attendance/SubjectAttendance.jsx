import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Button,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../Theme";
import { Calendar } from "react-native-calendars";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as SQLite from "expo-sqlite";
import * as NavigationBar from "expo-navigation-bar";
import { getCurrentDateInfo } from "../../utils/currentDate";

import { SafeAreaProvider } from "react-native-safe-area-context";

const SubjectAttendance = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [todayDate, setTodayDate] = useState("");

  const currentDate = getCurrentDateInfo();

  const months = {
    //name to number object
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const months2 = {
    //number to name object
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const [datesToBeMarked, setDatesToBeMarked] = useState({});
  // const [selectedDate, setSelectedDate] = useState({
  //   day: 1,
  //   month: 1,
  //   year: 1,
  // });
  const [showModal, setShowModal] = useState(false);
  const [markedStatus, setMarkedStatus] = useState({
    //stores selected date and selected status
    selectedDate: { day: 1, month: 1, year: 1, dateString: "1" },
    status: "",
  });
  const [currentMarkedStatus, setCurrentMarkedStatus] = useState(""); //stores the status before modal even opened

  const findMarkedStatus = (date) => {
    let color = "";
    console.log("Selected date: ", date.dateString);
    if (datesToBeMarked[date.dateString]) {
      color = datesToBeMarked[date.dateString].dotColor;
    } else {
      setMarkedStatus({ selectedDate: date, status: "" });
      setShowModal(true);
      return;
    }
    let status =
      color === "green"
        ? "Present"
        : color === "red"
        ? "Absent"
        : color === "orange"
        ? "Cancelled"
        : "Not Marked";

    setCurrentMarkedStatus(status);
    setMarkedStatus({ selectedDate: date, status });
    setShowModal(true);
  };

  const handleAttUpdate = async () => {
    const db = await SQLite.openDatabaseAsync("localStorage");
    await db.execAsync(
      `UPDATE attendance SET status="${markedStatus.status}" WHERE subject_id=${
        params.id
      } AND date="${markedStatus.selectedDate.day}-${
        months2[markedStatus.selectedDate.month]
      }-${markedStatus.selectedDate.year}"`
    );
    if (markedStatus.status === "Present") {
      await db.execAsync(
        `UPDATE subjects SET attended_classes=attended_classes+1, total_classes=total_classes+1 WHERE id=${params.id}`
      );
    } else if (markedStatus.status === "Absent") {
      await db.execAsync(
        `UPDATE subjects SET total_classes=total_classes+1 WHERE id=${params.id}`
      );
    }
    await db.execAsync(
      `UPDATE subjects SET attendance_percent=(attended_classes/total_classes)*100 WHERE id=${params.id}`
    );

    setDatesToBeMarked({
      ...datesToBeMarked,
      [markedStatus.selectedDate.dateString]: {
        marked: true,
        dotColor:
          markedStatus.status === "Present"
            ? "green"
            : markedStatus.status === "Absent"
            ? "red"
            : markedStatus.status === "Cancelled"
            ? "orange"
            : "gray",
      },
    });
    setShowModal(false);
    setCurrentMarkedStatus("");
  };

  useFocusEffect(
    useCallback(() => {
      setTodayDate(
        `${currentDate.year}-${months[currentDate.month]}-${currentDate.date}`
      );
      const getAttHistory = async () => {
        const db = await SQLite.openDatabaseAsync("localStorage");
        const result = await db.getAllAsync(
          `SELECT * FROM attendance WHERE subject_id=${params.id}`
        );
        // console.log("Attendance history: ", result)

        if (result.length > 0) {
          let datesResult = {};
          result.forEach((attRecord) => {
            let date = attRecord.date.split("-");
            let formattedDate = `${date[2]}-${months[date[1]]}-${date[0]}`;
            let status = attRecord.status;
            let markerColor =
              status === "Present"
                ? "green"
                : status === "Absent"
                ? "red"
                : status === "Cancelled"
                ? "orange"
                : "gray";

            datesResult[formattedDate] = {
              marked: true,
              dotColor: markerColor,
            };
          });
          // console.log("Result: ", datesResult);
          setDatesToBeMarked(datesResult);
        }
      };
      getAttHistory();
    }, [params.id])
  );

  const isSelectedDateMarked = () => {
    //To check if selected date is one of the dates whose record is stored in DB
    if (datesToBeMarked[markedStatus.selectedDate.dateString]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View className="bg-white h-full">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 5 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5 line-clamp-1">
          {params.subject_name}
        </Text>
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
          statusBarTranslucent={true}
        >
          <View
            style={{
              ...styles.centeredView,
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            <View className="w-5/6 bg-white p-4 pt-8 gap-y-3 rounded-xl">
              <Text className="text-center text-xl font-semibold mb-3">
                {markedStatus.selectedDate.day.toString().length == 1
                  ? "0"
                  : ""}
                {markedStatus.selectedDate.day}-
                {markedStatus.selectedDate.month.toString().length == 1
                  ? "0"
                  : ""}
                {markedStatus.selectedDate.month}-
                {markedStatus.selectedDate.year}
              </Text>
              {isSelectedDateMarked() ? (
                <View>
                  <Text className="text-center font-semibold mb-5">
                    Current status: {currentMarkedStatus}
                  </Text>
                  <View className="flex-row justify-evenly items-center mb-5">
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setMarkedStatus({ ...markedStatus, status: "Present" });
                      }}
                      className="p-2 px-4 rounded-lg"
                      style={{
                        borderWidth: 2,
                        backgroundColor:
                          markedStatus.status === "Present" ? "green" : "white",
                        borderColor: "green",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            markedStatus.status === "Present"
                              ? "white"
                              : "green",
                        }}
                      >
                        Present
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setMarkedStatus({ ...markedStatus, status: "Absent" });
                      }}
                      className="p-2 px-4 rounded-lg"
                      style={{
                        borderWidth: 2,
                        backgroundColor:
                          markedStatus.status === "Absent" ? "red" : "white",
                        borderColor: "red",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            markedStatus.status === "Absent" ? "white" : "red",
                        }}
                      >
                        Absent
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setMarkedStatus({
                          ...markedStatus,
                          status: "Cancelled",
                        });
                      }}
                      className="p-2 px-4 rounded-lg"
                      style={{
                        borderWidth: 2,
                        backgroundColor:
                          markedStatus.status === "Cancelled"
                            ? "orange"
                            : "white",
                        borderColor: "orange",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            markedStatus.status === "Cancelled"
                              ? "white"
                              : "orange",
                        }}
                      >
                        Cancelled
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View className="items-center mb-5">
                  <Text className="text-xl mb-2">No class!</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="p-2 flex-row rounded-md items-center"
                    style={{ backgroundColor: theme.primaryColor(1) }}
                  >
                    <AntDesign name="plus" size={15} color={"white"} />
                    <Text className="text-white">Add</Text>
                  </TouchableOpacity>
                </View>
              )}
              {isSelectedDateMarked() ? (
                <View className="flex-row justify-evenly ">
                  <Pressable
                    className="p-2 rounded-lg px-5"
                    style={{ backgroundColor: theme.secondaryColor(0.25) }}
                    onPress={() => setShowModal(!showModal)}
                  >
                    <Text className=" font-semibold text-lg">Cancel</Text>
                  </Pressable>
                  <Pressable
                    disabled={
                      markedStatus.status === currentMarkedStatus ? true : false
                    }
                    className="p-2 rounded-lg px-6"
                    style={{
                      backgroundColor: theme.primaryColor(1),
                      opacity:
                        markedStatus.status === currentMarkedStatus ? 0.5 : 1,
                    }}
                    onPress={() => handleAttUpdate()}
                  >
                    <Text className="text-white font-semibold text-lg">
                      Done
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View className="flex-row justify-evenly ">
                  <Pressable
                    className="p-2 rounded-lg px-5"
                    style={{ backgroundColor: theme.secondaryColor(0.25) }}
                    onPress={() => setShowModal(!showModal)}
                  >
                    <Text className=" font-semibold text-lg">Okay!</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView>
        <Animated.View
          entering={FadeIn.delay(100).duration(800)}
          className="items-center bg-white p-5 m-2  mt-2 rounded-lg"
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          {/* <View className="items-center bg-white p-5 m-2  mt-2"> */}
          <CircularProgress
            radius={70}
            value={params.attendance_percent}
            duration={1500}
            titleColor="#252525"
            activeStrokeColor={theme.primaryColor(1)}
            inActiveStrokeColor={theme.primaryColor(0.2)}
            valueSuffix="%"
          />
          <View className="mt-5 flex-row justify-evenly w-full">
            <View
              className="items-center p-3 rounded-lg w-40"
              style={{ backgroundColor: theme.primaryColor(0.2) }}
            >
              <Text className="text-3xl font-semibold text-gray-800">
                {params.total_classes}
              </Text>
              <Text className="text-sm">Total classes</Text>
            </View>
            <View
              className="items-center p-3 rounded-lg w-40"
              style={{ backgroundColor: theme.primaryColor(0.2) }}
            >
              <Text className="text-3xl font-semibold text-gray-800">
                {params.attended_classes}
              </Text>
              <Text className="text-sm">Attended classes</Text>
            </View>
          </View>
          {/* </View> */}
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(200).duration(800)}
          className="m-2 mt-0 rounded-lg px-1 pb-2 bg-white"
          style={{
            elevation: 4,
          }}
        >
          {/* <View className="m-2 mt-0"> */}
          <Calendar
            theme={{
              todayBackgroundColor: theme.primaryColor(0.75),
              todayTextColor: "white",
              arrowColor: theme.primaryColor(1),
              textDayFontFamily: "Poppins_400Regular",
              textMonthFontFamily: "Poppins_500Medium",
              textDayHeaderFontFamily: "Poppins_500Medium",
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
            entering={FadeInDown.delay(100).duration(800)}
            hideExtraDays={true}
            markedDates={datesToBeMarked}
            onDayPress={(date) => {
              findMarkedStatus(date);
            }}
            minDate="2025-01-01"
            maxDate={todayDate}
            // disableAllTouchEventsForDisabledDays={true}
          />
          {/* </View> */}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SubjectAttendance;

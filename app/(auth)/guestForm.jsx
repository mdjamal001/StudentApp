import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { theme } from "../../Theme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { db_init } from "../../LocalStorage/database";

const GuestForm = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [degreetype, setDegreeType] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState();

  const branchItems = [
    { label: "CSE (Computer Science)", value: "CSE" },
    { label: "ECE (Electronics and Communications)", value: "ECE" },
    { label: "EEE (Electrical and Electronics)", value: "EEE" },
    { label: "CE (Civil)", value: "CE" },
    { label: "ME (Mechanical)", value: "ME" },
  ];

  const semesterItems = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
  ];

  const ifFormFilled = () => {
    return name.length > 0 && degreetype && branch && semester;
  };

  const handleProceed = async () => {
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("degreeType", degreetype);
      await AsyncStorage.setItem("branch", branch);
      await AsyncStorage.setItem("semester", semester.toString());

      setShowModal(true);

      await db_init();

      setShowModal(false);
      router.push("/(tabs)");
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <View className="flex-1 items-center bg-white">
      <View>
        <Modal
          visible={showModal}
          transparent
          statusBarTranslucent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            <LottieView
              source={require("../../assets/animations/loadingAnimation.json")}
              loop
              autoPlay
              style={{ height: 100, width: 100 }}
            />
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className="p-1.5 rounded-xl absolute top-14 left-5 z-10"
        style={{ backgroundColor: "white" }}
      >
        <AntDesign name="arrowleft" size={20} color={theme.primaryColor(1)} />
      </TouchableOpacity>

      <StatusBar style="light" />

      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        className="w-full h-72 justify-center gap-y-5"
        style={{ backgroundColor: theme.primaryColor(1) }}
      >
        <Text className="text-white text-5xl font-bold ml-10 mt-8">Hello,</Text>
        <Text className="text-white text-2xl font-bold ml-10 ">
          Proceed to continue!
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(800).springify()}
        className="bg-white w-5/6 rounded-2xl -mt-10 p-8 gap-y-3"
        style={{ elevation: 5 }}
      >
        {/* Name Input */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Name</Text>
          <View
            className="p-1 pl-3 rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={theme.secondaryColor(0.25)}
              onChangeText={setName}
              value={name}
              className="text-lg"
              cursorColor={theme.primaryColor(1)}
            />
          </View>
        </View>

        {/* Degree Picker */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Degree type</Text>
          <View
            className="rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <Picker
              selectedValue={degreetype}
              onValueChange={(value) => setDegreeType(value)}
              style={{ height: 50 }}
            >
              <Picker.Item
                label="Choose your degree..."
                value={null}
                color="rgba(0,0,0,0.2)"
              />
              <Picker.Item label="B.Tech" value="B.Tech" color="black" />
            </Picker>
          </View>
        </View>

        {/* Branch Picker */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Branch</Text>
          <View
            className="rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <Picker
              selectedValue={branch}
              onValueChange={(value) => setBranch(value)}
              style={{ height: 50 }}
            >
              <Picker.Item
                label="Choose your branch..."
                value={null}
                color="rgba(0,0,0,0.2)"
              />
              {branchItems.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color="black"
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Semester Picker */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Semester</Text>
          <View
            className="rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <Picker
              selectedValue={semester}
              onValueChange={(value) => setSemester(value)}
              style={{ height: 50 }}
            >
              <Picker.Item
                label="Choose your semester..."
                value={null}
                color="rgba(0,0,0,0.2)"
              />
              {semesterItems.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color="black"
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          className="p-4 items-center rounded-lg mt-3"
          style={{
            backgroundColor: theme.primaryColor(1),
            opacity: ifFormFilled() ? 1 : 0.5,
          }}
          onPress={handleProceed}
          disabled={!ifFormFilled()}
        >
          <Text className="text-white text-xl">Proceed</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default GuestForm;

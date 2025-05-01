import { AntDesign, Entypo } from "@expo/vector-icons";
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
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { db_init } from "../../LocalStorage/database";
import { supabase } from "../../utils/supabase";

const SignUp = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollno] = useState("");

  const [passVisible, setPassVisible] = useState(false);

  const ifFormFilled = () => {
    return (
      name.length > 0 &&
      rollno.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  };

  const handleProceed = async () => {
    try {
      setShowModal(true);

      const response = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (response.error != null) {
        setShowModal(false);
        if (
          response.error.message.includes(
            "Unable to validate email address: invalid format"
          )
        ) {
          alert("Please enter a valid email address!");
          return;
        }
        alert(response.error.message);
        return;
      }

      const user_id = response.data?.user?.id;
      console.log("User ID: ", user_id);
      console.log("SignUp Response: ", response);

      if (user_id) {
        const insertResponse = await supabase.from("users").insert({
          user_id: user_id,
          name: name,
          email: email,
          roll_no: rollno,
        });
        if (insertResponse.error) {
          alert("Server error, please try again later!");
          setShowModal(false);
          return;
        }
      }

      setShowModal(false);
      router.push("/confirmEmail");
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
        activeOpacity={0.75}
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
          SignUp to continue!
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

        {/* Roll No Input */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Roll Number</Text>
          <View
            className="p-1 pl-3 rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <TextInput
              placeholder="Enter your roll no."
              placeholderTextColor={theme.secondaryColor(0.25)}
              onChangeText={setRollno}
              value={rollno}
              className="text-lg"
              cursorColor={theme.primaryColor(1)}
            />
          </View>
        </View>

        {/* Email Input */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Email</Text>
          <View
            className="p-1 pl-3 rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <TextInput
              placeholder="abc@123"
              placeholderTextColor={theme.secondaryColor(0.25)}
              onChangeText={setEmail}
              value={email}
              className="text-lg"
              cursorColor={theme.primaryColor(1)}
            />
          </View>
        </View>

        {/* Password Input */}
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Password</Text>
          <View
            className="p-1 pl-3 rounded-lg mt-2 flex-row items-center"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={theme.secondaryColor(0.25)}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={passVisible ? false : true}
              maxLength={15}
              className="text-lg w-10/12"
              cursorColor={theme.primaryColor(1)}
            />
            <TouchableOpacity onPress={() => setPassVisible(!passVisible)}>
              <Entypo name={passVisible ? "eye-with-line" : "eye"} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SignUp Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          className="p-4 items-center rounded-lg mt-3"
          style={{
            backgroundColor: theme.primaryColor(1),
            opacity: ifFormFilled() ? 1 : 0.5,
          }}
          onPress={handleProceed}
          disabled={!ifFormFilled()}
        >
          <Text className="text-white text-xl">SignUp</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(500).duration(500)}
        className="mt-3 flex-row "
      >
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/signIn")}>
          <Text style={{ color: theme.primaryColor(1) }}> LogIn</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUp;

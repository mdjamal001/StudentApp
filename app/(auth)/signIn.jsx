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
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { supabase } from "../../utils/supabase";

const SignIn = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passVisible, setPassVisible] = useState(false);

  const ifFormFilled = () => {
    return email.length > 5 && password.length > 5;
  };

  const handleProceed = async () => {
    try {
      setShowModal(true);

      const respose = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log("SignIn Response: ", respose);

      setShowModal(false);
      if (respose.error) {
        alert(respose.error.message);
        return;
      }
      router.push("/currentDetails");
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
        activeOpacity={0.5}
        onPress={() => router.back()}
        className="p-1.5 rounded-xl absolute top-14 left-5 z-10"
        style={{ backgroundColor: "white" }}
      >
        <AntDesign name="arrowleft" size={20} color={theme.primaryColor(1)} />
      </TouchableOpacity>

      <StatusBar style="light" />

      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        className="w-full h-96 justify-center gap-y-5"
        style={{ backgroundColor: theme.primaryColor(1) }}
      >
        <Text className="text-white text-5xl font-bold ml-10 mt-8">
          Welcome back,
        </Text>
        <Text className="text-white text-2xl font-bold ml-10 ">
          LogIn to continue!
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(800).springify()}
        className="bg-white w-5/6 rounded-2xl -mt-10 p-8 gap-y-3"
        style={{ elevation: 5 }}
      >
        {/* email Input */}
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

        {/* password Input */}
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
              className="text-lg w-10/12"
              cursorColor={theme.primaryColor(1)}
            />
            <TouchableOpacity onPress={() => setPassVisible(!passVisible)}>
              <Entypo name={passVisible ? "eye-with-line" : "eye"} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* LogIn Button */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="p-4 items-center rounded-lg mt-3"
          style={{
            backgroundColor: theme.primaryColor(1),
            opacity: ifFormFilled() ? 1 : 0.5,
          }}
          onPress={handleProceed}
          disabled={!ifFormFilled()}
        >
          <Text className="text-white text-xl">LogIn</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(500).duration(500)}
        className="mt-3 flex-row "
      >
        <Text>Don't have an accout?</Text>
        <TouchableOpacity onPress={() => router.replace("/signUp")}>
          <Text style={{ color: theme.primaryColor(1) }}> SignUp</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignIn;

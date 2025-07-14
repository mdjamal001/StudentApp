import { AntDesign, EvilIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../../utils/supabase";
import { theme } from "../../../Theme";
import { AuthContext } from "../../../utils/AuthContext";
import ResourceCard from "../../../components/Academics/ResourceCard";

const Resources = () => {
  const { user } = useContext(AuthContext);

  const params = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchResources = async () => {
        try {
          const { data, error } = await supabase
            .from("resources")
            .select("*")
            .eq("subject", params.subject)
            .eq("category", params.type);

          if (error) {
            console.error("Error fetching resources:", error);
          } else {
            console.log("Fetched resources:", data);
            setResources(data);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error in fetchResources:", error);
        }
      };

      fetchResources();
    }, [params.subject, params.type])
  );

  return (
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-md ml-3 mr-5 line-clamp-1">
          {params.subject}
          {" > "}
          {params.type}
        </Text>
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} />
        </View>
      ) : resources.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            className="p-2 gap-1.5"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "auto",
            }}
          >
            {resources.map((resource, index) => (
              <ResourceCard res={resource} key={index} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No resources available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Resources;

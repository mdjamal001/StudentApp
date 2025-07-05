import { AntDesign, EvilIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../../utils/supabase";
import { theme } from "../../../Theme";

const Resources = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

  const downloadFile = async (filePath, fileName) => {
    const { data } = supabase.storage.from("resources").getPublicUrl(filePath);

    const localUri = FileSystem.documentDirectory + fileName;

    const downloadResumable = FileSystem.createDownloadResumable(
      data.publicUrl,
      localUri
    );

    const { uri } = await downloadResumable.downloadAsync();

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert("File downloaded to: " + uri);
    }
  };

  const openResource = async (resource) => {
    const { data } = supabase.storage
      .from("resources")
      .getPublicUrl(resource.file_url);

    await WebBrowser.openBrowserAsync(data.publicUrl);
  };

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
      ) : (
        <View
          className="p-2 gap-2"
          style={{
            flexDirection: resources.length > 0 ? "row" : "none",
            flexWrap: resources.length > 0 ? "wrap" : "nowrap",
            justifyContent: resources.length > 0 ? "flex-start" : "center",
            alignItems: resources.length > 0 ? "flex-start" : "center",
            height: resources.length > 0 ? "auto" : "90%",
          }}
        >
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                className="bg-white p-4 rounded-lg mb-1"
                style={{ elevation: 5, width: "48.5%" }}
                onPress={() => {
                  openResource(resource);
                }}
              >
                <Text className="text-lg font-semibold line-clamp-1">
                  {resource.title}
                </Text>
                <Text className="text-gray-500">{resource.uploaded_by}</Text>
                <Text className="text-gray-500 text-xs">
                  Upload Date: {resource.created_at.split("T")[0]}
                </Text>
                <View className="flex-row justify-between items-center mt-3">
                  <View className="flex-row items-center ">
                    <EvilIcons name="like" size={22} color={"black"} />
                    <Text className="text-gray-500 text-s">
                      {resource.likes}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="py-1.5 px-2 rounded-full"
                    style={{ backgroundColor: theme.primaryColor(0.15) }}
                    onPress={() => {
                      downloadFile(resource.file_url, resource.title);
                    }}
                  >
                    <AntDesign name="download" size={15} color={"gray"} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500">No resources available</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Resources;

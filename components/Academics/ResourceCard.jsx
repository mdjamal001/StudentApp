import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { supabase } from "../../utils/supabase";
import { theme } from "../../Theme";
import { AuthContext } from "../../utils/AuthContext";

const ResourceCard = ({ res }) => {
  const { user } = useContext(AuthContext);
  const [resource, setResource] = useState(res);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const isLink = () => {
    return (
      resource.category === "Youtube Link" || resource.category === "Websites"
    );
  };

  const downloadFile = async (filePath, fileName) => {
    if (!user) {
      alert("You need to be logged in to download files.");
      return;
    }
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

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
      alert("Failed to open the link. Please try again.");
    });
  };

  const openResource = async (resource) => {
    const { data } = supabase.storage
      .from("resources")
      .getPublicUrl(resource.file_url);

    await WebBrowser.openBrowserAsync(data.publicUrl);
  };

  const handleLike = async () => {
    if (!user) {
      alert("You need to be logged in to like resources.");
      return;
    }

    if (isLiked) {
      const { error } = await supabase
        .from("resource_likes")
        .delete()
        .eq("resource_id", resource.id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error unliking resource:", error);
        return;
      }
      setIsLiked(false);
      console.log("Resource unliked successfully");
      setLikeCount(likeCount - 1);
    } else {
      const { error } = await supabase
        .from("resource_likes")
        .insert([{ resource_id: resource.id, user_id: user.id }]);

      if (error) {
        console.error("Error liking resource:", error);
        return;
      }
      setIsLiked(true);
      console.log("Resource liked successfully");
      setLikeCount(likeCount + 1);
    }
  };

  useEffect(() => {
    const fetchLikesCount = async () => {
      const { count: like_count, error } = await supabase
        .from("resource_likes")
        .select("*", { count: "exact", head: true })
        .eq("resource_id", resource.id);

      if (error) {
        console.error("Error fetching like count:", error);
      } else {
        console.log("Like count fetched:", like_count);
        setLikeCount(like_count);
      }
    };
    const checkIfLiked = async () => {
      const { data, error } = await supabase
        .from("resource_likes")
        .select("*")
        .eq("resource_id", resource.id)
        .eq("user_id", user.id);
      if (error) {
        console.log("Error checking like status:", error);
      } else if (data.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      console.log("Like status checked:", data);
    };
    fetchLikesCount();
    checkIfLiked();
  }, []);
  return (
    <View
      className="bg-white p-4 rounded-lg mb-1"
      style={{ elevation: 5, width: isLink() ? "100%" : "49%" }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        //   key={index}

        onPress={() => {
          if (isLink()) {
            openLink(resource.url);
          } else {
            openResource(resource);
          }
        }}
      >
        <Text className="text-lg font-semibold line-clamp-1">
          {resource.title}
        </Text>
        <Text className="text-gray-500">{resource.uploaded_by}</Text>
        <Text className="text-gray-500 text-xs">
          Upload Date: {resource.created_at.split("T")[0]}
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row items-center ">
          <TouchableOpacity activeOpacity={0.5} onPress={handleLike}>
            <FontAwesome
              name={isLiked ? "thumbs-up" : "thumbs-o-up"}
              size={15}
              color={isLiked ? theme.primaryColor(1) : "black"}
            />
          </TouchableOpacity>
          <Text className="text-gray-500 text-s ml-1">{likeCount}</Text>
        </View>
        {!isLink() ? (
          <TouchableOpacity
            className="py-1.5 px-2 rounded-full"
            style={{ backgroundColor: theme.primaryColor(0.15) }}
            onPress={() => {
              downloadFile(resource.file_url, resource.title);
            }}
          >
            <AntDesign name="download" size={15} color={"gray"} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResourceCard;

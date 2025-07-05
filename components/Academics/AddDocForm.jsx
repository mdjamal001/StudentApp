import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../Theme";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const AddDocForm = ({ subject }) => {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
        console.log("File selected: ", result.assets[0]);
      } else {
        console.log("File selection cancelled");
      }
    } catch (error) {
      console.log("Error picking document: ", error);
    }
  };

  const formFilled = () => {
    return (
      title.length > 0 && resourceType.length > 0 && (url.length > 0 || file)
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const u_name = await AsyncStorage.getItem("name");
    if (resourceType === "Youtube Link" || resourceType === "Websites") {
      const { error } = await supabase.from("resources").insert({
        title: title,
        subject: subject,
        category: resourceType,
        url: url,
        file_url: null,
        uploaded_by: u_name,
      });

      if (error) {
        console.error("Error inserting data: ", error);
      } else {
        console.log("Data inserted successfully");
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Uploaded successfully!",
          position: "bottom",
        });
        router.replace("/(acadTabs)");
      }
    } else {
      try {
        const { uri, name, mimeType } = file;

        if (name.split(".")[1] != "pdf") {
          alert("Only PDF files are allowed");
          setLoading(false);
          return;
        }

        console.log("File URI: ", uri);
        console.log("File name: ", name);
        console.log("File mimeType: ", mimeType);

        const uploadPath = `${subject}/${resourceType}/${name}`;

        const base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Step 3: Convert base64 to Uint8Array
        const byteArray = Uint8Array.from(atob(base64Data), (c) =>
          c.charCodeAt(0)
        );

        // Step 4: Upload to Supabase
        const { data, error } = await supabase.storage
          .from("resources") // your bucket name
          .upload(uploadPath, byteArray, {
            contentType: mimeType || "application/octet-stream",
          });

        if (error) {
          if (error.message.includes("already exists")) {
            alert(
              "File with the same name already exists. Please rename the file and try again."
            );
            setLoading(false);
          } else {
            console.error("File upload failed:", error);
            alert("File upload failed. Please try again.");
          }
        } else {
          console.log("File uploaded successfully:", data);

          // Insert record in the database with file URL
          const { error: dbError } = await supabase.from("resources").insert({
            title,
            subject,
            category: resourceType,
            url: null,
            file_url: data.path,
            uploaded_by: u_name,
          });

          if (dbError) {
            console.error("DB insert failed:", dbError);
          } else {
            console.log("DB insert successful");
            setLoading(false);
            Toast.show({
              type: "success",
              text1: "Uploaded successfully!",
              position: "bottom",
            });
            router.replace("/(acadTabs)");
          }
        }
      } catch (err) {
        console.error("File upload failed:", err);
      }
    }
  };

  return (
    <View className=" p-5 mt-10 rounded-lg h-auto bg-gray-100 gap-y-5">
      <View>
        <Text style={{ color: theme.primaryColor(1) }}>Title</Text>
        <View
          className="p-1 pl-3 rounded-lg mt-2"
          style={{ backgroundColor: theme.secondaryColor(0.2) }}
        >
          <TextInput
            placeholder="Enter resource title"
            placeholderTextColor={theme.secondaryColor(0.25)}
            onChangeText={setTitle}
            value={title}
            className="text-lg"
            cursorColor={theme.primaryColor(1)}
          />
        </View>
      </View>

      {/* Subject name */}
      <View>
        <Text style={{ color: theme.primaryColor(1) }}>Subject</Text>
        <View
          className="p-1 pl-3 rounded-lg mt-2"
          style={{ backgroundColor: theme.secondaryColor(0.2) }}
        >
          <TextInput
            placeholder="Enter resource title"
            placeholderTextColor={theme.secondaryColor(0.25)}
            value={subject}
            editable={false}
            className="text-lg line-clamp-1 opacity-50"
            cursorColor={theme.primaryColor(1)}
          />
        </View>
      </View>

      {/* resource type Picker */}
      <View>
        <Text style={{ color: theme.primaryColor(1) }}>Resource type</Text>
        <View
          className="rounded-lg mt-2"
          style={{ backgroundColor: theme.secondaryColor(0.2) }}
        >
          <Picker
            selectedValue={resourceType}
            onValueChange={(value) => setResourceType(value)}
            style={{ height: 50 }}
          >
            <Picker.Item
              label="Choose resource type..."
              value={null}
              color="rgba(0,0,0,0.2)"
            />
            <Picker.Item label="Document" value="Document" color="black" />
            <Picker.Item
              label="Youtube Link"
              value="Youtube Link"
              color="black"
            />
            <Picker.Item
              label="Classroom Notes"
              value="Classroom Notes"
              color="black"
            />
            <Picker.Item label="Text Book" value="Text Book" color="black" />
            <Picker.Item label="Website" value="Website" color="black" />
            <Picker.Item
              label="Question Paper"
              value="Question Paper"
              color="black"
            />
            <Picker.Item label="Other" value="Other" color="black" />
          </Picker>
        </View>
      </View>

      {resourceType === "Document" ||
      resourceType === "Question Paper" ||
      resourceType === "Text Books" ||
      resourceType === "Classroom Notes" ||
      resourceType === "Other" ? (
        <View className="flex-row gap-x-3 items-center overflow-hidden">
          <TouchableOpacity
            activeOpacity={0.8}
            className="p-2.5 rounded-lg"
            style={{ backgroundColor: theme.primaryColor(0.25) }}
            onPress={pickDocument}
          >
            <Text>CHOOSE FILE</Text>
          </TouchableOpacity>
          <Text className="">
            {file == null ? "No file chosen" : file.name}
          </Text>
        </View>
      ) : (
        <View />
      )}

      {resourceType === "Youtube Link" || resourceType === "Websites" ? (
        <View>
          <Text style={{ color: theme.primaryColor(1) }}>Link/URL</Text>
          <View
            className="p-1 pl-3 rounded-lg mt-2"
            style={{ backgroundColor: theme.secondaryColor(0.2) }}
          >
            <TextInput
              placeholder="Enter the Link/URL"
              placeholderTextColor={theme.secondaryColor(0.25)}
              value={url}
              onChangeText={setUrl}
              className="text-lg line-clamp-1"
              cursorColor={theme.primaryColor(1)}
            />
          </View>
        </View>
      ) : (
        <View />
      )}

      {/* Submit button */}
      <TouchableOpacity
        className="p-3 mt-3 rounded-lg items-center"
        style={{ backgroundColor: theme.primaryColor(1) }}
        activeOpacity={0.75}
        onPress={async () => {
          await handleSubmit();
        }}
        disabled={!formFilled()}
      >
        {loading ? (
          <ActivityIndicator size={"small"} className="my-1" color={"white"} />
        ) : (
          <Text className="text-white text-2xl">Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddDocForm;

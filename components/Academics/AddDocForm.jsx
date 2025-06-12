import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
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

const AddDocForm = ({ subject }) => {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
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
    const name = await AsyncStorage.getItem("name");
    if (resourceType === "Youtube Link" || resourceType === "Websites") {
      const { error } = await supabase.from("resources").insert({
        title: title,
        subject: subject,
        category: resourceType,
        url: url,
        file_url: null,
        uploaded_by: name,
      });

      if (error) {
        console.error("Error inserting data: ", error);
      } else {
        console.log("Data inserted successfully");
      }
    } else {
      try {
        const { uri, name, mimeType } = file;

        console.log("File URI: ", uri);
        console.log("File name: ", name);
        console.log("File mimeType: ", mimeType);

        const response = await fetch(uri);
        const blob = await response.blob();

        console.log("Blob: ", blob);

        console.log(`Upload path: ${subject}/${resourceType}/${name}`);

        const { data, error } = await supabase.storage
          .from("resources")
          .upload(`${subject}/${resourceType}/${name}`, blob, {
            contentType: mimeType || "application/octet-stream",
          });

        console.log("checkpoint 1");

        if (error) {
          console.error("Error uploading file: ", error);
        } else {
          console.log("File uploaded successfully: ", data);
        }
      } catch (error) {
        console.error("Error uploading file: ", error);
      }

      // const { error } = await supabase.from("resources").insert({
      //   title: title,
      //   subject: subject,
      //   category: resourceType,
      //   url: null,
      //   file_url: `${subject}/${resourceType}/${file.name}`,
      //   uploaded_by: name,
      // });

      // if (error) {
      //   console.error("Error inserting data: ", error);
      // } else {
      //   console.log("Data inserted successfully");
      // }
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
            <Picker.Item label="Text Books" value="Text Books" color="black" />
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
          router.replace("/(acadTabs)");
        }}
        disabled={!formFilled()}
      >
        <Text className="text-white text-2xl">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddDocForm;

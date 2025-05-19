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

const AddDocForm = ({ subject }) => {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState(null);
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
            <Picker.Item label="B.Tech" value="B.Tech" color="black" />
          </Picker>
        </View>
      </View>

      {/* File picker */}
      <View className="flex-row gap-x-3 items-center overflow-hidden">
        <TouchableOpacity
          activeOpacity={0.8}
          className="p-2.5 rounded-lg"
          style={{ backgroundColor: theme.primaryColor(0.25) }}
          onPress={pickDocument}
        >
          <Text>CHOOSE FILE</Text>
        </TouchableOpacity>
        <Text className="">{file == null ? "No file chosen" : file.name}</Text>
      </View>

      {/* Submit button */}
      <TouchableOpacity
        className="p-3 mt-3 rounded-lg items-center"
        style={{ backgroundColor: theme.primaryColor(1) }}
        activeOpacity={0.75}
        onPress={() => {
          router.replace("/(acadTabs)");
        }}
      >
        <Text className="text-white text-2xl">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddDocForm;

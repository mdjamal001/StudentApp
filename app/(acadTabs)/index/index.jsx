import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSubject } from "../../../utils/SubjectContext";
import { theme } from "../../../Theme";
import { ScrollView } from "react-native";
import AddDocForm from "../../../components/Academics/AddDocForm";

const Index = () => {
  const { selectedAcademicSubject } = useSubject();
  const router = useRouter();

  const [showAddDocForm, setShowAddDocForm] = useState(false);

  const categories = [{ name: "Documents", icon: "" }];

  return (
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5 line-clamp-1">
          {selectedAcademicSubject}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center p-2 gap-y-3">
          {/* Documents card */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: { type: "Documents", subject: selectedAcademicSubject },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <MaterialCommunityIcons
              name="file-document-multiple"
              size={35}
              color={theme.primaryColor(1)}
            />
            <View className="ml-8">
              <Text className="text-xl">Documents</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* YT Links card */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: {
                  type: "Youtube Links",
                  subject: selectedAcademicSubject,
                },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <AntDesign name="youtube" size={35} color={theme.primaryColor(1)} />
            <View className="ml-8">
              <Text className="text-xl">Youtube Links</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* Classroom Notes */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: {
                  type: "Classroom Notes",
                  subject: selectedAcademicSubject,
                },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <MaterialCommunityIcons
              name="file-document-edit"
              size={35}
              color={theme.primaryColor(1)}
            />
            <View className="ml-8">
              <Text className="text-xl">Classroom Notes</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* Textbooks */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: { type: "Textbooks", subject: selectedAcademicSubject },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <FontAwesome name="book" size={35} color={theme.primaryColor(1)} />
            <View className="ml-8">
              <Text className="text-xl">Text Books</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* Websites */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: { type: "Websites", subject: selectedAcademicSubject },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <MaterialCommunityIcons
              name="web"
              size={35}
              color={theme.primaryColor(1)}
            />
            <View className="ml-8">
              <Text className="text-xl">Websites</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* Question Papers */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: {
                  type: "Question Papers (prev)",
                  subject: selectedAcademicSubject,
                },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <FontAwesome6
              name="clipboard-question"
              size={35}
              color={theme.primaryColor(1)}
            />
            <View className="ml-8">
              <Text className="text-xl">Question Papers (prev)</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>

          {/* Other Resources */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/resources",
                params: {
                  type: "Other Resources",
                  subject: selectedAcademicSubject,
                },
              });
            }}
            activeOpacity={0.8}
            className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-lg"
          >
            <Entypo name="newsletter" size={35} color={theme.primaryColor(1)} />
            <View className="ml-8">
              <Text className="text-xl">Other Resources</Text>
              <Text className="text-green-500">Available</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={35}
              color={"black"}
              className="ml-auto"
            />
          </TouchableOpacity>
        </View>
        <View className="h-20" />
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-4 p-5 rounded-full right-5"
        style={{ backgroundColor: theme.primaryColor(1), elevation: 8 }}
        activeOpacity={0.8}
        onPress={() => setShowAddDocForm(!showAddDocForm)}
      >
        <AntDesign name="plus" size={25} color={"white"} />
      </TouchableOpacity>
      {showAddDocForm ? (
        <View className="flex-1 items-center justify-center">
          <Modal
            visible={showAddDocForm}
            statusBarTranslucent={true}
            onRequestClose={() => setShowAddDocForm(false)}
            animationType="slide"
          >
            <View className="flex-1 mt-12 mx-5">
              <View className="flex-row items-center gap-8">
                <TouchableOpacity
                  onPress={() => setShowAddDocForm(false)}
                  activeOpacity={0.7}
                  className=" p-2 rounded-full"
                  style={{ backgroundColor: theme.secondaryColor(0.2) }}
                >
                  <AntDesign name="close" size={20} color={"black"} />
                </TouchableOpacity>
                <Text className="text-2xl">Add Resource</Text>
              </View>
              <AddDocForm subject={selectedAcademicSubject} />
            </View>
          </Modal>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;

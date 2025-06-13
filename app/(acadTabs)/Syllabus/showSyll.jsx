import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View , ScrollView,ActivityIndicator} from "react-native";
import * as SQLite from "expo-sqlite";
import { useSubject } from "../../../utils/SubjectContext";
import { useSId } from "../../../utils/SIdContext";
import CheckBox from "../../../components/CheckBox";
import { theme } from "../../../Theme";


const ShowSyll = () => {
  const {Etype} = useLocalSearchParams();
  const router = useRouter();
  const { selectedSubjectId } = useSId();
  const [load,loading]=useState(true);   
  const [dt,dtfun]=useState([]);
  const { selectedAcademicSubject } = useSubject();
  let unit=0;
  useFocusEffect(
        useCallback(
        ()=>{
        const fetchTodo= async ()=>{
           const db = await SQLite.openDatabaseAsync("localStorage");
           const res = await db.getAllAsync(
            `SELECT topic,status,unit FROM syllabus WHERE subject_id=${selectedSubjectId} and Etype="${Etype}"`
          );
          if (res.length > 0) {
            console.log(res);
            dtfun(res);
            loading(false);
          }
        };
        fetchTodo(); 
      },[selectedAcademicSubject,Etype]
     )
    );
  if(!load)
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
                  {Etype} Syllabus
        </Text>
      </View>
      
        <View className="mt-2">
        {dt.length > 0 ? (
                  <ScrollView className="mt-1" showsVerticalScrollIndicator={false}>
                    {dt.map((topics, index) => {
                      if(topics.unit!=unit){
                        unit=topics.unit;
                        return(
                          <View key={index}>
                          <View 
                            className="m-1 mx-1.5 rounded-lg border border-teal-900 bg-cyan-500"
                          style={{ elevation: 8 }}
                          activeOpacity={0.8}
                         >
                          <Text className="text-3xl p-4 w-10/12 font-bold">
                            Unit : {topics.unit}
                          </Text>

                          </View>
                          <View
                          className="m-1 mx-1.5 bg-white rounded-lg flex-row items-center justify-center"
                          style={{ elevation: 5 }}
                          activeOpacity={0.8}
                        >
                          <Text className="text-xl p-6 pl-1 w-10/12">
                            {topics.topic}
                          </Text>
                          <CheckBox topic={topics.topic} val={topics.status} className="mr-5"/>
                        </View>
                        </View>
                      )}
                      else
                      return (
                        <View
                          className="m-1 mx-1.5 bg-white rounded-lg flex-row items-center justify-center"
                          style={{ elevation: 5 }}
                          key={index}
                          activeOpacity={0.8}
                        >
                          <Text className="text-xl p-6 pl-1 w-10/12">
                            {topics.topic}
                          </Text>
                          <CheckBox topic={topics.topic} val={topics.status} className="mr-5"/>
                        </View>
                      );
                    })}
                    <View className="h-28" />
                  </ScrollView>
                ) : (
                  <View></View>
                )}
        
       </View>
      </View>
    
  );
  else 
    return(
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
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size={"large"}/>
            </View>
          </View>
  )
};

const styles = StyleSheet.create({});

export default ShowSyll;

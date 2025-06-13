import { router} from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View,ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useSubject } from "../../../utils/SubjectContext";
import { useSId } from "../../../utils/SIdContext";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../../Theme";
import { useState, useCallback } from "react";
const Syllabus = () => {
  const { selectedAcademicSubject } = useSubject();
  const [mid1Per,setmid1Per]=useState(0);
  const [mid2Per,setmid2Per]=useState(0);
  const [semPer,setsemPer]=useState(0);
  const { selectedSubjectId } = useSId();
  useFocusEffect(
          useCallback(
          ()=>{
          const fetchPercent= async ()=>{
             const db = await SQLite.openDatabaseAsync("localStorage");
             
             const res = await db.getAllAsync(
              `SELECT Etype,status FROM syllabus WHERE subject_id=${selectedSubjectId}`
            );
            let mid1=0;
            let mid2=0;
            let sem=0;
            let m1tot=0;
            let m2tot=0;
            let stot=0;
            if (res.length > 0) {
              for(let x of res){
                if(x.Etype=='mid1'){
                    m1tot++;
                    if(x.status==true)
                      mid1++;
                }
                if(x.Etype=='mid2'){
                    m2tot++;
                    if(x.status==true)
                      mid2++;
                }
                if(x.Etype=='sem'){
                    stot++;
                    if(x.status==true)
                      sem++;
                }    
              }
              let mid1_per = Math.round(
                    (mid1/m1tot) * 100
                  );
                setmid1Per(mid1_per);
              let mid2_per = Math.round(
                    (mid2/m2tot) * 100
                  );
                setmid2Per(mid2_per);
              let sem_per = Math.round(
                    (sem/stot) * 100
                  );
                 setsemPer(sem_per);
             }
          };
          fetchPercent(); 
          
        },[selectedAcademicSubject]
       )
      );
   return(
    <View className="bg-white flex-1">
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2"
        style={{ elevation: 8 }}
      >
        <TouchableOpacity onPress={() => router.replace('../academics')}>
          <AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl  ml-5 line-clamp-1">
          {selectedAcademicSubject}
        </Text>
      </View>
      <View>
        <View className="flex-row justify-around bg-white m-3 pt-3 rounded-lg h-48" style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 6,
          }}>
          <View className="justify-center items-center"> 
              <CircularProgress
              radius={50}
              value={mid1Per}
              valueSuffix="%"
              activeStrokeColor={theme.primaryColor(1)}
              inActiveStrokeColor={theme.primaryColor(0.2)}
              inActiveStrokeWidth={8}
              duration={1000}
            />
              <Text className="text-2xl font-semibold mt-2"> Mid-1</Text>
          </View>
          <View className="justify-center items-center">
             <CircularProgress
               radius={50}
               value={mid2Per}
               valueSuffix="%"
               activeStrokeColor={theme.primaryColor(1)}
               inActiveStrokeColor={theme.primaryColor(0.2)}
               inActiveStrokeWidth={8}
               duration={1000}
             />
             <Text className="text-2xl font-semibold mt-2"> Mid-2 </Text>
          </View>
          <View className="justify-center items-center">
              <CircularProgress
              radius={50}
              value={semPer}
              valueSuffix="%"
              activeStrokeColor={theme.primaryColor(1)}
              inActiveStrokeColor={theme.primaryColor(0.2)}
              inActiveStrokeWidth={8}
              duration={1000}
            />
             <Text className="text-2xl font-semibold mt-2"> Sem </Text>
          </View>
        </View>
        <View className="items-center p-2 gap-y-3">
          <TouchableOpacity className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-md justify-center"
            onPress={() => {
              router.push({
                pathname: "/Syllabus/showSyll",
                params: { Etype: "mid1"},
              });
            }}>
             <Text className="text-2xl font-semibold ">Midterm-1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-md justify-center"
            onPress={() => {
              router.push({
                pathname: "/Syllabus/showSyll",
                params: { Etype: "mid2" },
              });
            }}>
            <Text className="text-2xl font-semibold "> Midterm-2</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full flex-row bg-white px-5 py-6 rounded-lg elevation-md justify-center"
            onPress={() => {
              router.push({
                pathname: "/Syllabus/showSyll",
                params: { Etype: "sem"},
              });
            }}>
            <Text className="text-2xl font-semibold "> Semester </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Syllabus;

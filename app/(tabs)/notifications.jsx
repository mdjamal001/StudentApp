import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Menu,Provider } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../Theme";
import ListObj from "../../components/Notifications/ListObj";
import { supabase } from "../../utils/supabase";
let i=0;
const Notifications = () => {
   const [nlist,getnlist]=useState([]);
   const [load,loading]=useState(true);
   const [str,setStr]=useState(null);
   const [visible, setVisible] = useState(false);

   const fetchonline =async ()=>{
    let s=new Date().toISOString().substring(0,10);
    console.log("WHat up "+ s+"  "+new Date().getHours());
    loading(true);
    const branch = await AsyncStorage.getItem("branch");
    const semester = parseInt(await AsyncStorage.getItem("semester"));
    if(i==0){
    const {data:res,error:er} = 
            await supabase.from('notifications').select('*').eq('semester',semester).eq('branch',branch).order('sentdate',{ascending:false});
    if(er){
       console.log("error : "+er);
      }
      i++;
    }else{
    const {data:res,error:er} = 
            await supabase.from('notifications').select('*').eq('semester',semester).eq('branch',branch).gte('sentdate',s).order('sentdate',{ascending:false});
    if(er){
       console.log("error : "+er);
      }
    }
    if (res.length > 0){ 
      console.log(res);
      const db = await SQLite.openDatabaseAsync("localStorage");
      await db.execAsync(`delete from notiTemp`);
      console.log("YO");
      for (let noti of res) {
      await db.execAsync(
       `INSERT INTO notiTemp (id, title, subject, sentdate, info, sentHour) VALUES (${noti.id}, "${noti.title}", "${noti.subject}", "${noti.sentdate}", "${noti.info}",${noti.sentHour}) `
      );
     }
      await db.execAsync(
       `INSERT INTO notifications (id, title, subject, sentdate, info, sentHour) select id,title,subject,sentdate,info,sentHour from notiTemp where id not in (select id from notifications);`
      );
  }
  fetchNotif();
  loading(false); 
      
   }
   const fetchNotif= async ()=>{
            console.log("DATA   "+str)
            loading(true);
            const db = await SQLite.openDatabaseAsync("localStorage");
            const res = await db.getAllAsync(
                        `SELECT id,title,subject,info,status,sentdate FROM notifications order by sentdate desc, sentHour,id`
                      ); 
            if (res.length > 0) {
              console.log(res);
              getnlist(res);
              loading(false);
            }
            loading(false);
          };
    useEffect(()=>{fetchNotif()},[]);
  if(!load)
   return (
    <Provider>
    <View className="bg-white flex-1">
      <StatusBar style="dark" />
      <View
        className="h-28 bg-white flex-row items-center pt-8 pl-2 justify-between"
        style={{ elevation: 8 }}
      >
        <Text className="text-2xl  ml-5">Notifications</Text>
        <Menu
          visible={visible}
          onDismiss={()=>setVisible(false)}
          anchor={
            <TouchableOpacity onPress={()=>setVisible(true)} className="pl-32 pt-1">
              <FontAwesome name="filter" size={28} color={theme.primaryColor(0.6)} />
            </TouchableOpacity>
          }
          contentStyle={{
            backgroundColor:'white',
            borderRadius:8
          }}
        > 
          <Menu.Item onPress={() => {setStr(null);setVisible(false)}} title="none" />
          <Menu.Item onPress={() => {setStr("Assignment");setVisible(false)}} title="Assignments" />
          <Menu.Item onPress={() => {setStr("Exam");setVisible(false)}} title="Exams" />
          <Menu.Item onPress={() => {setStr("Scholarship");setVisible(false)}} title="Scholarship" />
          <Menu.Item onPress={() => {setStr("Internship");setVisible(false)}} title="Internship" />
          <Menu.Item onPress={() => {setStr("true");setVisible(false);fetchNotif()}} title="Seen" />
          <Menu.Item onPress={() => {setStr("false");setVisible(false);fetchNotif()}} title="Not Seen" />
        </Menu>
         <TouchableOpacity className="pr-10 pt-1" onPress={()=>{setStr();fetchonline()}}> 
          <FontAwesome name="refresh" size={28} color={theme.primaryColor(0.6)}/>
          </TouchableOpacity>
      </View>
    <View>
          {nlist.length > 0 ? (
              <ScrollView className="mt-1" showsVerticalScrollIndicator={false}>
                {nlist.map((listObj, index) => {
                  // if(str==null)
                    return (
                    <ListObj listObj={listObj} index={index} key={index} str={str}/>
                   );
                  // else if(str===listObj.title)
                  //   return (
                  //   <ListObj listObj={listObj} index={index} key={index}/>
                  // );
                })}
                <View className="h-28" />
              </ScrollView>
            ) : (
              <View></View>
            )}
          </View>
    </View>
    </Provider>
  );
  else 
      return(
        <View className="bg-white flex-1">
               <StatusBar style="dark" />
         <View className="h-28 bg-white flex-row items-center pt-8 pl-2 justify-between"
          style={{ elevation: 8 }}>
        <Text className="text-2xl  ml-5">Notifications</Text>
        <TouchableOpacity className="pl-32 pt-1"> 
          <FontAwesome name="filter" size={28} color={theme.primaryColor(0.6)}/>
          </TouchableOpacity>
         <TouchableOpacity className="pr-10 pt-1" onPress={()=>{loading(true);fetchonline();}}> 
          <FontAwesome name="refresh" size={28} color={theme.primaryColor(0.6)}/>
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"}/>
        </View>
     </View>
    )
};
export default Notifications;

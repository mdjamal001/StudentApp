import { Text, TouchableOpacity, View } from "react-native";
import Bell from "./Bell";
import { useState } from "react";
let Id;
const ListItem =({listObj})=>{
  const [touch,setTouch]=useState(false);
  const [saw,setsaw]=useState(Boolean(listObj.status));
  const [Id,setId]=useState(listObj.id);
  console.log(" id"+listObj.id+"  stat:"+Boolean(listObj.status));
  const fun=()=>{if(Id!=listObj.id){setId(listObj.id);setsaw(Boolean(listObj.status))}console.log("wjat:"+saw); return saw;}
  if(!touch)
         return(
            <TouchableOpacity
                      className="m-1 mx-1.5 bg-white rounded-lg p-4 flex-row items-center"
                      style={{ elevation: 5 }}
                      onPress={()=>{if(listObj.info!="null"){setTouch(!touch)};setsaw(true);}}
                      activeOpacity={0.8}
                    >
                    <Bell id={listObj.id} saw={fun()} check={listObj.status}/>
                    <View className="w-11/12">
                      <View className="flex-row justify-between">
                        <Text className="text-2xl line-clamp-1">
                          {listObj.title}
                        </Text>
                        <Text className="text-l line-clamp-1">
                          {listObj.sentdate}
                        </Text>
                      </View>
                      <Text className="text-l line-clamp-1">
                        {listObj.subject}
                      </Text>
                    </View>
                    </TouchableOpacity>
         );
    else
             return(<TouchableOpacity
                      className="m-1 mx-1.5 bg-slate-200 rounded-lg p-4 flex-row items-center"
                      style={{ elevation: 5 }}
                      activeOpacity={0.8}
                      onPress={()=>{setTouch(!touch);setsaw(true)}}
                    >
                      <Bell id={listObj.id} saw={fun()} check={listObj.status}/>
                      <View className="w-11/12">
                      <View className="flex-row justify-between">
                        <Text className="text-2xl line-clamp-1">
                          {listObj.title}
                        </Text>
                        <Text className="text-l line-clamp-1">
                          {listObj.sentdate}
                        </Text>
                      </View>
                      <Text className="text-l line-clamp-1 ">
                        {listObj.subject}
                      </Text>
                      {listObj.info=="null"?null:(<Text className="text-l ">
                        {listObj.info}
                      </Text>)}
                      </View>
                    </TouchableOpacity>
            );
}
export default ListItem;
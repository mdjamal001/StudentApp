import { Text, TouchableOpacity, View } from "react-native";
import * as SQLite from "expo-sqlite";
import Bell from "./Bell";
import { useState } from "react";
import ListItem from "./ListItem";
const ListObj =({listObj,index,str})=>{
  if(str==null)
     return(<ListItem listObj={listObj} key={index}/>);
  else if(str==="true"&&listObj.status==true)
     return(<ListItem listObj={listObj} key={index}/>)
  else if(str==="false"&&listObj.status==false)
     return(<ListItem listObj={listObj} key={index}/>)
  else if(str===listObj.title)
     return(<ListItem listObj={listObj} key={index}/>);
     
        }
export default ListObj;

import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { theme } from "../../Theme";
const setNoti=async (id,saw)=>{
     const db = await SQLite.openDatabaseAsync("localStorage");
     if(saw)
       await db.execAsync(
                  `UPDATE notifications set status =${saw} where id =${id}`
                  );
     console.log("UPDATED!!!!  "+saw+" "+id);
}
const Bell =({id,saw,check})=>{
    if(check)
        return(<MaterialIcons name='notifications-none' size={28} color={theme.primaryColor(0.6)}className="mr-2"/>);
    if(!saw){
        return(<MaterialIcons name='notifications-on' size={28} color={theme.primaryColor(1)} className="mr-2"/>)
    }
    else {
      if(!check)
       setNoti(id,saw);
      return(<MaterialIcons name='notifications-none' size={28} color={theme.primaryColor(0.6)} className="mr-2"/>);
    }
}
export default Bell;
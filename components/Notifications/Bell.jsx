import { MaterialIcons } from "@expo/vector-icons";
const Bell =({saw})=>{
    if(!saw){
        return(<MaterialIcons name='notifications-on' size={28} color='grey'className="mr-2"/>)
    }
    else 
      return(<MaterialIcons name='notifications-none' size={28} color='grey'className="mr-2"/>);
}
export default Bell;
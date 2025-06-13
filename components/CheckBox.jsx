import { Checkbox } from "react-native-paper";
import { useState } from "react";
import * as SQLite from "expo-sqlite";
const setStat=async (topic,val)=>{
     const x= !Boolean(val);
     console.log("Hold up "+x);
     const db = await SQLite.openDatabaseAsync("localStorage");
     await db.execAsync(
                  `UPDATE syllabus set status = ${x} where topic ="${topic}"`
                  );
     console.log("UPDATED!!!!");
}
const CheckBox=({topic,val})=>{
    const [checked, setChecked] = useState(Boolean(val));
return(
<Checkbox              
  status={checked ? 'checked' : 'unchecked'}
  rippleColor="transparent"
  onPress={() => {
  setChecked(!checked);
       setStat(topic,val);
 }}/>);
}
export default CheckBox;

import { Text, TouchableOpacity, View } from "react-native";
import Bell from "./Bell";
import { useState } from "react";
const ListObj = ({ listObj, index, str }) => {
  const [touch, setTouch] = useState(false);
  const [saw, setsaw] = useState(false);
  if (str == null) {
    if (!touch)
      return (
        <TouchableOpacity
          className="m-1 mx-1.5 bg-white rounded-lg p-4 flex-row items-center"
          style={{ elevation: 5 }}
          onPress={() => {
            setTouch(!touch);
            setsaw(true);
          }}
          activeOpacity={0.8}
        >
          <Bell saw={saw} />
          <View>
            <Text className="text-2xl line-clamp-1 ">{listObj.title}</Text>

            <Text className="text-l line-clamp-1 ">{listObj.subject}</Text>
          </View>
        </TouchableOpacity>
      );
    else
      return (
        <TouchableOpacity
          className="m-1 mx-1.5 bg-white rounded-lg p-4 flex-row items-center"
          style={{ elevation: 5 }}
          activeOpacity={0.8}
          onPress={() => {
            setTouch(!touch);
            setsaw(true);
          }}
        >
          <Bell saw={saw} />
          <View>
            <Text className="text-2xl line-clamp-1 ">{listObj.title}</Text>
            <Text className="text-l line-clamp-1 ">{listObj.subject}</Text>
            {listObj.info == null ? null : (
              <Text className="text-l line-clamp-1 ">{listObj.info}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
  } else if (str === listObj.title) {
    if (!touch)
      return (
        <TouchableOpacity
          className="m-1 mx-1.5 bg-white rounded-lg p-4 flex-row items-center"
          style={{ elevation: 5 }}
          onPress={() => {
            setTouch(!touch);
            setsaw(true);
          }}
          activeOpacity={0.8}
        >
          <Bell saw={saw} />
          <View>
            <Text className="text-2xl line-clamp-1 ">{listObj.title}</Text>

            <Text className="text-l line-clamp-1 ">{listObj.subject}</Text>
          </View>
        </TouchableOpacity>
      );
    else
      return (
        <TouchableOpacity
          className="m-1 mx-1.5 bg-white rounded-lg p-4 flex-row items-center"
          style={{ elevation: 5 }}
          activeOpacity={0.8}
          onPress={() => {
            setTouch(!touch);
            setsaw(true);
          }}
        >
          <Bell saw={saw} />
          <View>
            <Text className="text-2xl line-clamp-1 ">{listObj.title}</Text>
            <Text className="text-l line-clamp-1 ">{listObj.subject}</Text>
            <Text className="text-l line-clamp-1 ">{listObj.info}</Text>
          </View>
        </TouchableOpacity>
      );
  }
};
export default ListObj;

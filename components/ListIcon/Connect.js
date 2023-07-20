import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Connect() {
  return (
    <View className="flex justify-center items-center flex-row my-5">
      <Pressable className="mx-2 bg-[#1e40af] p-[5px] rounded-md">
        <MaterialCommunityIcons
          name={"facebook-messenger"}
          size={25}
          color="white"
        />
      </Pressable>
      <Pressable className="mx-2 bg-[#38bdf8] p-[5px] rounded-md">
        <MaterialCommunityIcons name={"twitter"} size={25} color="white" />
      </Pressable>
      <Pressable className="mx-2 bg-[#e11d48] p-[5px] rounded-md">
        <MaterialCommunityIcons name={"mail"} size={25} color="white" />
      </Pressable>
      <Pressable className="mx-2 bg-[#27272a] p-[5px] rounded-md">
        <MaterialCommunityIcons name={"github"} size={25} color="white" />
      </Pressable>
    </View>
  );
}

export default Connect;

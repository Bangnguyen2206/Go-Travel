import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Spinner() {
  return (
    <View className="w-fll h-full flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" className="mx-3" />
    </View>
  );
}

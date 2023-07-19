import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Discover() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full object-cover rounded-md"
          />
        </View>
      </View>
      <View className="flex-row items-center bg-white mx-8 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          debounce={400}
          query={{
            key: "AIzaSyBMJ7a6AWelnVCezKysxcQv0AxOrNRZEYs",
            language: "en",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

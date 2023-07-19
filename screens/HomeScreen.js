import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BgImage } from "../assets";
import * as Animatable from "react-native-animatable";
import { CheckBox } from "react-native-elements";
import { Button } from "@rneui/themed";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "left",
  },
  label: {
    margin: 8,
  },
});

function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* Image container */}
      <View>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={BgImage}
          className="w-full h-[180px] object-cover"
        />
      </View>
      <View className="mx-5 mt-3">
        <Text className="text-lg">Adventure starts here</Text>
        <Text className="text-base font-light">
          Make your app management easy and fun
        </Text>
        <View className="my-2">
          <Text
            for="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={"123"}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>
        <View className="my-2">
          <Text
            for="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </Text>
          <TextInput
            style={styles.input}
            value={"123"}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>
        <View className="my-2">
          <Text
            for="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={"123"}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>
        <View className="my-2">
          <Text
            for="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={"123"}
            placeholder="useless placeholder"
            keyboardType="numeric"
            secureTextEntry={true}
          />
        </View>
        <View className="mt-2 flex-1 justify-start items-center flex-row">
          <CheckBox
            title="I agree to privacy policy & terms"
            checked={true}
            containerStyle={{
              margin: 0,
              marginLeft: 0,
              marginRight: 0,
              backgroundColor: "transparent",
              border: "none",
            }}
            // onPress={() => setCheck1(!check1)}
          />
        </View>
        <View className="mt-7">
          <Button color="purple">Secondary</Button>
        </View>
        <View className="mt-3 my-5 flex justify-center items-center flex-row">
          <Text className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Already have an account?
          </Text>
          <Text className="block mb-2 mx-2 text-lg font-medium text-purple-900 dark:text-white">
            Sign in instead
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

import React from "react";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { create } from "apisauce";
import { SparklesIcon } from "react-native-heroicons/solid";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import Connect from "../components/ListIcon/Connect";
import CheckBox from "../components/Checkbox/Checkbox";
import { BgImage } from "../assets";
import CustomInput from "../components/CustomInput/CustomInput";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 0,
    marginVertical: 10,
    borderColor: "#78716c",
    color: "black",
    borderRadius: 5,
    paddingHorizontal: 7,
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
  barrier: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#78716c",
  },
});

function LogIn() {
  const api = create({
    baseURL: "http://streaming.nexlesoft.com:3001",
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: "Sign Up",
      text2: message,
    });
  };
  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [music, setMusic] = useState(false);
  return (
    <View className="relative w-full h-full">
      <View>
        <Image
          animation="fadeIn"
          easing="ease-in-out"
          source={BgImage}
          className="w-full h-[300px]"
        />
      </View>
      <View className="bg-bgColor py-4 px-10 h-full blur-sm">
        <Text className="text-xl mb-2">
          Welcome to Entrance Test Interview!
        </Text>
        <Text className="text-base font-light">
          Please sign-in to your account adn start the adventure
        </Text>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is not empty"),
          })}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="my-4">
              <CustomInput
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                errors={errors.email}
                title={"Email"}
                touched={touched.email}
                required={true}
                id="email"
                placeholder="Enter your email..."
              />
              <View className="flex-1 justify-between items-center flex-row mt-4 mb-2">
                <Text className="block text-base font-medium text-gray-500 dark:text-white">
                  Password <Text className="text-red-600">*</Text>
                </Text>
                <Text className="text-base font-medium text-[#7c3aed]">
                  Forget password?
                </Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Enter your password..."
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10" }}
                  className="mb-2"
                >
                  {errors.password}
                </Text>
              )}
              <View className="my-2">
                <CheckBox
                  onPress={() => setMusic(!music)}
                  title="Remember me"
                  isChecked={music}
                />
              </View>

              <View className="mt-7">
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  color={"#a78bfa"}
                  containerStyle={{
                    borderRadius: "5px",
                  }}
                />
              </View>
            </View>
          )}
        </Formik>

        <View className="mt-3 my-5 flex justify-center items-center flex-row">
          <Text className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            New on our platform?
          </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text className="block mb-2 mx-2 text-base font-medium text-[#7c3aed] dark:text-white">
              Create an account
            </Text>
          </Pressable>
        </View>
        <View style={styles.barrier}></View>
        <Connect />
      </View>
    </View>
  );
}

export default LogIn;

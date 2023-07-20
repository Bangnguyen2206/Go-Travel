import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BgImage } from "../assets";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import { CheckBox } from "react-native-elements";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { Formik } from "formik";
import Connect from "../components/ListIcon/Connect";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { create } from "apisauce";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
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

function HomeScreen() {
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
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={BgImage}
          className="w-full h-[180px] object-cover"
        />
      </View>
      <View className="mx-5 mt-10">
        <Text className="text-lg">Adventure starts here</Text>
        <Text className="text-base font-light">
          Make your app management easy and fun
        </Text>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            email: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Firstname is not empty"),
            lastName: Yup.string().required("Lastname is not empty"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is not empty"),
          })}
          onSubmit={async (values) => {
            api
              .post("/auth/signup", values, {
                headers: { "x-gigawatts": "1.21" },
              })
              .then((res) => {
                showToast("Create account successfully!");
                setTimeout(() => {
                  navigation.navigate("LogIn");
                }, 3000);
              });
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
            <View className="my-2">
              <Text className="block text-lg font-medium text-gray-500 dark:text-white">
                First name <Text className="text-red-600">*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="Enter your first name..."
              />
              {touched.firstName && errors.firstName && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10" }}
                  className="mb-2"
                >
                  {errors.firstName}
                </Text>
              )}
              <Text className="block text-lg font-medium text-gray-500 dark:text-white">
                Last name <Text className="text-red-600">*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Enter your last name..."
              />
              {touched.lastName && errors.lastName && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10" }}
                  className="mb-2"
                >
                  {errors.lastName}
                </Text>
              )}
              <Text className="block text-lg font-medium text-gray-500 dark:text-white">
                Email <Text className="text-red-600">*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Enter your email..."
              />
              {touched.email && errors.email && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10" }}
                  className="mb-2"
                >
                  {errors.email}
                </Text>
              )}
              <Text className="block text-lg font-medium text-gray-500 dark:text-white">
                Password <Text className="text-red-600">*</Text>
              </Text>
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
              <View className="mt-7">
                <Button onPress={handleSubmit} title="Sign Up" color="purple" />
              </View>
            </View>
          )}
        </Formik>

        <View className="mt-3 my-5 flex justify-center items-center flex-row">
          <Text className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Already have an account?
          </Text>
          <Text className="block mb-2 mx-2 text-lg font-medium text-purple-900 dark:text-white">
            Sign in instead
          </Text>
        </View>
        <View style={styles.barrier}></View>
        <Connect />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

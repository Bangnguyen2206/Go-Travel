import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogInImage } from "../assets";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import { CheckBox } from "react-native-elements";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { Formik } from "formik";
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
import { SparklesIcon } from "react-native-heroicons/solid";

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
  return (
    <View className="relative w-full h-full">
      <View>
        <Image
          animation="fadeIn"
          easing="ease-in-out"
          source={LogInImage}
          className="w-full h-[400px]"
        ></Image>
        <SparklesIcon
          className="absolute top-0 left-0"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View className="mx-5 mt-10">
        <Text className="text-lg">Adventure starts here</Text>
        <Text className="text-base font-light">Log IN</Text>

        <Formik
          initialValues={{
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
            <View className="my-2">
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
      </View>
    </View>
  );
}

export default LogIn;

import React from "react";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { create } from "apisauce";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import CustomInput from "../components/CustomInput/CustomInput";
import Connect from "../components/ListIcon/Connect";
import apiInstance from "../helpers/httpClient";
import { BgImage } from "../assets";
import { registerAccount } from "../reducers/userSlice";
import { getDataFromStorage } from "../utils/utils";
import CheckBox from "../components/Checkbox/Checkbox";

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [regulation, setRegulation] = useState(false);
  const { user, isLoading } = useSelector((state) => state.userSlice);
  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const getData = async () => {
      const data = await getDataFromStorage("user");
    };
    getData();
  }, []);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: "Sign Up",
      text2: message,
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={BgImage}
          className="w-full h-[110px] object-cover"
        />
      </View>
      <View className="mx-5 mt-5">
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
              .email("The email is not valid")
              .required("The email is required"),
            password: Yup.string()
              .required("The password is required")
              .matches(/\w*[a-z]\w*/, "Password is weak")
              .matches(/\w*[A-Z]\w*/, "Password is fair")
              .matches(/\d/, "Password is good")
              .matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, "Password is strong"),
          })}
          onSubmit={async (values, { resetForm }) => {
            if (regulation) {
              dispatch(registerAccount(values));
              resetForm();
              setRegulation(false);
              showToast("Successful account registration!");
              setTimeout(() => {
                navigation.navigate("LogIn");
              }, 3000);
            } else {
            }
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
              {/* First name */}
              <CustomInput
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.firstName}
                errors={errors.firstName}
                title={"First name"}
                id="firstName"
                touched={touched.firstName}
                required={true}
                placeholder="Enter your first name..."
              />
              {/* Last name */}
              <CustomInput
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.lastName}
                errors={errors.lastName}
                title={"Last name"}
                touched={touched.lastName}
                required={true}
                id="lastName"
                placeholder="Enter your last name..."
              />
              {/* Email */}
              <CustomInput
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                errors={errors.email}
                title={"Email"}
                id="email"
                touched={touched.email}
                required={true}
                placeholder="Enter your email..."
              />
              {/* Password */}
              <CustomInput
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.password}
                errors={errors.password}
                title={"Password"}
                id="password"
                touched={touched.password}
                required={true}
                placeholder="Enter your password..."
                type="password"
              />
              <View className="my-1">
                <CheckBox
                  onPress={() => setRegulation(!regulation)}
                  title="I agree to privacy policy & terms"
                  isChecked={regulation}
                />
              </View>
              {/* Sign up button */}
              <View className="mt-7">
                <Button
                  onPress={handleSubmit}
                  color={"#a78bfa"}
                  containerStyle={{
                    borderRadius: "5px",
                  }}
                  disabled={
                    errors.email ||
                    errors.firstName ||
                    errors.lastName ||
                    errors.password ||
                    !regulation
                  }
                >
                  {isLoading && (
                    <ActivityIndicator
                      size="small"
                      color="#0000ff"
                      className="mx-3"
                    />
                  )}
                  {"Sign up"}
                </Button>
              </View>
            </View>
          )}
        </Formik>

        {/* Redirect to login page */}
        <View className="mt-2 my-2 flex justify-center items-center flex-row">
          <Text className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text className="block mb-2 mx-2 text-base font-medium text-[#a78bfa] dark:text-white">
              Sign in instead
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.barrier}></View>
        <Connect />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

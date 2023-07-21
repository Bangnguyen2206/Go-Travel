import React from "react";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { Formik } from "formik";
import { create } from "apisauce";
import Toast from "react-native-toast-message";
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
import { useDispatch, useSelector } from "react-redux";

import Connect from "../components/ListIcon/Connect";
import CheckBox from "../components/Checkbox/Checkbox";
import { BgImage } from "../assets";
import CustomInput from "../components/CustomInput/CustomInput";
import { loginAccount } from "../reducers/userSlice";

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
  const navigation = useNavigation();
  const [remember, setRemember] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userSlice);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: "Sign In",
      text2: message,
    });
  };
  const [initialState, setInitialState] = useState({
    password: "",
    email: "",
  });

  return (
    <View>
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
            password: Yup.string().required("The password is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            dispatch(loginAccount(values));
            resetForm();
            showToast("Logged in successfully!");
            setTimeout(() => {
              navigation.navigate("Categories");
            }, 3000);
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
                checkPassword={true}
              />
              <View className="my-2">
                <CheckBox
                  onPress={() => setRemember(!remember)}
                  title="Remember me"
                  isChecked={remember}
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

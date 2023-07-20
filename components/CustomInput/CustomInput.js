import React, { useState } from "react";
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
});

const CustomInput = ({
  title,
  errors,
  touched,
  handleChange,
  handleBlur,
  value,
  required,
  placeholder,
  id,
  type = "text",
  checkPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [iconName, setIconName] = useState("eye-off");
  const handleChangeStatus = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setIconName("eye");
    } else {
      setIconName("eye-off");
    }
  };
  return (
    <View>
      <View className="flex-1 justify-between items-center flex-row">
        <Text className="block text-base font-medium text-gray-500 dark:text-white">
          {title} {required && <Text className="text-red-600">*</Text>}
        </Text>
        {checkPassword && (
          <Text className="text-base font-medium text-[#7c3aed]">
            Forget password?
          </Text>
        )}
      </View>

      <View className="relative">
        <TextInput
          style={styles.input}
          onChangeText={handleChange(id)}
          onBlur={handleBlur(id)}
          value={value}
          placeholder={placeholder}
          secureTextEntry={type === "password" && showPassword}
        />
        <View className="absolute top-4 right-4">
          {type === "password" && (
            <Pressable onPress={() => handleChangeStatus()}>
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color="#a78bfa"
              />
            </Pressable>
          )}
        </View>
      </View>

      {touched && errors && (
        <Text style={{ fontSize: 12, color: "#FF0D10" }} className="mb-2">
          {errors}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

import React, { useEffect } from "react";
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

import { getCategories } from "../reducers/categoriesSlice";
import { getDataFromStorage } from "../utils/utils";

export default function Categories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    const getData = async () => {
      const data = await getDataFromStorage("accessToken");
      console.log(data);
    };
    getData();
  }, [dispatch]);

  return <Text>Categories</Text>;
}

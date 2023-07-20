import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../reducers/categoriesSlice";
import { getDataFromStorage } from "../utils/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector(
    (state) => state.categoriesSlice
  );
  useEffect(() => {
    const getData = async () => {
      const data = await getDataFromStorage("accessToken");
      dispatch(getCategories(data));
    };
    getData();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View
            style={{ flex: 1, flexDirection: "column", margin: 1 }}
            className="flex-1 justify-center items-center bg-black w-full h-[100px] rounded "
          >
            <Text className="text-white font-base">{item.name}</Text>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

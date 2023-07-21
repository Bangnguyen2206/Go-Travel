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
  Button,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getCategories } from "../reducers/categoriesSlice";
import { getDataFromStorage } from "../utils/utils";
import { fakeData } from "../fakeData/data";
import { BgCategories } from "../assets";
import { setDataToStorage } from "../utils/utils";
import Spinner from "../components/Spinner/Spinner";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default function Categories() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selections, setSelections] = useState([]);
  const { categories, isLoading } = useSelector(
    (state) => state.categoriesSlice
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const getData = async () => {
      const data = await getDataFromStorage("accessToken");
      dispatch(getCategories(data));
    };
    getData();
  }, [dispatch]);

  const addMultipleSelections = (item) => {
    const data = [...selections];
    const isExistingItem = data.find((data) => data.id === item.id);
    if (!isExistingItem) {
      setSelections([...selections, item]);
    } else {
      const result = data.filter((item) => item.id !== isExistingItem.id);
      setSelections(result);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View classname="relative">
        <TouchableOpacity
          className="text-white font-base absolute z-50 bottom-35 left-5 mt-10"
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name={"chevron-left"}
            size={35}
            color="white"
          />
        </TouchableOpacity>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={BgCategories}
          className="w-full h-[230px] -z-10"
        />
        <TouchableOpacity className="text-white font-base absolute z-50 bottom-35 right-5 mt-10">
          <Button
            title="Done"
            onPress={() =>
              setDataToStorage("selections", JSON.stringify(selections))
            }
            color={"white"}
            containerStyle={{
              borderRadius: "5px",
              backgroundColor: "transparent",
            }}
            disabled={selections.length > 0 ? false : true}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => {
          const data = selections.find((data) => data.id === item.id);
          return (
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "column", margin: 1 }}
              className={`flex-1 justify-center items-center ${
                selections.find((data) => data.id === item.id)?.id === item.id
                  ? "bg-[#a78bfa]"
                  : "bg-black"
              } w-full h-[100px] rounded`}
              onPress={() => addMultipleSelections(item)}
            >
              <Text className="text-white font-base">{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

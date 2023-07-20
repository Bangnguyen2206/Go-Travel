import AsyncStorage from "@react-native-async-storage/async-storage";

export const setDataToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const getDataFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

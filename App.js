import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Register from "./screens/Register";
import LogIn from "./screens/Login";
import Categories from "./screens/Categories";
import userSliceReducer from "./reducers/userSlice";
import categoriesSliceReducer from "./reducers/categoriesSlice";

const store = configureStore({
  reducer: {
    userSlice: userSliceReducer,
    categoriesSlice: categoriesSliceReducer,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Categories} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Categories" component={Categories} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </TailwindProvider>
    </Provider>
  );
}

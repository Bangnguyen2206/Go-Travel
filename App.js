import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Register from "./screens/Register";
import LogIn from "./screens/Login";
import userSliceReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: { userSlice: userSliceReducer },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="LogIn" component={LogIn} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </TailwindProvider>
    </Provider>
  );
}

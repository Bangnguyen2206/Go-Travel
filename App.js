import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import LogIn from "./screens/Login";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </TailwindProvider>
  );
}

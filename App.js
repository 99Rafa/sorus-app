import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import ReviewScreen from "src/components/feedback/feedback";
import Login from "src/components/login/LoginScreen";
import StartUpScreen from "src/components/login/StartUpScreen";
import MenuStack from "src/components/mainMenu/MenuStack"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="StartUp" component={StartUpScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={MenuStack} />
        <Stack.Screen name="Review" component={ReviewScreen} />

      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

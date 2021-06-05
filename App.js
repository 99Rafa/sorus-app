import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import ReviewScreen from "src/components/feedback/feedback";
import Login from "src/components/login/LoginScreen";
import StartUpScreen from "src/components/login/StartUpScreen";
import UpdateOffer from "src/components/product/updateOffer";
import MenuStack from "src/components/mainMenu/MenuStack"
import RegisterProduct from "src/components/registerProduct/registerProduct";
import Profile from "src/components/profile/profle";
import ProductView from "src/components/productView/ProductView";
import Register from "src/components/registerUser/registerUser";
import Forget from "src/components/forgetPassword/forgetPassword";

const Stack = createStackNavigator()

export default function App() {

  const [loaded] = useFonts({
    Poppins: require('src/assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('src/assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="StartUp" component={StartUpScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Menu" component={MenuStack} />
        <Stack.Screen name="ProductView" component={ProductView} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="RegisterProduct" component={RegisterProduct} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateOffer" component={UpdateOffer} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

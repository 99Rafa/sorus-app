import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button } from 'react-native'
import RegisterProduct from "src/components/registerProduct/registerProduct";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Subir Oferta" component={RegisterProduct} />
        
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button } from 'react-native'

const Stack = createStackNavigator()

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Saludar"
        onPress={() => console.log('hola')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Este es un ejemplo */}
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import React, { useEffect } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default StartUpScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getAuthToken();
  }, []);

  getAuthToken = async () => {
    try { 
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken !== null) {
        navigation.navigate("Review");
      } else {
        navigation.navigate("Login");
      }
    } catch(e) {
      alert(`AsyncStorage error: ${e}`);
      navigation.navigate("Login");
    }
  }

    return (
      <View style={{ backgroundColor: "#272640", flex: 1 }}></View>
    )
}

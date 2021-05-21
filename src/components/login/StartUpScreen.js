import React, { useEffect } from 'react'
import { View } from 'react-native'
import service from 'src/libs/service/service'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartUpScreen({ navigation }) {

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    authenticateUser();
  }, []);

  authenticateUser = async () => {
    await service.get('users/is_authenticated/')
      .then(_ => {
        navigation.navigate('Menu')
      })
      .catch(async err => {
        await AsyncStorage.clear()
        navigation.navigate('Login')
        console.log(err)
      })
  }

  return (
    <View style={{ backgroundColor: "#272640", flex: 1 }}></View>
  )
}

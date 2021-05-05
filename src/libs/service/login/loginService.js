import AsyncStorage from '@react-native-async-storage/async-storage';
import getNotificationToken from "src/libs/notificationToken/notificationToken";
import baseUrl from "src/libs/service/login/baseUrl";

export const authLogin = async (data) => {
  return await fetch(`${baseUrl}users/login/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error()
    }
    return response.json()
  })
  .catch(_ => {
    return 'Error'
  })
}

export const authLogout = async () => {
  const token = await AsyncStorage.getItem('authToken')
  return await fetch(`${baseUrl}users/logout/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error()
    }
    await AsyncStorage.clear()
    return true
  })
  .catch(err => {
    return false
  })
}
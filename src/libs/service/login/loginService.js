import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";
import fetchWithTimeout from "src/libs/service/utils/fetchWithTimeout";

export const authLogin = async (data) => {
  return await fetchWithTimeout(`${baseUrl}users/login/`, {
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
  return await fetchWithTimeout(`${baseUrl}users/logout/`, {
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
      try {
        await AsyncStorage.clear()
      } catch (e) {
        throw new Error()
      }
      return true
    })
    .catch(_ => {
      return false
    })
}
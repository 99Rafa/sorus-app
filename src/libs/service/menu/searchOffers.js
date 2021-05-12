import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";
import fetchWithTimeout from "src/libs/service/utils/fetchWithTimeout";

export const getQueryItems = async (data) => {
  const token = await AsyncStorage.getItem('authToken')
  return await fetchWithTimeout(`${baseUrl}offers/product/query/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  }).
    then(response => {
      if (!response.ok) {
        throw new Error()
      }
      return response.json()
    })
    .catch(() => {
      return 'Error'
    })
}

export const getQueryPage = async (data, page) => {
  const token = await AsyncStorage.getItem('authToken')
  return await fetchWithTimeout(`${baseUrl}offers/product/query/?page=${page}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  }).
    then(response => {
      if (!response.ok) {
        throw new Error()
      }
      return response.json()
    })
    .catch(() => {
      return 'Error'
    })
}
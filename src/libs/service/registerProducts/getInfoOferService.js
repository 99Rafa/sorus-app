import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";
import fetchWithTimeout from "src/libs/service/utils/fetchWithTimeout";

export const getInfoOfer = async () => {
  const token = await AsyncStorage.getItem('authToken')
  return await fetchWithTimeout(`${baseUrl}offers/product/user_list/`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
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
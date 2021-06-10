import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";
import fetchWithTimeout from "src/libs/service/utils/fetchWithTimeout";

export const updateProduct = async (data) => {
  const token = await AsyncStorage.getItem('authToken')
  return await fetchWithTimeout(`${baseUrl}offers/product/update/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
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
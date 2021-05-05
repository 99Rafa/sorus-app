import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";
import fetchWithTimeout from "src/libs/service/utils/fetchWithTimeout";

export const register = async (data) => {
    const token = await AsyncStorage.getItem('authToken')
    return await fetchWithTimeout(`${baseUrl}offers/product/register/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error()
        }
        return response.json()
      })
      .catch(_ => {
        return 'Error'
      })
  }
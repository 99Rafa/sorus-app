import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";

class service {
  static instance = new service()

  makeRequest = ({ url, body, timeout = 500 }) => {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject(new Error("Request timed out"))
      }, timeout);

      fetch(`${baseUrl}${url}`, body).then(
        response => resolve(response.json()),
        err => reject(err)
      )
        .finally(() => clearTimeout(timer));
    })
  }

  addHeaders = async ({ body, ...args }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      body.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
      return await this.makeRequest({ body, ...args })
    } catch (error) {
      return new Promise((_, reject) => reject({ detail: error }))
    }
  }

  get = async (url, ...args) => {
    body = {
      method: 'GET',
      body: JSON.stringify(data)
    }
    return await this.addHeaders({ url, body, ...args })
  }

  post = async (url, data, ...args) => {
    body = {
      method: 'POST',
      body: JSON.stringify(data)
    }
    return await this.addHeaders({ url, body, ...args })
  }

  patch = async (url, data, ...args) => {
    body = {
      method: 'PATCH',
      body: JSON.stringify(data)
    }
    return await this.addHeaders({ url, body, ...args })
  }
}

export default service.instance
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
  baseURL: `http://172.20.10.2:8000`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(token, 'token');

    return config;
  },

  (error) => Promise.reject(error)
);

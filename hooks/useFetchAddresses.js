import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../utils/axios';
import { useQuery } from 'react-query';
import { Alert } from 'react-native';

const useFetchAddresses = () => {
  const fetchAddresses = async () => {
    // const userId = await AsyncStorage.getItem('user_id');
    // console.log(userId, 'user_id');
    return await axiosInstance.get(`/all-addresses`);
  };

  const { data } = useQuery('fetched-addresses', fetchAddresses, {
    onSuccess: (res) => {
      console.log(res?.data?.addresses);
    },

    onError: (error) => {
      console.log(error, 'fetching addresses error');
      Alert.alert('Error', error?.response?.data?.message || 'Unable to Fetch Addresses');
    },
  });

  return { data };
};

export default useFetchAddresses;

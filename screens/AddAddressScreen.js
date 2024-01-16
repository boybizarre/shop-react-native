import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useMutation, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { axiosInstance } from '../utils/axios';
import { Alert } from 'react-native';

// component
import Input from '../components/Input';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const initialFormData = {
    name: '',
    mobileNo: '',
    houseNo: '',
    street: '',
    landmark: '',
    country: '',
    postalCode: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  console.log(formData, 'formData');

  const mutation = useMutation({
    mutationFn: async (address) => {
      return await axiosInstance.post('/address', { address });
    },

    onSuccess: async (response) => {
      Alert.alert('Success', response.data.message);
      setFormData(initialFormData);
      await queryClient.invalidateQueries('fetched-addresses');
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    },

    onError: (error) => {
      Alert.alert(
        'Error',
        error.response.data.message || 'An error occurred adding address!'
      );

      // console.log(error.response.data.message);
    },
  });

  const handleAddAddress = () => {
    mutation.mutate(formData);
  };

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== '' &&
      formData.mobileNo &&
      formData.mobileNo.trim() !== '' &&
      formData.houseNo &&
      formData.houseNo.trim() !== '' &&
      formData.street &&
      formData.street.trim() !== '' &&
      formData.landmark &&
      formData.landmark.trim() !== '' &&
      formData.country &&
      formData.country.trim() !== '' &&
      formData.postalCode &&
      formData.postalCode.trim() !== ''
      ? true
      : false;
  }

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: '#00CED1' }} />
      <View style={{ padding: 10 }}>
        <Input
          label='Full Name ( First and last name )'
          placeholder='Enter your name'
          value={formData['name']}
          onChange={(text) =>
            setFormData({
              ...formData,
              name: text,
            })
          }
        />
        <Input
          label='Mobile Number'
          placeholder='Mobile No'
          value={formData['mobileNo']}
          onChange={(text) =>
            setFormData({
              ...formData,
              mobileNo: text,
            })
          }
        />
        <Input
          label='Flat, House No, Building, Company'
          placeholder=''
          value={formData['houseNo']}
          onChange={(text) =>
            setFormData({
              ...formData,
              houseNo: text,
            })
          }
        />
        <Input
          label='Area, Street, Sector, Village'
          placeholder=''
          value={formData['street']}
          onChange={(text) =>
            setFormData({
              ...formData,
              street: text,
            })
          }
        />
        <Input
          label='Landmark'
          placeholder='Eg near Chicken Republic'
          value={formData['landmark']}
          onChange={(text) =>
            setFormData({
              ...formData,
              landmark: text,
            })
          }
        />

        <Input
          label='Country'
          placeholder='Nigeria'
          value={formData['country']}
          onChange={(text) =>
            setFormData({
              ...formData,
              country: text,
            })
          }
        />

        <Input
          label='Postal Code'
          placeholder='Enter postal code'
          value={formData['postalCode']}
          onChange={(text) =>
            setFormData({
              ...formData,
              postalCode: text,
            })
          }
        />

        <TouchableOpacity
          disabled={!isFormValid()}
          onPress={handleAddAddress}
          style={{
            backgroundColor: '#FFC72C',
            padding: 19,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold ' }}> Add Address </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});

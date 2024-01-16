import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import { useQuery } from 'react-query';
import { axiosInstance } from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// components
import Search from '../components/Search';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
  const navigation = useNavigation();

  const fetchAddresses = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    console.log(userId, 'user_id');
    return await axiosInstance.get(`/addresses/${userId}`);
  };

  const { data } = useQuery('fetched-addresses', fetchAddresses, {
    onSuccess: (res) => {
      console.log(res?.data?.addresses);
    },

    onError: (_error) => {
      Alert.alert('Error', 'Unable to Fetch Addresses');
    },
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchAddresses();
  //   }, [])
  // );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Search />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Address</Text>

          <Pressable
            onPress={() => navigation.navigate('Address')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Add a new Address</Text>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Pressable>
          <Pressable>
            {/* all the added addresses */}
            {data?.data?.addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'column',
                  gap: 5,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                >
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {item?.name}
                  </Text>
                  <Entypo name='location-pin' size={24} color='red' />
                </View>

                <Text style={{ fontSize: 15, color: '#181818' }}>
                  {item?.houseNo}, {item?.landmark}
                </Text>

                <Text style={{ fontSize: 15, color: '#181818' }}>
                  {item?.street}
                </Text>

                <Text style={{ fontSize: 15, color: '#181818' }}>
                  {item?.country}
                </Text>

                <Text style={{ fontSize: 15, color: '#181818' }}>
                  Phone No : {item?.mobileNo}
                </Text>
                <Text style={{ fontSize: 15, color: '#181818' }}>
                  Pin code : {item?.postalCode}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}
                  >
                    <Text>Remove</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}
                  >
                    <Text>Set as Default</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});

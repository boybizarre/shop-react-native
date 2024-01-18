import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { axiosInstance } from '../utils/axios';
import { useQuery } from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
        height: 100,
      },

      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name='notifications-outline' size={24} color='black' />

          <AntDesign name='search1' size={24} color='black' />
        </View>
      ),
    });
  }, []);

  const fetchUser = async () => {
    return await axiosInstance.get('/profile');
  };

  const fetchOrders = async () => {
    return await axiosInstance.get('/all-orders');
  };

  // data fetching ( user )
  const { data: fetchedUser } = useQuery('fetch-user', fetchUser);
  const { data: fetchedOrders, isLoading } = useQuery(
    'fetch-order',
    fetchOrders
  );

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('auth_token');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome {fetchedUser?.data?.user?.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={'#F4F4F4'} />
        ) : fetchedOrders?.data?.orders.length > 0 ? (
          fetchedOrders?.data?.orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

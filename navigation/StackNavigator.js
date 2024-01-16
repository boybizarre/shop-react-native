import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen.js';
import CartScreen from '../screens/CartScreen.js';
import ProductInfoScreen from '../screens/ProductInfoScreen.js';
import AddAddressScreen from '../screens/AddressScreen.js';
import AddressScreen from '../screens/AddAddressScreen.js';
import ConfirmationScreen from '../screens/ConfirmationScreen.js';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name='home' size={24} color='#008E97' />
              ) : (
                <AntDesign name='home' size={24} color='black' />
              ),
          }}
        />

        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color='#008E97' />
              ) : (
                <Ionicons name='person-outline' size={24} color='black' />
              ),
          }}
        />

        <Tab.Screen
          name='Cart'
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name='shoppingcart' size={24} color='#008E97' />
              ) : (
                <AntDesign name='shoppingcart' size={24} color='black' />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Info'
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Address'
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Add Address'
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Confirmation'
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

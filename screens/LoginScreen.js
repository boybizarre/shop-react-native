import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

// icons
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../utils/axios';
import { Alert } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post('/login', data);
    },

    onSuccess: async (res) => {
      console.log('Successful Login Response: ', res.data.token);

      await AsyncStorage.setItem('auth_token', res.data.token);
      navigation.replace('Main');

      setEmail('');
      setPassword('');
    },

    onError: (error) => {
      console.log(error.response.data.message, 'error message');
      Alert.alert(
        'Login Error!',
        error.response.data.message || 'An error occurred during signing in!'
      );
    },
  });

  const handleLogin = () => {
    const user = {
      email,
      password,
    };

    mutation.mutate(user);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');

        if (token) {
          navigation.navigate('Main');
        }
      } catch (error) {
        console.log('Error message', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.imageStyle}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}> Log In to your Account </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputStyle}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name='email'
              size={24}
              color='gray'
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ ...styles.textInputStyle, fontSize: email ? 16 : 16 }}
              placeholder='Enter your email'
            />
          </View>
        </View>

        <View style={{ marginTop: 5 }}>
          <View style={styles.inputStyle}>
            <AntDesign
              style={{ marginLeft: 8 }}
              name='lock1'
              size={24}
              color='gray'
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{ ...styles.textInputStyle, fontSize: password ? 16 : 16 }}
              placeholder='Enter your password'
            />
          </View>
        </View>

        <View style={styles.loggedIn}>
          <Text> Keep me logged in </Text>
          <Text style={{ color: '#007FFF', fontWeight: 500 }}>
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 70 }} />
        <TouchableOpacity onPress={handleLogin} style={styles.pressable}>
          <Text style={styles.button}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 15 }}
        >
          <Text style={{ ...styles.button, color: 'gray' }}>
            {' '}
            Don't have an Account? Sign Up{' '}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  imageStyle: {
    width: 150,
    height: 100,
  },

  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42',
  },

  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },

  textInputStyle: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },

  loggedIn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pressable: {
    width: 200,
    backgroundColor: '#FEBE10',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },

  button: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

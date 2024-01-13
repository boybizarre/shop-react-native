import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Alert } from 'react-native';
import { axiosInstance } from '../utils/axios';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

const RegisterScreen = () => {
  const navigate = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post('/register', data);
    },

    onSuccess: (response) => {
      console.log('Successful Registration Response: ', response);
      Alert.alert('Registration Completed', response.data.message);
      setName('');
      setEmail('');
      setPassword('');
    },

    onError: (error) => {
      Alert.alert(
        'Registration Error!',
        error.response.data.message || 'An error occurred during registration!'
      );
    },
  });

  const handleRegister = () => {
    const user = {
      name,
      email,
      password,
    };

    mutation.mutate(user);
  };

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
          <Text style={styles.text}> Register an Account </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputStyle}>
            <Ionicons
              style={{ marginLeft: 8 }}
              name='ios-person'
              size={24}
              color='gray'
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                ...styles.textInputStyle,
                fontSize: name ? 16 : 16,
              }}
              placeholder='Enter your name'
            />
          </View>
        </View>

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

        <View style={styles.loggedIn}>
          <Text> Keep me logged in </Text>
          <Text style={{ color: '#007FFF', fontWeight: 500 }}>
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 70 }} />

        <TouchableOpacity style={styles.pressable} onPress={handleRegister}>
          <Text style={styles.button}> Register </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate.navigate('Login')}
          style={{ marginTop: 15 }}
        >
          <Text style={{ ...styles.button, color: 'gray' }}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 35,
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

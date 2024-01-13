import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const Input = ({ label, placeholder, value, onChange }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        autoCapitalize='none' // 'characters' 'sentences' 'none' ''words'
        autoCorrect={false}
        style={{
          padding: 10,
          borderColor: '#D0D0D0',
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 5,
        }}
        placeholder={placeholder}
        placeholderTextColor={'black'}
      />
    </View>
  );
};

export default Input;

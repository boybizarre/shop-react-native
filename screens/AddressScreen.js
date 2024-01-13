import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from 'react-native';

// icons
import { MaterialIcons } from '@expo/vector-icons';

// components
import Search from '../components/Search';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {

  const navigation = useNavigation()
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});

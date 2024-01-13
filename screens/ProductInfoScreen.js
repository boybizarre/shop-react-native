import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

// components
import Search from '../components/Search';

const ProductInfoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;

  // state
  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart, 'cart product info');
  // console.log(route?.params?.item, 'product')

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <Search />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((image, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: 'contain' }}
            source={{ uri: image }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#C60C30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 12,
                  }}
                >
                  {' '}
                  20% Off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <MaterialCommunityIcons
                  name='share-variant'
                  size={24}
                  color='black'
                />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name='hearto' size={24} color='black' />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          {route?.params?.title}
        </Text>
        <Text style={{ fontSize: 18, fontWWeight: '600', marginTop: 6 }}>
          ₦ {route?.params?.price}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route?.params?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>
          Total : ₦ {route.params.price}
        </Text>
        <Text style={{ color: '#00CED1' }}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Ionicons name='location' size={24} color='black' />

          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Deliver To Olakunle - Lagos Nigeria
          </Text>
        </View>
      </View>

      <Text style={{ color: 'green', marginHorizontal: 10, fontWeight: '500' }}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#FFAC1C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

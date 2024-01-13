import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  // state
  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (product) => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  return (
    <Pressable style={styles.pressable}>
      <Image style={styles.image} source={{ uri: product?.image }} />

      <Text numberOfLines={1} style={styles.title}>
        {product?.title}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>₦{product?.price}</Text>
        <Text style={styles.price}>{product?.rating?.rate} ratings</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(product)}
        style={styles.addToCart}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 20,
    marginVertical: 25,
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  title: {
    width: 150,
    marginTop: 10,
  },

  priceContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  rating: {
    color: '#FFC72C',
  },

  addToCart: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
});

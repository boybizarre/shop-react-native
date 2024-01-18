import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { checkoutSteps } from '../data/productData';
import { Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/CartReducer';
import useFetchAddresses from '../hooks/useFetchAddresses';

// icons
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { axiosInstance } from '../utils/axios';
import { useNavigation } from '@react-navigation/native';

const ConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((currentVal, prevVal) => currentVal + prevVal, 0);

  console.log(total);

  const { data } = useFetchAddresses();
  console.log(data?.data?.addresses, 'addresses-confirmation-screen');

  // select address
  function handleSelectedAddress(address) {
    if (address === selectedAddress) {
      setSelectedAddress(null);
      return;
    }

    setSelectedAddress(address);
  }

  const { mutate: placeOrder } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post('/create-order', data);
    },

    onSuccess: (res) => {
      navigation.navigate('Order');
      dispatch(clearCart());
      console.log(res?.data?.message, 'api response');
    },

    onError: (error) => {
      console.lgo(error.response.data.message, 'error-message')
      Alert.alert('Error', 'Unable to place order');
    }
  });

  const handlePlaceOrder = () => {

    const orderData = {
      cartItems: cart,
      totalPrice: total,
      shippingAddress: selectedAddress,
      paymentMethod: selectedOption,
    }

    placeOrder(orderData);
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 55 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}
          >
            {checkoutSteps.map((step, index) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: 'green' },
                      index <= currentStep && { backgroundColor: 'green' },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    index < currentStep && { backgroundColor: 'green' },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {' '}
                      &#10003;{' '}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: 'center', marginTop: 8 }}>
                  {step?.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {currentStep === 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {data?.data?.addresses?.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name='dot-circle' size={20} color='#008397' />
                ) : (
                  <Entypo
                    // onPress={() => setSelectedAdress(item)}
                    onPress={() => handleSelectedAddress(item)}
                    name='circle'
                    size={20}
                    color='gray'
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}
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
                    India, Bangalore
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    pin code : {item?.postalCode}
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

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: '#008397',
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Choose your delivery options
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome5 name='dot-circle' size={20} color='#008397' />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name='circle'
                size={20}
                color='gray'
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: 'green', fontWeight: '500' }}>
                Tomorrow by 10pm
              </Text>{' '}
              - FREE delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            disabled={!option}
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Select your payment Method
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === 'cash' ? (
              <FontAwesome5 name='dot-circle' size={20} color='#008397' />
            ) : (
              <Entypo
                onPress={() => setSelectedOption('cash')}
                name='circle'
                size={20}
                color='gray'
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === 'card' ? (
              <FontAwesome5 name='dot-circle' size={20} color='#008397' />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption('card');
                  Alert.alert('UPI / Debit card', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name='circle'
                size={20}
                color='gray'
              />
            )}

            <Text>UPI / Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: 'gray', marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
                Items
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>₦{total}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
                Delivery
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>₦0</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Order Total
              </Text>

              <Text
                style={{ color: '#C60C30', fontSize: 17, fontWeight: 'bold' }}
              >
                ₹{total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: 'gray' }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

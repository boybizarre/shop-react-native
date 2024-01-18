import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';

import { useQuery } from 'react-query';
import { SliderBox } from 'react-native-image-slider-box';
import { useNavigation } from '@react-navigation/native';
import { axiosInstance } from '../utils/axios';
import useFetchAddresses from '../hooks/useFetchAddresses';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { categories } from '../data/productData';
import { sliderImages } from '../data/productData';
import { trendingDeals } from '../data/productData';
import { todaysOffers } from '../data/productData';

// icons
import { MaterialIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';

// components
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../components/Search';

const HomeScreen = () => {
  const navigation = useNavigation();

  const fetchProducts = async () => {
    return await axiosInstance.get('https://fakestoreapi.com/products');
  };

  const fetchAddresses = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    console.log(userId, 'user_id');
    return await axiosInstance.get(`/all-addresses`);
  };

  // const { userId, setUserId } = useContext(UserType);

  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [selectedAddress, setSelectedAddress] = useState(null);

  console.log(selectedAddress);

  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  // data fetching ( address and products )
  const { data: fetchedProducts } = useQuery('fetch-products', fetchProducts);

  const { data: fetchedAddresses } = useFetchAddresses();

  console.log(fetchedAddresses, 'fetched-Addresses');
  // console.log(fetchedProducts, 'fetched-products');

  // select address
  function handleSelectedAddress(address) {
    if (address === selectedAddress) {
      setSelectedAddress(null);
      return;
    }

    setSelectedAddress(address);
  }

  console.log(fetchedAddresses?.data, 'addresses home screen');

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart, 'cart home screen');

  return (
    <>
      <SafeAreaView
        // forceInset={{ top: 'always' }}
        style={{
          paddingTop: Platform.OS === 'android' ? 40 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView>
          {/* search input */}

          <Search />

          {/* address */}
          <View style={styles.address}>
            <Ionicons name='location-outline' size={24} color='black' />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: '500' }}>
                  Add a Address
                </Text>
              )}
            </TouchableOpacity>
            <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />
          </View>

          {/* categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Pressable key={category.id} style={styles.categories}>
                <Image
                  style={styles.categoryImage}
                  source={{ uri: category.image }}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* slider box */}
          <SliderBox
            images={sliderImages}
            autoPlay
            circleLoop
            dotColor={'#13274F'}
            inactiveDotColor={'#90A4AE'}
            ImageComponentStyle={{ width: '100%' }}
          />

          {/* trending deals */}
          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {trendingDeals.map((item) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Info', {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  });
                }}
                style={styles.deals}
                key={item.id}
              >
                <Image source={{ uri: item?.image }} style={styles.dealImage} />
              </Pressable>
            ))}
          </View>

          {/* bottom border */}
          <Text
            style={{
              height: 1,
              borderColor: '#D0D0D0',
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          {/* today's deals */}
          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {todaysOffers.map((item) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Info', {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  });
                }}
                key={item.id}
                style={styles.offers}
              >
                <Image style={styles.offerImage} source={{ uri: item.image }} />
                <View style={styles.percentage}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}
                  >
                    Up to {item.offer} Off
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          {/* bottom border */}
          <Text
            style={{
              height: 1,
              borderColor: '#D0D0D0',
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          {/* dropdown picker */}
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: '#B7B7B7',
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder='Choose category'
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexInverse={1000}
              // onChangeValue={onChange}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {fetchedProducts?.data
              ?.filter((product) => product.category === category)
              .map((product, index) => (
                <ProductItem product={product} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: '100%', height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Choose your Location
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>
              Select a delivery location to see a product availability
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            {/* already added addresses */}
            {fetchedAddresses?.data?.addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => handleSelectedAddress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? '#FBCEB1' : 'white',
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                    {item?.name}
                  </Text>
                  <Entypo name='location-pin' size={24} color='red' />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: 'center' }}
                >
                  {item.country}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Add Address');
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: '#D0D0D0',
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066B2',
                  fontWeight: '500',
                }}
              >
                Add an Address or a pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: 'column', gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Entypo name='location-pin' size={22} color='#0066B2' />
              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Enter a Nigerian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Ionicons name='locate-sharp' size={22} color='#0066B2' />
              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Use my current location
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <AntDesign name='earth' size={22} color='#0066B2' />
              <Text style={{ color: '#0066B2', fontWeight: '400' }}>
                Deliver outside Nigeria
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    nothing: 'center',
  },

  searchInput: {
    flexDirection: 'row',
    // paddingVertical: 20,
    nothing: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 45,
    flex: 1,
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE',
  },

  categories: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  categoryName: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },

  deals: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dealImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },

  offers: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  offerImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  percentage: {
    backgroundColor: '#E31837',
    paddingVertical: 5,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
  },

  placeholderStyles: {},
});

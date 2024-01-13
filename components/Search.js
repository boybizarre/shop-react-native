import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';

const Search = () => {
  return (
    <View style={styles.inputView}>
      <Pressable style={styles.searchInput}>
        <AntDesign
          style={{ paddingLeft: 10 }}
          name='search1'
          size={24}
          color='black'
        />
        <TextInput
          placeholder='Search Amazon.in'
          autoCapitalize='none' // 'characters' 'sentences' 'none' ''words'
          autoCorrect={false}
        />
      </Pressable>

      <Feather name='mic' size={24} color='black' />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flexDirection: 'row',
    // paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 45,
    flex: 1,
  },
});

import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

type AutocompleteProps = {
  data: string[];
  onSuggestionClick: (suggestion: string) => void;
};

const SearchAutocomplete = ({ data, onSuggestionClick }: AutocompleteProps) => {
  return (
    <View style={styles.full}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSuggestionClick(item)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Ionicons name="search" size={24} />
              <Text style={{ padding: 10 }}>{item}</Text>
            </View>
            <Divider />
          </TouchableOpacity>
        )}
        estimatedItemSize={5}
      />
    </View>
  );
};

export default SearchAutocomplete;

const styles = StyleSheet.create({
  full: {
    height: '100%',
    width: '100%',
  },
});

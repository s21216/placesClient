import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import {
  SearchRequest,
  autocompleteBusinessSearch,
  searchForBusinesses,
} from '../../../api/search';
import BusinessList from '../../../components/searchTab/BusinessList';
import SearchAutocomplete from '../../../components/searchTab/SearchAutocomplete';
import { StartProps } from '../../../helpers/utils/types';

const SearchScreen = ({ navigation }: StartProps) => {
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const onChangeSearchBar = (query: string) => {
    setIsSearchBoxActive(true);
    setSearchQuery(query);
  };
  const onChangeLocation = (location: string) => setLocation(location);

  const onSuggestionClick = (suggestion: string) => {
    setIsSearchBoxActive(false);
    setSearchQuery(suggestion);
    console.log(suggestion);
    mutate({ searchQuery: suggestion, searchBody });
  };

  const onSubmitSearch = () => {
    setIsSearchBoxActive(false);
    mutate({ searchQuery, searchBody });
  };

  const [autocompleteValue] = useDebounce(searchQuery, 500);

  const { mutate, data, isLoading, isSuccess } = useMutation({
    mutationFn: searchForBusinesses,
  });

  const autocompleteQuery = useQuery({
    queryKey: ['autocomplete', autocompleteValue],
    queryFn: () => autocompleteBusinessSearch(autocompleteValue),
  });

  const searchBody: SearchRequest = {
    pageSize: 10,
    pageNumber: 0,
    filters: {
      longitude: 52.2297,
      latitude: 21.0122,
      distance: 5,
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Searchbar
          inputStyle={{ alignSelf: 'center' }}
          mode="bar"
          style={styles.searchbar}
          placeholder="Restaurants, categories"
          onChangeText={onChangeSearchBar}
          value={searchQuery}
          onSubmitEditing={() => onSubmitSearch()}
        />
        <Searchbar
          inputStyle={{ alignSelf: 'center' }}
          mode="bar"
          style={styles.searchbar}
          icon={() => <Ionicons name="location" color="#4285F4" size={20} />}
          placeholder="neighbourhood, city or postal code"
          onChangeText={onChangeLocation}
          value={location}
          // onSubmitEditing={() => mutate({ searchQuery, searchBody })}
        />
        {isLoading && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
        {isSearchBoxActive && autocompleteQuery.isSuccess && (
          <SearchAutocomplete
            data={autocompleteQuery.data.data}
            onSuggestionClick={(suggestion) => onSuggestionClick(suggestion)}
          />
        )}
        {isSuccess && !isSearchBoxActive && <BusinessList searchResults={data?.data} />}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  searchbar: {
    width: '95%',
    height: 45,
    padding: 0,
    marginBottom: 5,
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    margin: 5,
    // backgroundColor: 'rgb(242, 242, 242)',
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
});

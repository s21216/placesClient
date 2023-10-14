import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import {
  SearchRequest,
  autocompleteBusinessSearch,
  searchForBusinesses,
} from '../../../api/search';
import SearchAutocomplete from '../../../components/searchTab/SearchAutocomplete';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const searchBarRef = useRef<TextInput>(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteValue] = useDebounce(searchQuery, 500);

  const onChangeSearchBar = (query: string) => {
    setSearchQuery(query);
  };

  const autocompleteQuery = useQuery({
    queryKey: ['autocomplete', autocompleteValue],
    queryFn: () => autocompleteBusinessSearch(autocompleteValue),
  });

  const searchMutation = useMutation({
    mutationFn: searchForBusinesses,
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

  const onSuggestionClick = (suggestion: string) => {
    setIsSearchBarActive(false);
    setSearchQuery(suggestion);
    console.log(suggestion);
    searchMutation.mutate({ searchQuery: suggestion, searchBody });
  };

  const toggleSearchScreen = (isOn: boolean) => {
    if (isOn) {
      searchBarRef?.current?.focus();
    } else {
      searchBarRef?.current?.blur();
    }
    setIsSearchBarActive(isOn);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.mapview, isSearchBarActive && { display: 'none' }]}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      />
      <View
        style={[
          styles.searchbarContainer,
          { paddingTop: insets.top },
          isSearchBarActive && { height: '100%' },
        ]}>
        <Searchbar
          ref={searchBarRef}
          inputStyle={{ alignSelf: 'center' }}
          icon={() =>
            isSearchBarActive ? (
              <Ionicons name="arrow-back" size={24} />
            ) : (
              <Ionicons name="search" size={24} />
            )
          }
          onIconPress={() => toggleSearchScreen(!isSearchBarActive)}
          onPressIn={() => !isSearchBarActive && toggleSearchScreen(!isSearchBarActive)}
          placeholder="Search for restaurant, bar etc."
          value={searchQuery}
          onChangeText={onChangeSearchBar}
          onSubmitEditing={() => {}}
        />
        {isSearchBarActive && autocompleteQuery.isSuccess && (
          <SearchAutocomplete
            data={autocompleteQuery.data.data}
            onSuggestionClick={(suggestion) => onSuggestionClick(suggestion)}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapview: {
    flex: 1,
  },
  searchbarContainer: {
    position: 'absolute',
    width: '95%',
    alignSelf: 'center',
  },
});

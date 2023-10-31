import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import {
  SearchRequest,
  autocompleteBusinessSearch,
  searchForBusinesses,
} from '../../../api/search';
import BusinessList from '../../../components/searchTab/BusinessList';
import SearchAutocomplete from '../../../components/searchTab/SearchAutocomplete';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const searchBarRef = useRef<TextInput>(null);
  const mapRef = useRef<MapView>(null);
  const actionSheetRef = useRef<ActionSheetRef>(null);
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

  const searchBody = useMemo(() => {
    const searchBody: SearchRequest = {
      pageSize: 10,
      pageNumber: 0,
      filters: {
        longitude: 52.2297,
        latitude: 21.0122,
        distance: 5,
      },
    };

    return searchBody;
  }, []);

  const toggleSearchScreen = (isOn: boolean) => {
    if (isOn) {
      searchBarRef.current?.focus();
    } else {
      searchBarRef.current?.blur();
    }
    setIsSearchBarActive(isOn);
  };

  const onSearchSubmitClick = useCallback(async () => {
    await searchMutation.mutateAsync({ searchQuery, searchBody });
    setIsSearchBarActive(false);
    actionSheetRef.current?.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBody, searchMutation.mutateAsync, searchQuery]);

  const onSuggestionClick = useCallback(
    async (suggestion: string) => {
      setSearchQuery(suggestion);
      await searchMutation.mutateAsync({ searchQuery: suggestion, searchBody });
      setIsSearchBarActive(false);
      actionSheetRef.current?.show();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchBody, searchMutation.mutateAsync]
  );

  useEffect(() => {
    if (searchMutation.isSuccess) {
      const markers = searchMutation.data?.data.results?.map((business) =>
        business.firebaseUid === undefined ? '' : business.firebaseUid
      );
      mapRef.current?.fitToSuppliedMarkers(markers!, {
        edgePadding: { top: 150, bottom: 450, left: 50, right: 50 },
      });
    }
  }, [searchMutation.data?.data.results, searchMutation.isSuccess]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapRef}
        style={styles.mapview}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}>
        {searchMutation.isSuccess &&
          searchMutation.data?.data.results?.map((business) => (
            <Marker
              key={business.firebaseUid}
              coordinate={{
                latitude: business.location?.longitude!,
                longitude: business.location?.latitude!,
              }}
              identifier={business.firebaseUid}
              title={business.name}
              description={business.email}
            />
          ))}
      </MapView>
      <View
        style={[
          styles.searchbarContainer,
          { paddingTop: insets.top },
          isSearchBarActive && { height: '100%', backgroundColor: 'white' },
        ]}>
        <Searchbar
          style={{ width: '95%', alignSelf: 'center' }}
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
          onSubmitEditing={() => onSearchSubmitClick()}
          onClearIconPress={() => {
            actionSheetRef.current?.hide();
            searchMutation.reset();
          }}
        />
        {isSearchBarActive && autocompleteQuery.isSuccess && (
          <SearchAutocomplete
            data={autocompleteQuery.data.data}
            onSuggestionClick={(suggestion) => onSuggestionClick(suggestion)}
          />
        )}
      </View>
      <BusinessList
        hide={isSearchBarActive}
        businessListRef={actionSheetRef}
        searchResults={searchMutation.data?.data}
      />
    </View>
  );
};

export default SearchScreen;

const mapStyle = [
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapview: {
    flex: 1,
  },
  searchbarContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
});

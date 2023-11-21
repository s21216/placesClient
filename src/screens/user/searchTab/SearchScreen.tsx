import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { TextInput } from 'react-native-gesture-handler';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { autocompleteBusinessSearch, searchForBusinesses } from '../../../api/search';
import BusinessList from '../../../components/searchTab/BusinessList';
import SearchAutocomplete from '../../../components/searchTab/SearchAutocomplete';
import { SearchScreenProps } from '../../../helpers/utils/navigationTypes';

const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  const insets = useSafeAreaInsets();
  const searchBarRef = useRef<TextInput>(null);
  const mapRef = useRef<MapView>(null);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteValue] = useDebounce(searchQuery, 500);
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(true);
  const locationPickerRef = useRef<GooglePlacesAutocompleteRef>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [currentLocationOption, setCurrentLocationOption] = useState({
    description: 'Current location',
    geometry: { location: { lat: 0, lng: 0 } },
  });
  const [searchLocation, setSearchLocation] = useState({
    description: '',
    latitude: 52,
    longitude: 21,
  });

  // useEffect(() => {
  //   checkCurrentLocation();
  // }, []);

  const checkCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setCurrentLocationOption((prev) => ({
      description: prev.description,
      geometry: {
        location: { lat: location?.coords.latitude!, lng: location?.coords.longitude! },
      },
    }));
  };

  const onLocationSuggestionClick = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail) => {
      if (data.description === 'Current location') {
        await checkCurrentLocation();
        setSearchLocation(() => ({
          description: data.description,
          latitude: currentLocationOption.geometry.location.lat,
          longitude: currentLocationOption.geometry.location.lng,
        }));
      } else {
        setSearchLocation(() => ({
          description: data.description,
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        }));
        searchBarRef.current?.focus();
      }
    },
    [currentLocationOption.geometry.location.lat, currentLocationOption.geometry.location.lng]
  );

  const autocompleteQuery = useQuery({
    queryKey: ['autocomplete', autocompleteValue],
    queryFn: () => autocompleteBusinessSearch(autocompleteValue),
  });

  const searchMutation = useMutation({
    mutationFn: searchForBusinesses,
  });

  const toggleSearchScreen = (isOn: boolean) => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (isOn) {
      searchBarRef.current?.focus();
    } else {
      searchBarRef.current?.blur();
    }
    setIsSearchBarActive(isOn);
  };

  const onSearchSubmitClick = useCallback(
    async () => {
      await searchMutation.mutateAsync({
        searchQuery,
        searchBody: {
          pageSize: 10,
          pageNumber: 0,
          filters: {
            latitude: searchLocation.latitude,
            longitude: searchLocation.longitude,
            distance: 5,
          },
        },
      });
      setIsSearchBarActive(false);
      actionSheetRef.current?.show();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchMutation.mutateAsync, searchLocation.latitude, searchLocation.longitude]
  );

  const onSuggestionClick = useCallback(
    async (suggestion: string) => {
      setSearchQuery(suggestion);
      if (searchLocation.description === '') {
        locationPickerRef.current?.focus();
      } else {
        await searchMutation.mutateAsync({
          searchQuery: suggestion,
          searchBody: {
            pageSize: 10,
            pageNumber: 0,
            filters: {
              latitude: searchLocation.latitude,
              longitude: searchLocation.longitude,
              distance: 5,
            },
          },
        });
        Keyboard.dismiss();
        setIsSearchBarActive(false);
        actionSheetRef.current?.show();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchLocation.description,
      searchLocation.latitude,
      searchLocation.longitude,
      searchMutation.mutateAsync,
    ]
  );

  useEffect(() => {
    if (searchMutation.isSuccess) {
      const markers = searchMutation.data?.data.results?.map((business) => business.firebaseUid!);
      if (markers?.length! > 0)
        mapRef.current?.fitToSuppliedMarkers(markers!, {
          edgePadding:
            Platform.OS === 'ios'
              ? { top: 150, bottom: 450, left: 50, right: 50 }
              : { top: 500, bottom: 1000, left: 100, right: 100 },
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
        // showsUserLocation
        initialRegion={{
          latitude: location?.coords.latitude ? location.coords.latitude : 52.2297,
          longitude: location?.coords.longitude ? location.coords.longitude : 21.0122,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}>
        {searchMutation.isSuccess &&
          searchMutation.data?.data.results?.map((business) => (
            <Marker
              key={business.firebaseUid}
              coordinate={{
                latitude: business.location?.latitude!,
                longitude: business.location?.longitude!,
              }}
              identifier={business.firebaseUid}
              title={business.name}
              description={business.location?.address}
              onCalloutPress={() =>
                navigation.navigate('Details', { businessId: business.firebaseUid! })
              }
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
          value={searchQuery}
          ref={searchBarRef}
          style={styles.searchbar}
          inputStyle={{ alignSelf: 'center' }}
          icon={() =>
            isSearchBarActive ? (
              <Ionicons name="arrow-back" size={24} />
            ) : (
              <Ionicons name="search" size={24} />
            )
          }
          onChangeText={(query: string) => setSearchQuery(query)}
          onIconPress={() => toggleSearchScreen(!isSearchBarActive)}
          onPressIn={() => !isSearchBarActive && toggleSearchScreen(!isSearchBarActive)}
          onFocus={() => setIsAutocompleteVisible(true)}
          placeholder="Search for restaurant, bar etc."
          onSubmitEditing={onSearchSubmitClick}
          onClearIconPress={() => {
            actionSheetRef.current?.hide();
            searchMutation.reset();
          }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              position: 'absolute',
              width: '95%',
              alignSelf: 'center',
              height: '100%',
              display: isSearchBarActive ? 'block' : 'none',
              marginTop: 80,
              marginBottom: 30,
            },
            textInput: {
              backgroundColor: '#e8e6e6',
              alignSelf: 'center',
              borderRadius: 50,
              height: 55,
              color: 'black',
              marginTop: 5,
            },
            predefinedPlacesDescription: {
              color: '#1877F2',
            },
          }}
          enablePoweredByContainer={false}
          debounce={500}
          placeholder="Location"
          fetchDetails
          onPress={(data, details) => {
            onLocationSuggestionClick(data, details!);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_MAPS_KEY,
            language: 'en',
            type: 'geocode',
          }}
          // predefinedPlaces={[currentLocationOption]}
          predefinedPlacesAlwaysVisible
          textInputProps={{
            ref: locationPickerRef,
            returnKeyType: 'search',
            onFocus: () => setIsAutocompleteVisible(false),
            onSubmitEditing: () => onSearchSubmitClick(),
          }}
        />
        {isSearchBarActive && autocompleteQuery.isSuccess && isAutocompleteVisible && (
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
        navigation={navigation}
        route={route}
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
  searchbar: {
    width: '95%',
    alignSelf: 'center',
  },
  locationContainer: {
    height: '100%',
  },
});

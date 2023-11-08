import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

import {
  SearchRequest,
  autocompleteBusinessSearch,
  searchForBusinesses,
} from '../../../api/search';

import FormSearchBar from '../../../components/inputs/FormSearchBar';
import BusinessList from '../../../components/searchTab/BusinessList';
import SearchAutocomplete from '../../../components/searchTab/SearchAutocomplete';
import FormInput from '../../../components/inputs/FormInput';
import FormLocationPicker from '../../../components/inputs/FormLocationPicker';

const schema = z.object({
  searchQuery: z.string(),
  location: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const searchBarRef = useRef<TextInput>(null);
  const mapRef = useRef<MapView>(null);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteValue] = useDebounce(searchQuery, 500);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { searchQuery: '', location: '' },
    resolver: zodResolver(schema),
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [currentLocationOption, setCurrentLocationOption] = useState({
    description: 'Current location',
    geometry: { location: { lat: 0, lng: 0 } },
  });
  const [searchLocation, setSearchLocation] = useState({ latitude: 52, longitude: 21 });

  useEffect(() => {
    checkCurrentLocation();
  }, []);

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

  const onSearchLocationClick = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail) => {
      if (data.description === 'Current location') {
        await checkCurrentLocation();
        setSearchLocation(() => ({
          latitude: currentLocationOption.geometry.location.lat,
          longitude: currentLocationOption.geometry.location.lng,
        }));
      } else {
        setSearchLocation(() => ({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        }));
      }
    },
    [currentLocationOption.geometry.location.lat, currentLocationOption.geometry.location.lng]
  );

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

  const toggleSearchScreen = (isOn: boolean) => {
    if (isOn) {
      searchBarRef.current?.focus();
    } else {
      searchBarRef.current?.blur();
    }
    setIsSearchBarActive(isOn);
  };

  const onSearchSubmitClick = useCallback(
    async (data: FormData) => {
      await searchMutation.mutateAsync({
        searchQuery: data.searchQuery,
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

  //TODO Fix autocomplete
  const onSuggestionClick = async (suggestion: string) => {
    setSearchQuery(suggestion);
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
    setIsSearchBarActive(false);
    actionSheetRef.current?.show();
  };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [searchMutation.mutateAsync, searchLocation.latitude, searchLocation.longitude]
  // );

  useEffect(() => {
    if (searchMutation.isSuccess) {
      const markers = searchMutation.data?.data.results?.map((business) => business.firebaseUid!);
      if (markers?.length! > 0)
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
        showsUserLocation
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
        //TODO fix autocomplete. Modify searchQuery state
        <FormSearchBar
          name="searchQuery"
          control={control}
          value="null"
          innerRef={searchBarRef}
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
          onSubmitEditing={handleSubmit(onSearchSubmitClick)}
          onClearIconPress={() => {
            actionSheetRef.current?.hide();
            searchMutation.reset();
          }}
        />
        <Controller
          name="location"
          control={control}
          render={({ field: { onChange, name } }) => (
            <GooglePlacesAutocomplete
              styles={{
                container: {
                  width: '95%',
                  alignSelf: 'center',
                  height: 'auto',
                  display: isSearchBarActive ? 'block' : 'none',
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
                // 'details' is provided when fetchDetails = true
                searchBarRef.current?.focus();
                onChange(data.description);
                onSearchLocationClick(data, details!);
              }}
              query={{
                key: process.env.EXPO_PUBLIC_MAPS_KEY,
                language: 'en',
                type: 'geocode',
              }}
              predefinedPlaces={[currentLocationOption]}
              textInputProps={{
                inputComp: <FormLocationPicker name={name} control={control} />,
                // returnKeyType: 'search',
              }}
            />
          )}
        />
        <Text>{errors.location?.message}</Text>
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

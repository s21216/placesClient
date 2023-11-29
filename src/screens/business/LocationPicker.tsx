import { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const LocationPicker = () => {
  const [location, setLocation] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [address, setAddress] = useState({});
  const mapRef = useRef<MapView>(null);

  const onRegionChange = (region: any) => {
    setLocation({
      region,
    });
  };

  const onAddressClick = (details: GooglePlaceDetail) => {
    mapRef.current?.animateToRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={styles.container}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onRegionChangeComplete={onRegionChange}
      />
      <GooglePlacesAutocomplete
        styles={{
          container: {
            position: 'absolute',
            width: '95%',
            alignSelf: 'center',
            height: '100%',
          },
          textInput: {
            backgroundColor: 'white',
            alignSelf: 'center',
            color: 'black',
            marginTop: 5,
          },
        }}
        enablePoweredByContainer={false}
        debounce={500}
        placeholder="Your business address"
        fetchDetails
        onPress={(data, details) => {
          console.log(details);
          setAddress(data);
          onAddressClick(details!);
          setIsSearchActive(false);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_MAPS_KEY,
          language: 'en',
          type: 'address',
        }}
        textInputProps={{
          onFocus: () => setIsSearchActive(true),
        }}
      />
      {!isSearchActive && (
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('../../../assets/map-marker.png')} />
        </View>
      )}
    </View>
  );
};

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

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  autocomplete: {
    position: 'absolute',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});

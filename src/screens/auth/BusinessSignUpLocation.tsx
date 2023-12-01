import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Image } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { useBusinessSignUp } from '../../helpers/contexts/BusinessSignUpContext';

const schema = z.object({
  address: z.string().min(5),
  latitude: z.number(),
  longitude: z.number(),
});
type FormData = z.infer<typeof schema>;

const BusinessSignUpLocation = () => {
  const mapRef = useRef<MapView>(null);
  const { getForm, setForm } = useBusinessSignUp();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onRegionChange = (region: Region) => {
    setValue('latitude', region.latitude, { shouldValidate: true });
    setValue('longitude', region.longitude, { shouldValidate: true });
    setForm({
      ...getForm(),
      location: {
        ...getForm().location,
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };

  const onAddressClick = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    setValue('address', data?.description!, { shouldDirty: true, shouldValidate: true });
    mapRef.current?.animateToRegion({
      latitude: details!.geometry.location.lat,
      longitude: details!.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setForm({
      ...getForm(),
      location: {
        address: data.description,
        latitude: details!.geometry.location.lat,
        longitude: details!.geometry.location.lng,
      },
    });
  };

  const { businessSignUp } = useAuth();

  const onSignUpClick = async () => {
    businessSignUp(getForm());
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={styles.container}
        initialRegion={{
          latitude: 52,
          longitude: 21,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        onRegionChangeComplete={onRegionChange}
      />
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value, name } }) => (
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
            placeholder="Search address"
            fetchDetails
            onPress={(data, details) => {
              onAddressClick(data, details);
            }}
            query={{
              key: process.env.EXPO_PUBLIC_MAPS_KEY,
              language: 'en',
              type: 'address',
            }}
            textInputProps={{}}
          />
        )}
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={require('../../../assets/map-marker.png')} />
      </View>
      <View style={styles.footer}>
        <FormInput
          style={styles.region}
          disabled
          control={control}
          name="address"
          placeholder="Address"
          error={errors.address !== undefined}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit(onSignUpClick)}>
          Sign up
        </Button>
      </View>
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

export default BusinessSignUpLocation;

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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingVertical: 30,
  },
  region: {
    color: '#000',
    margin: 5,
    alignSelf: 'center',
    width: '90%',
  },
  button: {
    margin: 5,
    padding: 5,
    width: '90%',
    alignSelf: 'center',
  },
});

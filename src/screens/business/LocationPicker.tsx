import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Image, StyleSheet, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Text } from 'react-native-paper';
import { z } from 'zod';

import { getBusinessLocation, updateBusinessLocation } from '../../api/business';
import { BusinessUpdateLocationScreenProps } from '../../helpers/utils/navigationTypes';

const schema = z.object({
  address: z.string().min(5),
  latitude: z.number(),
  longitude: z.number(),
});

type FormData = z.infer<typeof schema>;

const LocationPicker = ({ navigation, route }: BusinessUpdateLocationScreenProps) => {
  const mapRef = useRef<MapView>(null);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['businessLocation'],
    queryFn: () => getBusinessLocation(route.params.businessId),
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    defaultValues: {
      address: data?.data.address,
      latitude: data?.data.latitude,
      longitude: data?.data.longitude,
    },
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: updateBusinessLocation,
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries(['details']);
    },
  });

  const onSaveLocation = useCallback(
    (data: FormData) => {
      mutate(data);
    },
    [mutate]
  );

  const onRegionChange = (region: Region) => {
    setValue('latitude', region.latitude, { shouldValidate: true });
    setValue('longitude', region.longitude, { shouldValidate: true });
  };

  const onAddressClick = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    setValue('address', data?.description!, { shouldDirty: true, shouldValidate: true });
    mapRef.current?.animateToRegion({
      latitude: details!.geometry.location.lat,
      longitude: details!.geometry.location.lng,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onSaveLocation)}
        />
      ),
    });
  }, [handleSubmit, isDirty, isValid, navigation, onSaveLocation, getValues]);

  if (isFetching) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={styles.container}
        initialRegion={{
          latitude: data?.data.latitude!,
          longitude: data?.data.longitude!,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
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
        <Text style={styles.region} variant="titleMedium">
          Adjust pin
        </Text>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#000',
    lineHeight: 20,
    margin: 20,
    alignSelf: 'center',
  },
});

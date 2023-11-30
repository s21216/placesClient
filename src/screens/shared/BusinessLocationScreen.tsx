import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { getBusinessLocation } from '../../api/business';
import { BusinessLocationProps } from '../../helpers/utils/navigationTypes';

const BusinessLocationScreen = ({ route }: BusinessLocationProps) => {
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['businessLocation'],
    queryFn: () => getBusinessLocation(route.params.businessId),
  });
  return (
    <View style={styles.container}>
      {!isFetching && (
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.container}
          initialRegion={{
            latitude: data?.data.latitude ? data.data.latitude : 52.2297,
            longitude: data?.data.longitude ? data.data.longitude : 21.0122,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {isSuccess && (
            <Marker
              coordinate={{
                latitude: data.data.latitude!,
                longitude: data.data.longitude!,
              }}
            />
          )}
        </MapView>
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

export default BusinessLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

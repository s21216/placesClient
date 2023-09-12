import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return <MapView style={styles.container} />;
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

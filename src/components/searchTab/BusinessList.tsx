import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Divider } from 'react-native-paper';

import { BusinessSearchResponse } from '../../api/search';

type Props = {
  searchResults?: BusinessSearchResponse;
};

const BusinessList = ({ searchResults }: Props) => {
  const results = searchResults?.results;

  const RightContent = (score: number) => (
    <Avatar.Text style={styles.score} size={50} label={score.toFixed(1)} />
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={results}
        renderItem={({ item }) => (
          <>
            <Card key={item.firebaseUid} style={styles.card} mode="contained">
              <Card.Title
                title={item.name}
                subtitle={item.cuisine || 'cuisine'}
                right={() => RightContent(item.score!)}
              />
            </Card>
            <Divider />
          </>
        )}
        estimatedItemSize={2}
      />
    </View>
  );
};

export default BusinessList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    margin: 5,
    // backgroundColor: 'rgb(242, 242, 242)',
    backgroundColor: 'gray',
  },
  score: {
    marginRight: 10,
    backgroundColor: 'black',
  },
});

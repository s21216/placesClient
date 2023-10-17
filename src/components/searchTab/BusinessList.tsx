import { RefObject } from 'react';
import { StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef, useScrollHandlers } from 'react-native-actions-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar, Card, Divider } from 'react-native-paper';

import { BusinessSearchResponse } from '../../api/search';

type Props = {
  hide: boolean;
  searchResults?: BusinessSearchResponse;
  businessListRef: RefObject<ActionSheetRef>;
};

const BusinessList = ({ hide, searchResults, businessListRef }: Props) => {
  const scrollHandlers = useScrollHandlers<FlatList>('scrollview-1', businessListRef);
  const results = searchResults?.results;

  const RightContent = (score: number) => (
    <Avatar.Text style={styles.score} size={50} label={score.toFixed(1)} />
  );

  return (
    <ActionSheet
      ref={businessListRef}
      containerStyle={hide ? { height: '0%' } : { height: '85%' }}
      snapPoints={[20, 60]}
      initialSnapIndex={1}
      gestureEnabled
      drawUnderStatusBar={false}
      isModal={false}
      backgroundInteractionEnabled
      keyboardHandlerEnabled={false}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <>
            <Card key={item.firebaseUid} style={styles.card} mode="contained">
              <Card.Title title={item.name} right={() => RightContent(item.score!)} />
            </Card>
            <Divider />
          </>
        )}
        {...scrollHandlers}
      />
    </ActionSheet>
  );
};

export default BusinessList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    margin: 5,
    backgroundColor: 'white',
  },
  score: {
    marginRight: 10,
    backgroundColor: 'black',
  },
});

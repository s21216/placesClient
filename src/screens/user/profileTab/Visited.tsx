import { useInfiniteQuery } from '@tanstack/react-query';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Card, Divider, Text } from 'react-native-paper';

import { getVisitedBusinesses } from '../../../api/user';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { VisitedProps } from '../../../helpers/utils/navigationTypes';
import { CostEnum } from '../../../helpers/utils/types';

const Visited = ({ navigation }: VisitedProps) => {
  const { currentUser } = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isRefetching } = useInfiniteQuery({
    queryKey: ['businesses', currentUser?.uid],
    queryFn: ({ pageParam = 0 }) =>
      getVisitedBusinesses(currentUser?.uid!, {
        pageNumber: pageParam,
        pageSize: 10,
        orderBy: '',
        sortOrder: 'ASC',
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.pageNumber! < lastPage.data?.totalPages! - 1
        ? lastPage.data?.pageNumber! + 1
        : undefined,
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const RightContent = (score?: number) => (
    <Avatar.Text style={styles.score} size={50} label={score ? score?.toFixed(1) : 'N/A'} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages?.flatMap((page) => page.data?.results) || []}
        renderItem={({ item }) => (
          <View key={item?.firebaseUid}>
            <Card
              key={item?.firebaseUid}
              style={styles.card}
              mode="contained"
              onPress={() => navigation.navigate('Details', { businessId: item?.firebaseUid! })}>
              <Card.Title title={item?.name} right={() => RightContent(item?.score)} />
              <Card.Content>
                <Text>
                  {item?.type} • {item?.address} • {CostEnum[item?.cost! as keyof typeof CostEnum]}
                </Text>
              </Card.Content>
            </Card>
            <Divider />
          </View>
        )}
        keyExtractor={(item) => item?.firebaseUid!}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} />}
      />
      {isFetching && <ActivityIndicator color="black" size={30} />}
    </View>
  );
};

export default Visited;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  score: {
    marginRight: 10,
    backgroundColor: 'black',
  },
});

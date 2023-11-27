import { useInfiniteQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

import { getBusinessReviews } from '../../../api/business';
import ReviewCard from '../../../components/reviewScreen/ReviewCard';
import { ReviewListProps } from '../../../helpers/utils/navigationTypes';

const ReviewList = ({ route }: ReviewListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isRefetching } = useInfiniteQuery({
    queryKey: ['reviews', route.params.businessId],
    queryFn: ({ pageParam = 0 }) =>
      getBusinessReviews(route.params.businessId, {
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

  return (
    <View style={styles.container}>
      <FlatList
        style={{ padding: 20 }}
        data={data?.pages?.flatMap((page) => page.data?.results) || []}
        renderItem={({ item }) => <ReviewCard review={item!} />}
        keyExtractor={(item) => item?.id?.toString()!}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} />}
      />
      {isFetching && <ActivityIndicator color="black" size={30} />}
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

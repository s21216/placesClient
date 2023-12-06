import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Avatar, Divider, Text, Button } from 'react-native-paper';

import ExpandableText from './ExpandableText';
import ReplyCard from './ReplyCard';
import ReviewCardUserMenu from './ReviewCardUserMenu';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { BusinessReviewTabParamList } from '../../helpers/utils/navigationTypes';
import { ReviewResult } from '../../helpers/utils/types';

type ReviewCardProps = {
  reviewEditable?: boolean;
  review: ReviewResult | undefined;
};

const ReviewCard = ({ reviewEditable, review }: ReviewCardProps) => {
  const { role } = useAuth();
  const businessNavigation = useNavigation<StackNavigationProp<BusinessReviewTabParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text variant="titleMedium">{review?.postOwner?.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Avatar.Text
            label={review?.score?.toLocaleString()!}
            size={40}
            style={styles.avatarText}
          />
          {reviewEditable && <ReviewCardUserMenu review={review} />}
        </View>
      </View>
      <ExpandableText text={review?.description} />
      {review?.reply && <ReplyCard role={role!} review={review!} />}
      {!review?.reply && role === 'BUSINESS' && (
        <Button
          style={styles.reply}
          onPress={() =>
            businessNavigation.navigate('BusinessReviewReply', {
              reviewId: review?.id!,
            })
          }>
          Reply
        </Button>
      )}
      <Divider />
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarText: {
    backgroundColor: 'black',
    marginRight: 5,
  },
  reply: {
    alignSelf: 'flex-end',
  },
});

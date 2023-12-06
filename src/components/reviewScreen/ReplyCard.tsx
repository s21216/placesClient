import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ExpandableText from './ExpandableText';
import ReplyCardBusinessMenu from './ReplyCardBusinessMenu';
import { ReviewResult } from '../../helpers/utils/types';

const ReplyCard = ({ role, review }: { role: string; review: ReviewResult }) => {
  return (
    <View style={styles.container}>
      {review && (
        <View>
          <View style={styles.header}>
            <View style={styles.row}>
              <Text variant="titleMedium">{role === 'USER' ? 'Owner' : 'Your reply'}</Text>
            </View>
            {role === 'BUSINESS' && <ReplyCardBusinessMenu review={review} />}
          </View>
          <ExpandableText text={review.reply?.description} />
        </View>
      )}
    </View>
  );
};

export default ReplyCard;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reply: {
    alignSelf: 'flex-end',
  },
});

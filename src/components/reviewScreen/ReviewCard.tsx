import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Dialog, Divider, Menu, Portal, Text } from 'react-native-paper';

import ExpandableText from './ExpandableText';
import { SearchTabParamList } from '../../helpers/utils/navigationTypes';
import { ReviewResult } from '../../helpers/utils/types';

type ReviewCardProps = {
  editable?: boolean;
  review: ReviewResult | undefined;
  deleteFn?: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
};

const ReviewCard = ({ editable, review, deleteFn }: ReviewCardProps) => {
  const navigation = useNavigation<StackNavigationProp<SearchTabParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  const onDeletePress = () => {
    hideDialog();
    deleteFn!();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar.Text
            style={styles.avatar}
            label={review?.postOwner?.fullName!}
            size={30}
            color="white"
          />
          <Text variant="titleMedium">{review?.postOwner?.fullName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Text
            label={review?.score?.toLocaleString()!}
            size={40}
            style={styles.avatarText}
          />
          {editable && (
            <View>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={<Entypo name="dots-three-vertical" color="black" onPress={openMenu} />}>
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate('PostReview', { businessId: review?.businessId! });
                  }}
                  title="Edit"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    showDialog();
                  }}
                  title="Delete"
                />
              </Menu>
              <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog} textColor="black">
                      Cancel
                    </Button>
                    <Button onPress={onDeletePress}>Delete</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          )}
        </View>
      </View>
      <ExpandableText item={review} />
      <Divider />
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  avatar: {
    marginHorizontal: 5,
  },
  avatarText: {
    backgroundColor: 'black',
  },
});

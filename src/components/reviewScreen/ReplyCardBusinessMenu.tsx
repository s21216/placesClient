import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Divider, Menu, Portal, Button, Text } from 'react-native-paper';

import { deleteReviewReply } from '../../api/review';
import { BusinessReviewTabParamList } from '../../helpers/utils/navigationTypes';
import { ReviewResult } from '../../helpers/utils/types';

type ReviewCardMenuProps = {
  review: ReviewResult;
};

const ReplyCardBusinessMenu = ({ review }: ReviewCardMenuProps) => {
  const navigation = useNavigation<StackNavigationProp<BusinessReviewTabParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const queryClient = useQueryClient();

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  const onDeletePress = () => {
    hideDialog();
    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: () => deleteReviewReply(review?.id?.toString()!),
    onSuccess: () => queryClient.invalidateQueries(['reviews']),
  });

  return (
    <View>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<Entypo name="dots-three-vertical" color="black" onPress={openMenu} size={20} />}>
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('BusinessReviewReply', { reviewId: review?.id! });
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
          <Dialog.Title>Delete review</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete your review?</Text>
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
  );
};

export default ReplyCardBusinessMenu;

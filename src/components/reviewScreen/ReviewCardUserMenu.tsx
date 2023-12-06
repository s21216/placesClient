import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Divider, Menu, Portal, Button, Text } from 'react-native-paper';

import { deleteReview } from '../../api/review';
import { SearchTabParamList } from '../../helpers/utils/navigationTypes';
import { ReviewResult } from '../../helpers/utils/types';

type ReviewCardMenuProps = {
  review: ReviewResult | undefined;
};

const ReviewCardUserMenu = ({ review }: ReviewCardMenuProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<SearchTabParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  const deleteReviewMutation = useMutation({
    mutationFn: () => deleteReview(review?.id?.toString()!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  const onDeletePress = () => {
    hideDialog();
    deleteReviewMutation.mutate();
  };

  return (
    <View>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<Entypo name="dots-three-vertical" color="black" onPress={openMenu} size={20} />}>
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

export default ReviewCardUserMenu;

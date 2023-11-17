import { zodResolver } from '@hookform/resolvers/zod';
import { useHeaderHeight } from '@react-navigation/elements';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { z } from 'zod';

import { postReview } from '../../../api/review';
import { ReviewProps } from '../../../helpers/utils/navigationTypes';

const schema = z.object({
  score: z.number(),
  description: z.string().min(50).max(1000),
});

type FormData = z.infer<typeof schema>;

const ReviewScreen = ({ navigation, route }: ReviewProps) => {
  const height = useHeaderHeight();
  const reviewRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { score: undefined, description: '' },
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: postReview,
  });

  const onPostReviewPress = useCallback(
    (data: FormData) => {
      mutate({
        businessId: route.params.businessId,
        score: data.score,
        description: data.description,
      });
      navigation.goBack();
    },
    [mutate, navigation, route.params.businessId]
  );

  console.log(errors.description?.type);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? height + 64 : height}>
      <View style={styles.container}>
        <Text variant="headlineSmall">{route.params.businessName}</Text>
        <Controller
          control={control}
          name="score"
          render={({ field: { onChange } }) => (
            <AirbnbRating
              defaultRating={0}
              count={10}
              onFinishRating={onChange}
              showRating={false}
              size={30}
              starContainerStyle={styles.stars}
            />
          )}
        />
        <Text style={styles.error}>{errors.score && 'Select a score'}</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={reviewRef}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Write your review"
              multiline
              style={[styles.input]}
            />
          )}
        />
      </View>
      <Text style={styles.error}>
        {errors.description?.type === 'too_big' &&
          "Your review can't be longer than 1000 characters."}
        {errors.description?.type === 'too_small' &&
          'Your review needs to be at least 50 characters.'}
      </Text>
      <View style={styles.container_test}>
        <Button style={styles.button} onPress={handleSubmit(onPostReviewPress)}>
          Post review
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  container_test: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    textAlignVertical: 'top',
  },
  stars: {
    paddingVertical: 10,
  },
  error: {
    color: '#c72c2e',
  },
});

import { zodResolver } from '@hookform/resolvers/zod';
import { useHeaderHeight } from '@react-navigation/elements';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { z } from 'zod';

import { getReview, postReview } from '../../../api/review';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { PostReviewProps } from '../../../helpers/utils/navigationTypes';

const schema = z.object({
  score: z.number(),
  description: z.string().min(50).max(1000),
});

type FormData = z.infer<typeof schema>;

const PostReview = ({ navigation, route }: PostReviewProps) => {
  const queryClient = useQueryClient();
  const [isSomethingFetching, setIsSomethingFetching] = useState(true);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const height = useHeaderHeight();
  const reviewRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: { score: undefined, description: '' },
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
      navigation.goBack();
    },
  });

  const getReviewQuery = useQuery({
    queryKey: ['review', userId, route.params.businessId],
    queryFn: () => getReview(userId!, route.params.businessId),
    retry: false,
  });

  useEffect(() => {
    setIsSomethingFetching(true);
    if (getReviewQuery.isSuccess) {
      setValue('score', getReviewQuery.data.data.score!);
      setValue('description', getReviewQuery.data.data.description!);
    }
    setIsSomethingFetching(false);
  }, [
    getReviewQuery.data?.data?.description,
    getReviewQuery.data?.data?.score,
    getReviewQuery.isSuccess,
    setValue,
  ]);

  const onPostReviewPress = useCallback(
    (data: FormData) => {
      mutate({
        businessId: route.params.businessId,
        score: data.score,
        description: data.description,
      });
    },
    [mutate, route.params.businessId]
  );

  const condition = isLoading || getReviewQuery.isFetching || isSomethingFetching;

  return (
    <View style={styles.container}>
      {condition ? (
        <ActivityIndicator style={styles.container} color="black" size={50} />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? height + 64 : height}>
          <View style={styles.container}>
            <View style={styles.container}>
              <Text variant="headlineSmall">{getReviewQuery.data?.data.businessName}</Text>
              <Controller
                control={control}
                name="score"
                render={({ field: { onChange, value } }) => (
                  <AirbnbRating
                    defaultRating={value === undefined ? 0 : value}
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
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default PostReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
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

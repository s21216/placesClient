import { zodResolver } from '@hookform/resolvers/zod';
import { useHeaderHeight } from '@react-navigation/elements';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { z } from 'zod';

import { getReviewReply, postReviewReply } from '../../../api/review';
import { BusinessReviewReplyScreenProps } from '../../../helpers/utils/navigationTypes';

const schema = z.object({
  description: z.string().min(5).max(1000),
});

type FormData = z.infer<typeof schema>;

const BusinessReviewReplyScreen = ({ navigation, route }: BusinessReviewReplyScreenProps) => {
  const height = useHeaderHeight();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { description: '' },
    resolver: zodResolver(schema),
  });

  const getReviewReplyQuery = useQuery({
    queryKey: ['review', route.params.reviewId],
    queryFn: () => getReviewReply(route.params.reviewId.toString()),
  });

  useEffect(() => {
    if (getReviewReplyQuery.isSuccess) {
      setValue('description', getReviewReplyQuery.data.data.description!);
    }
  }, [getReviewReplyQuery?.data?.data.description, getReviewReplyQuery.isSuccess, setValue]);

  const postReviewReplyMutation = useMutation({
    mutationFn: (description: FormData) =>
      postReviewReply(route.params.reviewId.toString(), description),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
      navigation.goBack();
    },
  });

  const onReviewReplySubmit = (data: FormData) => {
    postReviewReplyMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      {getReviewReplyQuery.isFetching ? (
        <ActivityIndicator style={styles.container} color="black" size={50} />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? height + 64 : height}>
          <View style={styles.container}>
            <View style={styles.container}>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Write your review"
                    multiline
                    style={styles.input}
                  />
                )}
              />
            </View>
            <Text style={styles.error}>
              {errors.description?.type === 'too_big' &&
                "Your review can't be longer than 1000 characters."}
              {errors.description?.type === 'too_small' &&
                'Your review needs to be at least 5 characters.'}
            </Text>
            <View style={styles.container_test}>
              <Button style={styles.button} onPress={handleSubmit(onReviewReplySubmit)}>
                Post reply
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default BusinessReviewReplyScreen;

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
    marginBottom: 15,
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

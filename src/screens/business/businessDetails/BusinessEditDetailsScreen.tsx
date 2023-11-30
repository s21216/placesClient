import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Chip, SegmentedButtons, Text } from 'react-native-paper';
import { z } from 'zod';

import { getBusinessDetails, updateBusinessDetails } from '../../../api/business';
import FormInput from '../../../components/inputs/FormInput';
import { useAuth } from '../../../helpers/contexts/AuthContext';
import { BusinessEditDetailsScreenProps } from '../../../helpers/utils/navigationTypes';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const schema = z.object({
  type: z.string().min(3).max(20),
  description: z.string().max(200),
  phoneNumber: z.string().min(9).regex(phoneRegex),
  attributes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
  categories: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array()
    .max(5),
  cost: z.enum(['INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE']),
});

export type BusinessDetailsFormData = z.infer<typeof schema>;

const BusinessEditDetailsScreen = ({ navigation }: BusinessEditDetailsScreenProps) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ['details'],
    queryFn: () => getBusinessDetails(currentUser?.uid!),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<BusinessDetailsFormData>({
    defaultValues: {
      type: data?.data.type,
      description: data?.data.description,
      phoneNumber: data?.data.phoneNumber,
      attributes: data?.data.attributes!,
      categories: data?.data.categories!,
      cost: data?.data.cost,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const updateDetailsMutation = useMutation({
    mutationFn: updateBusinessDetails,
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries(['details']);
    },
  });

  const onFormSubmit = useCallback(
    async (data: BusinessDetailsFormData) => {
      updateDetailsMutation.mutate(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateDetailsMutation.mutate]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Save" disabled={!isDirty || !isValid} onPress={handleSubmit(onFormSubmit)} />
      ),
    });
  }, [handleSubmit, isDirty, navigation, onFormSubmit, isValid]);

  if (isFetching) {
    return <ActivityIndicator style={styles.container} size={50} color="black" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.section}>
          <Text variant="headlineSmall">Basics</Text>
          <Text variant="titleMedium">Type of business</Text>
          <FormInput
            name="type"
            control={control}
            style={styles.textInput}
            mode="outlined"
            outlineColor="lightgray"
            activeOutlineColor="gray"
            outlineStyle={styles.outlineStyle}
            placeholder="e.g restaurant, bar, bakery"
            error={errors.type !== undefined}
          />
          <Text variant="titleMedium">Bio</Text>
          <FormInput
            name="description"
            control={control}
            style={styles.textInput}
            mode="outlined"
            outlineColor="lightgray"
            outlineStyle={styles.outlineStyle}
            activeOutlineColor="gray"
            multiline
            error={errors.description !== undefined}
          />
          <Text variant="titleMedium">Phone number</Text>
          <FormInput
            name="phoneNumber"
            control={control}
            style={styles.textInput}
            mode="outlined"
            outlineColor="lightgray"
            activeOutlineColor="gray"
            outlineStyle={styles.outlineStyle}
            placeholder="e.g 888777666"
            error={errors.phoneNumber !== undefined}
          />
        </View>
        <View>
          <Text style={styles.section} variant="headlineSmall">
            Location
          </Text>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('BusinessUpdateLocation', { businessId: currentUser?.uid! })
            }
            underlayColor="#e6e6e6">
            <View>
              <Text style={styles.location} variant="titleMedium">
                {data?.data.location?.address}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.section}>
          <Text variant="headlineSmall">Categories</Text>
          <Controller
            control={control}
            name="categories"
            render={() => (
              <TouchableOpacity
                style={styles.border}
                onPress={() => {
                  SheetManager.show('categories-sheet', {
                    payload: { checkedCategories: data?.data.categories, control },
                  });
                }}>
                {getValues('categories')?.length === 0 && <Text>Choose categories</Text>}
                {getValues('categories')?.map((category) => (
                  <Chip style={styles.chip} key={category.id}>
                    {category.name}
                  </Chip>
                ))}
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.section}>
          <Text variant="headlineSmall">Price range</Text>
          <Controller
            control={control}
            name="cost"
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                style={styles.textInput}
                value={value}
                onValueChange={onChange}
                buttons={[
                  { value: 'INEXPENSIVE', label: '$' },
                  { value: 'MODERATE', label: '$$' },
                  { value: 'EXPENSIVE', label: '$$$' },
                  { value: 'VERY_EXPENSIVE', label: '$$$$' },
                ]}
              />
            )}
          />
        </View>
        <View style={styles.section}>
          <Text variant="headlineSmall">More about business</Text>
          <Controller
            control={control}
            name="attributes"
            render={(name) => (
              <TouchableOpacity
                style={styles.border}
                onPress={() => {
                  SheetManager.show('attributes-sheet', {
                    payload: { checkedAttributes: data?.data.attributes, control, name },
                  });
                }}>
                {getValues('attributes')?.length === 0 && <Text>Choose attributes</Text>}
                {getValues('attributes')?.map((attribute) => (
                  <Chip style={styles.chip} key={attribute.id}>
                    {attribute.name}
                  </Chip>
                ))}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default BusinessEditDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  section: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  textInput: {
    marginVertical: 5,
    maxHeight: 150,
  },
  outlineStyle: {
    borderRadius: 10,
  },
  border: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  chip: {
    margin: 5,
  },
  checkbox: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  location: {
    padding: 20,
  },
});

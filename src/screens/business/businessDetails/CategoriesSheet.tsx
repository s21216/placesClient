import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import { ActivityIndicator, Chip, Text } from 'react-native-paper';

import { BusinessDetailsFormData } from './BusinessEditDetailsScreen';
import { components } from '../../../../schema';
import { getCategories } from '../../../api/business';

type Category = components['schemas']['Category'];

const CategoriesSheet = (
  props: SheetProps<{
    checkedCategories: Category[];
    control: Control<BusinessDetailsFormData>;
    name: string;
  }>
) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('scrollview', actionSheetRef);

  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { fields, append, remove } = useFieldArray({
    keyName: '_id',
    name: 'categories',
    control: props.payload?.control,
  });

  return (
    <ActionSheet id={props.sheetId} containerStyle={{ height: '80%' }}>
      {isFetching ? (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
          color="black"
          size={30}
        />
      ) : (
        <ScrollView {...scrollHandlers} nestedScrollEnabled>
          <Text style={{ margin: 20 }} variant="headlineMedium">
            Select up to 5 categories
          </Text>
          <View style={styles.wrap}>
            {data?.data.map((category) => (
              <Chip
                showSelectedCheck={false}
                mode={
                  fields?.find((field) => field.id === category.id) !== undefined
                    ? 'flat'
                    : 'outlined'
                }
                key={category.id}
                selected={fields?.find((pre) => pre.id === category.id) !== undefined}
                style={styles.chip}
                onPress={
                  fields?.find((field) => field.id === category.id) === undefined
                    ? fields.length < 5
                      ? () => append({ id: category.id!, name: category.name! })
                      : () => {}
                    : () => remove(fields.map((field) => field.id).indexOf(category.id!))
                }>
                {category.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
      )}
    </ActionSheet>
  );
};

export default CategoriesSheet;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'lightgray',
    marginHorizontal: 10,
  },
  chip: {
    margin: 5,
  },
});

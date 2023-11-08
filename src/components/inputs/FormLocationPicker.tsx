import { ComponentProps } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

type ControllerProps = {
  name: string;
  control: Control<any, any>;
};

type FormLocationPickerProps = ControllerProps & ComponentProps<typeof TextInput>;

const FormLocationPicker = (props: FormLocationPickerProps) => {
  const { field } = useController({
    defaultValue: '',
    control: props.control,
    name: props.name,
  });
  return <TextInput value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />;
};

export default FormLocationPicker;

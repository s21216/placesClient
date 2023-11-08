import { ComponentProps } from 'react';
import { Control, useController } from 'react-hook-form';
import { Searchbar } from 'react-native-paper';

type ControllerProps = {
  name: string;
  control: Control<any, any>;
  innerRef?: React.RefObject<any>;
};

type FormSearchbarProps = ControllerProps & ComponentProps<typeof Searchbar>;

const FormSearchBar = (props: FormSearchbarProps) => {
  const { field } = useController({
    defaultValue: '',
    control: props.control,
    name: props.name,
  });
  return (
    <Searchbar
      style={{ width: '95%', alignSelf: 'center' }}
      ref={props.innerRef}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...(function ({ value, ...restProps }) {
        return restProps;
      })(props)}
    />
  );
};

export default FormSearchBar;

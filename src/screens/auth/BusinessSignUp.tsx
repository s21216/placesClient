import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { BusinessSignUpProps } from '../../helpers/utils/navigationTypes';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const schema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(9).regex(phoneRegex, 'Invalid number'),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

const BusinessSignUp = ({ navigation }: BusinessSignUpProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const { businessSignUp } = useAuth();

  const onSignUpPress = async (data: FormData) => {
    businessSignUp({ ...data });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headline} variant="headlineMedium">
            Create a business account
          </Text>
        </View>
        <FormInput
          style={styles.input}
          control={control}
          name="name"
          label="Business name"
          autoCapitalize="none"
          error={errors.name !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="address"
          label="Address"
          autoCapitalize="none"
          error={errors.address !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="phoneNumber"
          label="Phone number"
          autoCapitalize="none"
          error={errors.phoneNumber !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="email"
          label="Email"
          autoCapitalize="none"
          error={errors.email !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="password"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.password !== undefined}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit(onSignUpPress)}>
          Sign up
        </Button>
        <View>
          <Text>
            Already have an account?{' '}
            <Text style={{ color: '#4285F4' }} onPress={() => navigation.navigate('LogIn')}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BusinessSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    padding: 10,
  },
  input: {
    margin: 5,
    width: '70%',
  },
  button: {
    margin: 5,
    padding: 5,
    width: '70%',
  },
});

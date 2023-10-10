import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { UserSignUpProps } from '../../helpers/utils/types';

const schema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  username: z.string().min(3),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const UserSignUp = ({ navigation }: UserSignUpProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const { userSignUp } = useAuth();

  const onSignUpPress = (data: FormData) => {
    userSignUp({ ...data });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headline} variant="headlineLarge">
            Create account
          </Text>
        </View>
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
          name="fullName"
          label="Full name"
          autoCapitalize="none"
          error={errors.fullName !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="username"
          label="Username"
          autoCapitalize="none"
          error={errors.username !== undefined}
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

export default UserSignUp;

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

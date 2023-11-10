import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { LogInProps } from '../../helpers/utils/navigationTypes';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const LogIn = ({ navigation }: LogInProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const { logIn } = useAuth();

  const onLogInPress = async (data: FormData) => {
    logIn(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headline} variant="headlineLarge">
            Places + Spaces
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
          name="password"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.password !== undefined}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit(onLogInPress)}>
          Log in
        </Button>
        <View>
          <Text>
            Don't have an account?{' '}
            <Text style={{ color: '#4285F4' }} onPress={() => navigation.navigate('UserSignUp')}>
              Sign up
            </Text>
          </Text>
        </View>
        <View>
          <Text>
            <Text
              style={{ color: '#4285F4' }}
              onPress={() => navigation.navigate('BusinessSignUp')}>
              Sign up for a business account.
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogIn;

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

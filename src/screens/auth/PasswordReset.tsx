import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { PasswordResetProps } from '../../helpers/utils/navigationTypes';

const schema = z.object({
  email: z.string().email(),
});
type FormData = z.infer<typeof schema>;

const PasswordReset = ({ navigation }: PasswordResetProps) => {
  const { sendPasswordReset } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    navigation.goBack();
  };

  const onSendEmail = async (data: FormData) => {
    try {
      await sendPasswordReset(data.email);
      showDialog();
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge">Reset password</Text>
        <Text variant="titleMedium">We will send you a reset link to your email.</Text>
      </View>
      <FormInput
        style={styles.input}
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        error={errors.email !== undefined}
      />
      <Button style={styles.button} mode="contained" onPress={handleSubmit(onSendEmail)}>
        Send
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Password reset</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Password reset link has been sent.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 5,
    width: '80%',
  },
  button: {
    margin: 5,
    padding: 5,
    width: '80%',
  },
});

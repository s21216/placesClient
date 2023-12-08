import { zodResolver } from '@hookform/resolvers/zod';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { z } from 'zod';

import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { UpdatePasswordProps } from '../../helpers/utils/navigationTypes';

const schema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });
type FormData = z.infer<typeof schema>;

const UpdatePassword = ({ navigation }: UpdatePasswordProps) => {
  const { currentUser } = useAuth();
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

  const onChangePassword = async (data: FormData) => {
    try {
      const credential = EmailAuthProvider.credential(currentUser?.email!, data.oldPassword);
      await reauthenticateWithCredential(currentUser!, credential);
      updatePassword(currentUser!, data.newPassword);
      showDialog();
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineLarge">Change password</Text>
        </View>
        <FormInput
          style={styles.input}
          control={control}
          name="oldPassword"
          label="Old password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.oldPassword !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="newPassword"
          label="New Password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.newPassword !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="repeatPassword"
          label="Repeat password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.repeatPassword !== undefined}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit(onChangePassword)}>
          Confirm
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Password change</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Succesfully changed password.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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

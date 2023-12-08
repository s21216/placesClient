import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { z } from 'zod';

import { changeBusinessEmail, changeUserEmail } from '../../api/auth';
import FormInput from '../../components/inputs/FormInput';
import { useAuth } from '../../helpers/contexts/AuthContext';
import { UpdateEmailProps } from '../../helpers/utils/navigationTypes';

const schema = z.object({
  password: z.string().min(6),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const UpdateEmail = ({ navigation }: UpdateEmailProps) => {
  const { currentUser, role } = useAuth();
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

  const changeUserEmailMutation = useMutation({
    mutationFn: (email: string) => changeUserEmail({ email }),
  });

  const changeBusinessEmailMutation = useMutation({
    mutationFn: (email: string) => changeBusinessEmail({ email }),
  });

  const onChangeEmail = async (data: FormData) => {
    try {
      const credential = EmailAuthProvider.credential(currentUser?.email!, data.password);
      await reauthenticateWithCredential(currentUser!, credential);
      updateEmail(currentUser!, data.email);
      if (role === 'USER') {
        changeUserEmailMutation.mutate(data.email);
      } else {
        changeBusinessEmailMutation.mutate(data.email);
      }
      showDialog();
    } catch (error: any) {
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
          <Text variant="headlineLarge">Update email</Text>
        </View>
        <FormInput
          style={styles.input}
          control={control}
          name="password"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          error={errors.password !== undefined}
        />
        <FormInput
          style={styles.input}
          control={control}
          name="email"
          label="New email"
          autoCapitalize="none"
          error={errors.email !== undefined}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit(onChangeEmail)}>
          Confirm
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Email update</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Succesfully changed email.</Text>
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

export default UpdateEmail;

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

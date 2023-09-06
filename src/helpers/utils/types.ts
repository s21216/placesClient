import { StackScreenProps } from '@react-navigation/stack';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

export type LogInProps = StackScreenProps<RootStackParamList, 'LogIn'>;
export type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

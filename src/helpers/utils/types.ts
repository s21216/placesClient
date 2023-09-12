import { StackScreenProps } from '@react-navigation/stack';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type RootStackParamList = {
  LogIn: undefined;
  UserSignUp: undefined;
  BusinessSignUp: undefined;
  Home: undefined;
};

export type LogInProps = StackScreenProps<RootStackParamList, 'LogIn'>;
export type UserSignUpProps = StackScreenProps<RootStackParamList, 'UserSignUp'>;
export type BusinessSignUpProps = StackScreenProps<RootStackParamList, 'BusinessSignUp'>;
export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

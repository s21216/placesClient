import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';

export type LogInResponse = {
  email: string;
  firebaseUid: string;
  role: string;
};

export type UserSignUpData = {
  email: string;
  fullName: string;
  username: string;
  password?: string;
};

export type BusinessSignUpData = {
  email: string;
  phoneNumber: string;
  address: string;
  name: string;
  password?: string;
};

export const logInFn = () => fetchClient().post<LogInResponse>('auth/signin');

type AuthResponse = components['schemas']['AuthResponse'];

export const userSignUpFn = (userSignUpData: UserSignUpData) =>
  fetchClient().post<AuthResponse>('auth/users/signup', userSignUpData);

export const businessSignUpFn = (businessSignUpData: BusinessSignUpData) =>
  fetchClient().post<AuthResponse>('auth/businesses/signup', businessSignUpData);

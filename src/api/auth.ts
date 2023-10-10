import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';

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

type AuthResponse = components['schemas']['AuthResponse'];

export const logInFn = () => fetchClient().post<AuthResponse>('auth/signin');

export const userSignUpFn = (userSignUpData: UserSignUpData) =>
  fetchClient().post<AuthResponse>('auth/users/signup', userSignUpData);

export const businessSignUpFn = (businessSignUpData: BusinessSignUpData) =>
  fetchClient().post<AuthResponse>('auth/businesses/signup', businessSignUpData);

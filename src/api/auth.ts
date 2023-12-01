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
  type: string;
  phoneNumber: string;
  name: string;
  password?: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
};

type AuthResponse = components['schemas']['AuthResponse'];

export const logInFn = () => fetchClient().post<AuthResponse>('auth/signin');

export const userSignUpFn = (userSignUpData: UserSignUpData) =>
  fetchClient().post<AuthResponse>('auth/users/signup', userSignUpData);

export const businessSignUpFn = (businessSignUpData: BusinessSignUpData) =>
  fetchClient().post<AuthResponse>('auth/businesses/signup', businessSignUpData);

import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

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

const changeUserEmailUrl: ValidUrl = '/auth/user/email';
type ChangeEmailRequest = components['schemas']['ChangeEmailRequest'];
export const changeUserEmail = (request: ChangeEmailRequest) =>
  fetchClient().post(changeUserEmailUrl, request);

const changeBusinessEmailUrl: ValidUrl = '/auth/user/email';
export const changeBusinessEmail = (request: ChangeEmailRequest) =>
  fetchClient().post(changeBusinessEmailUrl, request);

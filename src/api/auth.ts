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

export const userSignUpFn = (userSignUpData: UserSignUpData) =>
  fetchClient().post('auth/users/signup', userSignUpData);

export const businessSignUpFn = (businessSignUpData: BusinessSignUpData) =>
  fetchClient().post('auth/businesses/signup', businessSignUpData);

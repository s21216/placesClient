import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { paths } from '../../../schema';

export type RootStackParamList = {
  LogIn: undefined;
  UserSignUp: undefined;
  BusinessSignUp: undefined;
  BusinessHome: undefined;
  UserStack: undefined;
};

export type LogInProps = StackScreenProps<RootStackParamList, 'LogIn'>;
export type UserSignUpProps = StackScreenProps<RootStackParamList, 'UserSignUp'>;
export type BusinessSignUpProps = StackScreenProps<RootStackParamList, 'BusinessSignUp'>;

export type UserNavigatorParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
};

export type HomeTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'HomeTab'>;
export type SearchTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'SearchTab'>;

export type SearchTabParamList = {
  SearchScreen: undefined;
};

export type SearchScreenProps = StackScreenProps<SearchTabParamList, 'SearchScreen'>;

export type ValidUrl = keyof paths;

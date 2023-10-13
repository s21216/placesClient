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
  Start: undefined;
  BusinessList: undefined;
  BusinessMap: undefined;
};

export type StartProps = StackScreenProps<SearchTabParamList, 'Start'>;
export type BusinessListProps = StackScreenProps<SearchTabParamList, 'BusinessList'>;
export type BusinessMap = StackScreenProps<SearchTabParamList, 'BusinessMap'>;

export type ValidUrl = keyof paths;

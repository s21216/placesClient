import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

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
  Details: { businessId: string };
  PostReview: { businessId: string };
  ReviewList: { businessId: string };
};

export type SearchScreenProps = StackScreenProps<SearchTabParamList, 'SearchScreen'>;
export type DetailsProps = StackScreenProps<SearchTabParamList, 'Details'>;
export type PostReviewProps = StackScreenProps<SearchTabParamList, 'PostReview'>;
export type ReviewListProps = StackScreenProps<SearchTabParamList, 'ReviewList'>;

export type ValidUrl = keyof paths;

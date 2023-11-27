import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { paths } from '../../../schema';

export type RootStackParamList = {
  LogIn: undefined;
  UserSignUp: undefined;
  BusinessSignUp: undefined;
  BusinessStack: undefined;
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

//Business navgigation types

export type BusinessNavigatorParamList = {
  BusinessHomeTab: undefined;
  ReviewTab: undefined;
  ProfileTab: undefined;
};

export type BusinessHomeTabProps = BottomTabNavigationProp<
  BusinessNavigatorParamList,
  'BusinessHomeTab'
>;
export type BusinessProfileTabProps = BottomTabNavigationProp<
  BusinessNavigatorParamList,
  'ProfileTab'
>;

export type BusinessReviewTabProps = BottomTabNavigationProp<
  BusinessNavigatorParamList,
  'ReviewTab'
>;

export type BusinessHomeTabParamList = {
  BusinessHomeScreen: undefined;
  BusinessEditDetailsScreen: undefined;
};

export type BusinessHomeScreenProps = StackScreenProps<
  BusinessHomeTabParamList,
  'BusinessHomeScreen'
>;

export type BusinessReviewTabParamList = {
  BusinessReviewScreen: undefined;
};

export type ValidUrl = keyof paths;

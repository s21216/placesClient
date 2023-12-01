import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { paths } from '../../../schema';

export type RootStackParamList = {
  LogIn: undefined;
  UserSignUp: undefined;
  BusinessSignUp: undefined;
  BusinessSignUpLocation: undefined;
  BusinessStack: undefined;
  UserStack: undefined;
};

export type LogInProps = StackScreenProps<RootStackParamList, 'LogIn'>;
export type UserSignUpProps = StackScreenProps<RootStackParamList, 'UserSignUp'>;
export type BusinessSignUpProps = StackScreenProps<RootStackParamList, 'BusinessSignUp'>;

export type UserNavigatorParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  Profile: undefined;
};

export type HomeTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'HomeTab'>;
export type SearchTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'SearchTab'>;

export type SearchTabParamList = {
  SearchScreen: undefined;
  Details: { businessId: string };
  PostReview: { businessId: string };
  ReviewList: { businessId: string };
  BusinessLocation: { businessId: string };
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
  BusinessEditDetails: undefined;
  BusinessUpdateLocation: { businessId: string };
  BusinessLocation: { businessId: string };
};

export type BusinessHomeScreenProps = StackScreenProps<
  BusinessHomeTabParamList,
  'BusinessHomeScreen'
>;

export type BusinessEditDetailsScreenProps = StackScreenProps<
  BusinessHomeTabParamList,
  'BusinessEditDetails'
>;

export type BusinessUpdateLocationScreenProps = StackScreenProps<
  BusinessHomeTabParamList,
  'BusinessUpdateLocation'
>;

export type BusinessLocationProps = StackScreenProps<
  SearchTabParamList | BusinessHomeTabParamList,
  'BusinessLocation'
>;

export type BusinessReviewTabParamList = {
  BusinessReviewList: undefined;
};

export type ValidUrl = keyof paths;

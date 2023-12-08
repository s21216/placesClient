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
  PasswordReset: undefined;
};

export type LogInProps = StackScreenProps<RootStackParamList, 'LogIn'>;
export type UserSignUpProps = StackScreenProps<RootStackParamList, 'UserSignUp'>;
export type BusinessSignUpProps = StackScreenProps<RootStackParamList, 'BusinessSignUp'>;
export type PasswordResetProps = StackScreenProps<RootStackParamList, 'PasswordReset'>;

export type UserNavigatorParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type HomeTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'HomeTab'>;
export type SearchTabProps = BottomTabNavigationProp<UserNavigatorParamList, 'SearchTab'>;

export type SearchTabParamList = {
  Search: undefined;
  Details: { businessId: string };
  PostReview: { businessId: string };
  ReviewList: { businessId: string };
  BusinessLocation: { businessId: string };
};

export type SearchScreenProps = StackScreenProps<SearchTabParamList, 'Search'>;
export type DetailsProps = StackScreenProps<SearchTabParamList, 'Details'>;
export type PostReviewProps = StackScreenProps<SearchTabParamList, 'PostReview'>;
export type ReviewListProps = StackScreenProps<SearchTabParamList, 'ReviewList'>;

export type ProfileTabParamList = {
  Profile: undefined;
  Visited: undefined;
  Details: { businessId: string };
  Reviews: undefined;
  UpdatePassword: undefined;
};

export type ProfileProps = StackScreenProps<ProfileTabParamList, 'Profile'>;
export type VisitedProps = StackScreenProps<ProfileTabParamList, 'Visited'>;
export type UpdatePasswordProps = StackScreenProps<ProfileTabParamList, 'UpdatePassword'>;

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

export type BusinessCardNavigation = StackScreenProps<
  SearchTabParamList | BusinessReviewTabParamList
>;

export type BusinessReviewTabParamList = {
  BusinessReviewList: undefined;
  BusinessReviewReply: { reviewId: number };
};

export type BusinessReviewReplyScreenProps = StackScreenProps<
  BusinessReviewTabParamList,
  'BusinessReviewReply'
>;

export type BusinessProfileTabParamList = {
  BusinessProfile: undefined;
  UpdatePassword: undefined;
};

export type BusinessProfileScreenProps = StackScreenProps<
  BusinessProfileTabParamList,
  'BusinessProfile'
>;

export type ValidUrl = keyof paths;

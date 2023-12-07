import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

export type CheckInResponse = components['schemas']['CheckInResponse'];
type CheckInRequest = components['schemas']['CheckInRequest'];

const checkInUrl: ValidUrl = '/checkIns';
export const postCheckIn = (request: CheckInRequest) =>
  fetchClient().post<CheckInResponse>(checkInUrl, request);

export const getCheckInState = (userId: string, businessId: string) =>
  fetchClient().get<boolean>(checkInUrl, { params: { userId, businessId } });

type UserInfo = components['schemas']['UserInfo'];
const userInfoUrl: ValidUrl = '/users/{userId}';
export const getUserInfo = (userId: string) =>
  fetchClient().get<UserInfo>(userInfoUrl.replace('{userId}', userId));

type PaginatedRequest = components['schemas']['PaginatedRequest'];
type PaginatedVisitedBusiness = components['schemas']['PaginatedResponseVisitedBusiness'];
const visitedBusinessesUrl: ValidUrl = '/users/{userId}/visited';
export const getVisitedBusinesses = (userId: string, request: PaginatedRequest) =>
  fetchClient().post<PaginatedVisitedBusiness>(
    visitedBusinessesUrl.replace('{userId}', userId),
    request
  );

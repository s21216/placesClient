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

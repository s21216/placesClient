import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

export type BusinessResponse = components['schemas']['BusinessResponse'];

const searchUrl: ValidUrl = '/businesses/{businessId}';
export const getBusinessDetails = (businessId: string) =>
  fetchClient().get<BusinessResponse>(searchUrl.replace('{businessId}', businessId));

type ReviewsResponse = components['schemas']['PaginatedResponseReviewResponse'];
type ReviewsRequest = components['schemas']['PaginatedRequest'];
const reviewsUrl: ValidUrl = '/businesses/{businessId}/reviews';
export const getBusinessReviews = (businessId: string, requestBody: ReviewsRequest) =>
  fetchClient().post<ReviewsResponse>(reviewsUrl.replace('{businessId}', businessId), requestBody);

import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

export type BusinessResponse = components['schemas']['BusinessResponse'];
export type BusinessDetails = components['schemas']['BusinessDetailsResponse'];

const getBusinessUrl: ValidUrl = '/businesses/{businessId}';
export const getBusinessDetails = (businessId: string) =>
  fetchClient().get<BusinessDetails>(getBusinessUrl.replace('{businessId}', businessId));

type UpdateBusinessDetailsRequest = components['schemas']['UpdateBusinessDetailsRequest'];
const updateBusinessDetailsUrl: ValidUrl = '/businesses/details';
export const updateBusinessDetails = (request: UpdateBusinessDetailsRequest) =>
  fetchClient().put(updateBusinessDetailsUrl, request);

type Location = components['schemas']['Location'];
const getBusinessLocationUrl: ValidUrl = '/businesses/{businessId}/location';
export const getBusinessLocation = (businessId: string) =>
  fetchClient().get<Location>(getBusinessLocationUrl.replace('{businessId}', businessId));

type UpdateBusinessLocationRequest = components['schemas']['UpdateBusinessLocationRequest'];
const updateBusinessLocationUrl: ValidUrl = '/businesses/location';
export const updateBusinessLocation = (request: UpdateBusinessLocationRequest) =>
  fetchClient().put(updateBusinessLocationUrl, request);

type ReviewsResponse = components['schemas']['PaginatedResponseReviewResponse'];
type ReviewsRequest = components['schemas']['PaginatedRequest'];
const reviewsUrl: ValidUrl = '/businesses/{businessId}/reviews';
export const getBusinessReviews = (businessId: string, requestBody: ReviewsRequest) =>
  fetchClient().post<ReviewsResponse | undefined>(
    reviewsUrl.replace('{businessId}', businessId),
    requestBody
  );

type Category = components['schemas']['Category'];

const getCategoriesUrl: ValidUrl = '/categories';
export const getCategories = () => fetchClient().get<Category[]>(getCategoriesUrl);

type Attribute = components['schemas']['Attribute'];

const getAttributesUrl: ValidUrl = '/attributes';
export const getAttributes = () => fetchClient().get<Attribute[]>(getAttributesUrl);

import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

type Review = components['schemas']['ReviewResponse'];
type CreateReviewRequest = components['schemas']['CreateReviewRequest'];
const reviewUrl: ValidUrl = '/reviews';
export const postReview = (requestBody: CreateReviewRequest) =>
  fetchClient().put<Review>(reviewUrl, requestBody);

export const getReview = (userId: string, businessId: string) =>
  fetchClient().get<Review>(reviewUrl, { params: { userId, businessId } });

const deleteReviewUrl: ValidUrl = '/reviews/{reviewId}';
export const deleteReview = (reviewId: string) =>
  fetchClient().delete(deleteReviewUrl.replace('{reviewId}', reviewId));

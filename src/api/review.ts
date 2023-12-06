import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

type Review = components['schemas']['ReviewResponse'];
type CreateReviewRequest = components['schemas']['CreateReviewRequest'];
const reviewUrl: ValidUrl = '/reviews';
export const postReview = (requestBody: CreateReviewRequest) =>
  fetchClient().put<Review>(reviewUrl, requestBody);

export const getReviewByUserAndBusiness = (userId: string, businessId: string) =>
  fetchClient().get<Review>(reviewUrl, { params: { userId, businessId } });

const getReviewByIdUrl: ValidUrl = '/reviews/{reviewId}';
export const getReviewById = (reviewId: string) =>
  fetchClient().get<Review>(getReviewByIdUrl.replace('{reviewId}', reviewId));

const deleteReviewUrl: ValidUrl = '/reviews/{reviewId}';
export const deleteReview = (reviewId: string) =>
  fetchClient().delete(deleteReviewUrl.replace('{reviewId}', reviewId));

const reviewReplyUrl: ValidUrl = '/reviews/{reviewId}/reply';
export type ReviewReply = components['schemas']['ReviewReply'];
type ReviewReplyRequest = components['schemas']['ReviewReplyRequest'];
export const postReviewReply = (reviewId: string, request: ReviewReplyRequest) =>
  fetchClient().put<ReviewReply>(reviewReplyUrl.replace('{reviewId}', reviewId), request);

export const deleteReviewReply = (reviewId: string) =>
  fetchClient().delete(reviewReplyUrl.replace('{reviewId}', reviewId));

export const getReviewReply = (reviewId: string) =>
  fetchClient().get<ReviewReply>(reviewReplyUrl.replace('{reviewId}', reviewId));

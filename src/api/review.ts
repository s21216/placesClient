import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

type Review = components['schemas']['Review'];
type CreateReviewRequest = components['schemas']['CreateReviewRequest'];
const reviewUrl: ValidUrl = '/reviews';
export const postReview = (requestBody: CreateReviewRequest) =>
  fetchClient().post<Review>(reviewUrl, requestBody);

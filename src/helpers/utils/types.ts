import { components } from '../../../schema';

export enum CostEnum {
  'INEXPENSIVE' = '$',
  'MODERATE' = '$$',
  'EXPENSIVE' = '$$$',
  'VERY_EXPENSIVE' = '$$$$',
}

export type Business = components['schemas']['BusinessResponse'];

export type ReviewResults = components['schemas']['PaginatedResponseReviewResponse']['results'];

export type ReviewResult = ArrayElement<ReviewResults>;

type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

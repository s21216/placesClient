import { components } from '../../../schema';

export enum CostEnum {
  'INEXPENSIVE' = '$',
  'MODERATE' = '$$',
  'EXPENSIVE' = '$$$',
  'VERY_EXPENSIVE' = '$$$$',
}

export type Business = components['schemas']['BusinessResponse'];

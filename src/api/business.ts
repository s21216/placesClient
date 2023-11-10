import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/navigationTypes';

export type BusinessResponse = components['schemas']['BusinessResponse'];

const searchUrl: ValidUrl = '/businesses/{businessId}';
export const getBusinessDetails = (businessId: string) =>
  fetchClient().get<BusinessResponse>(searchUrl.replace('{businessId}', businessId));

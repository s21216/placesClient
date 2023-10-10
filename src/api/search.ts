import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/types';

export type SearchRequest = components['schemas']['SearchRequest'];

export type AutocompleteBody = {
  longitude: number;
  latitude: number;
  distance: number;
};

export type BusinessSearchResponse = components['schemas']['SearchResponseBusinessResponse'];

const searchUrl: ValidUrl = '/businesses/search';
export const searchForBusinesses = (searchBody: SearchRequest) =>
  fetchClient().post<BusinessSearchResponse>(searchUrl, searchBody);

const autocompleteUrl: ValidUrl = '/businesses/search/autocomplete';
export const autocompleteBusinessSearch = (autocompleteBody: AutocompleteBody) =>
  fetchClient().post(autocompleteUrl, autocompleteBody);

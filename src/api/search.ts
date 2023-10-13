import { components } from '../../schema';
import fetchClient from '../helpers/utils/fetchClient';
import { ValidUrl } from '../helpers/utils/types';

export type SearchRequest = components['schemas']['SearchRequest'];

export type BusinessSearchResponse = components['schemas']['SearchResponseBusinessResponse'];

interface SearchForBusinessesVariables {
  searchQuery: string;
  searchBody: SearchRequest;
}

const searchUrl: ValidUrl = '/businesses/search';
export const searchForBusinesses = ({ searchQuery, searchBody }: SearchForBusinessesVariables) =>
  fetchClient().post<BusinessSearchResponse>(searchUrl, searchBody, { params: { searchQuery } });

const autocompleteUrl: ValidUrl = '/businesses/search/autocomplete';
export const autocompleteBusinessSearch = (searchQuery: string) =>
  fetchClient().get<string[]>(autocompleteUrl, { params: { searchQuery } });

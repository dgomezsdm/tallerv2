import { Workshop } from './workshop.interface';

export interface Meta {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

export interface workShopAPIResponse {
  data: Workshop[];
  meta: Meta;
}

import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * A service that extends the Angular HttpClient to add the API URL
 */
export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

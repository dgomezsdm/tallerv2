import { Injectable } from '@angular/core';
import { IRequestOptions } from '../interface/irequest-options.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiServiceInterface } from '../interface/api-services.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService implements ApiServiceInterface {
  api = `${environment.APIUrl}`;
  //api = '';

  public constructor(public http: HttpClient) {}

  /**
   * GET request
   * @param {string} endPoint end point for the get
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.post<T>(this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.put<T>(this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.api + endPoint, options);
  }
}

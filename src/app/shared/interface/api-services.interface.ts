import { Observable } from 'rxjs';
import { IRequestOptions } from './irequest-options.interface';

export interface ApiServiceInterface {
  get<T>(endPoint: string, options?: IRequestOptions): Observable<T>;

  post<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<T>;

  put<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<T>;

  delete<T>(endPoint: string, options?: IRequestOptions): Observable<T>;
}

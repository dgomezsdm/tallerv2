import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service';
import { LoginLogic } from '../interfaces/login-logic.interface';
import { workShopAPIResponse } from 'src/app/shared/interface/workShop-API-response.interface';
import { SAPWorkshops } from 'src/app/shared/interface/sap-workshops.interface';
import { environment } from 'src/environments/environment';
export interface AppVersion {
  version: string;
  // Otras propiedades
}
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private readonly DEFAULT_PAGE_SIZE = 100;

  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient
  ) {}

  /**
   * Obtiene la lógica de login para un usuario y taller específico
   * @param email - Email del usuario
   * @param workshop - ID del taller
   */
  public getLoginLogic(
    email: string,
    workshop: string
  ): Observable<LoginLogic> {
    const params = new HttpParams()
      .set('email', email)
      .set('workshop', workshop);

    return this.apiService.get<LoginLogic>('WorkshopReception', { params });
  }

  /**
   * Obtiene la lista de talleres con paginación
   * @param pageSize - Tamaño de página (default: 100)
   */
  public getWorkshops(
    pageSize: number = this.DEFAULT_PAGE_SIZE
  ): Observable<workShopAPIResponse> {
    const params = new HttpParams().set('PageSize', pageSize.toString());
    return this.apiService.get<workShopAPIResponse>('WorkShops', { params });
  }

  /**
   * Obtiene la lista de talleres desde SAP
   */
  // public getSAPWorkshops(): Observable<SAPWorkshops> {
  //   return this.apiService.get<SAPWorkshops>('WorkshopReception/WorkShopList');
  // }
  public getSAPWorkshops(): Observable<SAPWorkshops[]> {
    return this.apiService.get<SAPWorkshops[]>(
      'WorkshopReception/WorkShopList'
    );
  }
  /**
   * Obtiene los tipos de documentos disponibles
   */
  public getDocumentTypes(): Observable<any> {
    const url =
      'https://workshopreception.azurewebsites.net/api/WorkshopReception/TypeOfDocuments';
    return this.http.get<any>(url);
  }

  /**
   * Obtiene la versión actual de la aplicación
   */
  public getAppVersion(): Observable<AppVersion> {
    return this.http.get<AppVersion>(
      `${environment.nestMiddleWare}/appVersion`
    );
  }

  // Método adicional si necesitas el dato de cita comentado
  /**
   * Obtiene datos de una cita específica
   * @param appointmentId - ID de la cita
   */
  public getAppointmentData(appointmentId: string): Observable<any> {
    const url = `https://workshopreception.azurewebsites.net/api/WorkshopReception/GetAppointmentData/${appointmentId}`;
    return this.http.get<any>(url);
  }
}

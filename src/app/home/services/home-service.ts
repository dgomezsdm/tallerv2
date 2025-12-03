import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api-service';
import { AppointmentPool } from '../interface/appointmentPool.interface';
import { Observable } from 'rxjs';

export interface Services {
  appointmentNumber: string | null;
  serviceNumber: string;
  serviceDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private apiService: ApiService) {}

  public getAppointmentPool(
    email: string,
    workshop: string
  ): Observable<AppointmentPool[]> {
    return this.apiService.get<AppointmentPool[]>(
      `WorkshopReception/AppointmentPool?email=${email}&workshop=${workshop}`
    );
  }

  public getAppointmentPoolByTwoDates(
    email: string,
    workshop: string,
    fec_ini: string,
    fec_fin: string
  ): Observable<AppointmentPool[]> {
    return this.apiService.get<AppointmentPool[]>(
      `WorkshopReception/DateRangeAppointment?email=${email}&workshop=${workshop}&fechainicio=${fec_ini}&fechafin=${fec_fin}`
    );
  }

  getServicesByAppointmentNumber(
    email: string,
    workshop: string,
    appointmentNumber: string
  ): Observable<Services[]> {
    return this.apiService.get<Services[]>(
      `WorkshopReception/WorkShopService?email=${email}&workshop=${workshop}&appointment=${appointmentNumber}`
    );
  }
}

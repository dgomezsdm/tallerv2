import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api-service';
import { AppointmentData } from '../interfaces/appointment-data.interface';
import { VehicleCampaigns } from '../interfaces/vehicle-campains.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {


  constructor(private apiService: ApiService) {

  }

  public getAppointmentData(appointmentNumber: string): Observable<AppointmentData> {
    return this.apiService.get<AppointmentData>(`WorkshopReception/GetAppointmentData/${appointmentNumber}`);
  }

  public getVehicleCampaigns(chasis: string): Observable<VehicleCampaigns[]> {
    return this.apiService.get<VehicleCampaigns[]>(`WorkshopReception/CampaignAndGuarantees?chassis=${chasis}`);
  }




}

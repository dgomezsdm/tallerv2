import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class RecepcionService {

  constructor(private apiService: ApiService) {}
  public getValidMileage(chassis: string, milage: number): Observable<any[]> {
    return this.apiService.get<any[]>(`WorkshopReception/MileageValidation?chassis=${chassis}&mileage=${milage}`);
  }

  public postInsideImage(imgList: any) {
    // Si es un array, enviar cada imagen individualmente
    if (Array.isArray(imgList) && imgList.length > 0) {
      const galleryData: FormData = this.buildFormDataImages(imgList);
      return this.apiService.post<any>(`General/VehiclePartInteriorImage`, galleryData);
    }
    // Si es una sola imagen, construir FormData para una sola
    const galleryData: FormData = this.buildFormDataImages([imgList]);
    return this.apiService.post<any>(`General/VehiclePartInteriorImage`, galleryData);
  }

  /**
   * Envía una sola imagen individual
   */
  public postSingleInsideImage(image: any): Observable<any> {
    const galleryData: FormData = this.buildFormDataImages([image]);
    return this.apiService.post<any>(`General/VehiclePartInteriorImage`, galleryData);
  }

  public postOutsideImage(imgList: any) {
    const galleryData: FormData = this.buildFormDataImages(
      imgList
      // 'outSideImage'
    );
    return this.apiService.post<any>(`General/VehicleOutSideImage`, galleryData);
  }

  public postSingleOutsideImage(image: any): Observable<any> {
    const galleryData: FormData = this.buildFormDataImages([image]);
    return this.apiService.post<any>(`General/VehicleOutSideImage`, galleryData);
  }

  public postHoodImage(imgList: any) {
    const galleryData: FormData = this.buildFormDataImages(
      imgList
      // 'hoodImage'
    );
    return this.apiService.post<any>(`General/VehicleHoodImage`, galleryData);
  }

  public postSingleHoodImage(image: any): Observable<any> {
    const galleryData: FormData = this.buildFormDataImages([image]);
    return this.apiService.post<any>(`General/VehicleHoodImage`, galleryData);
  }

  public postBackPartmage(imgList: any) {
    const galleryData: FormData = this.buildFormDataImages(
      imgList
      // 'backPartImage'
    );
    return this.apiService.post<any>(`General/VehicleBackPartImage`, galleryData);
  }

  public postSingleBackPartImage(image: any): Observable<any> {
    const galleryData: FormData = this.buildFormDataImages([image]);
    return this.apiService.post<any>(`General/VehicleBackPartImage`, galleryData);
  }

   //method for build the formData schema based on base64 list string
   buildFormDataImages(imgList: any): FormData {
    const galleryData: any = new FormData();
    const imageName = 'vehicleImage.jpeg';
    for (let i = 0; i < imgList.length; i++) {
      galleryData.append(`ImageFileRanges[${i}].numberOfAppointment`, imgList[i].appointmentNumber);
      galleryData.append(`ImageFileRanges[${i}].description`, imgList[i].comment);
      galleryData.append(`ImageFileRanges[${i}].data`, `data:image/png;base64,${imgList[i].image}`);
      // const imageBlob = this.dataURItoBlob(imgList[i].image);
      // const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
      // galleryData.append(
      //   `ImageFileRanges[${i}].${variable}`,
      //   imageFile
      // );
    }

    return galleryData;
  }
}


  

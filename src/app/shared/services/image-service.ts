import { Injectable } from '@angular/core';
import { CacheImgService } from './cache-image-service';
import { RecepcionService } from './reception';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private cacheImgServices: CacheImgService, private recepcionService: RecepcionService) {}

  async saveImages(
    imgList: any[],
    tableName: 'insideImages' | 'outsideImages' | 'capImages' | 'backImages'
  ): Promise<boolean> {
    if (imgList.length <= 0) {
      console.log('Debe agregar al menos una foto antes de continuar');
      return false;
    }

    try {
      // Obtener imágenes ya guardadas
      const savedImages = (await this.cacheImgServices.getImages(tableName)) || [];

      // Filtrar solo las imágenes nuevas (sin ID o que no existan en guardadas)
      const newImages = imgList.filter((img) => {
        if (!img.id) return true; // Sin ID = nueva
        return !savedImages.some((saved) => saved.id === img.id);
      });

      // Guardar solo las imágenes nuevas
      if (newImages.length > 0) {
        await this.cacheImgServices.saveImages(tableName, newImages);

        // **Mapeo de funciones según el tipo de imagen para enviar individualmente**
        const postSingleImageFunctions = {
          insideImages: this.recepcionService.postSingleInsideImage.bind(this.recepcionService),
          outsideImages: this.recepcionService.postSingleOutsideImage?.bind(this.recepcionService) || this.recepcionService.postOutsideImage.bind(this.recepcionService),
          capImages: this.recepcionService.postSingleHoodImage?.bind(this.recepcionService) || this.recepcionService.postHoodImage.bind(this.recepcionService),
          backImages: this.recepcionService.postSingleBackPartImage?.bind(this.recepcionService) || this.recepcionService.postBackPartmage.bind(this.recepcionService),
        };

        // Enviar cada imagen individualmente usando forkJoin para ejecutar en paralelo
        return new Promise((resolve, reject) => {
          console.log(`Enviando ${newImages.length} imágenes nuevas a Azure...`);
          
          const uploadObservables: Observable<any>[] = newImages.map((image) => 
            postSingleImageFunctions[tableName](image)
          );

          forkJoin(uploadObservables).subscribe({
            next: (results) => {
              console.log(`Todas las imágenes se enviaron correctamente:`, results);
              resolve(true);
            },
            error: (err) => {
              console.error('Error al subir una o más fotos', err);
              // Aún así resolvemos como true si algunas se subieron, o false si todas fallaron
              reject(false);
            },
          });
        });
      } else {
        console.log('No hay imágenes nuevas para guardar ni enviar.');
        return false;
      }
    } catch (error) {
      console.error('Error en el guardado de imágenes', error);
      return false;
    }
  }
}
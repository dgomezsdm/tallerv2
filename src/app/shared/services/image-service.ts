import { Injectable } from '@angular/core';
import { CacheImgService } from './cache-image-service';
import { ReceptionService } from './reception';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private cacheImgServices: CacheImgService,
    private receptionService: ReceptionService
  ) {}

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
      const savedImages =
        (await this.cacheImgServices.getImages(tableName)) || [];

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
          insideImages: this.receptionService.postSingleInsideImage.bind(
            this.receptionService
          ),
          outsideImages:
            this.receptionService.postSingleOutsideImage?.bind(
              this.receptionService
            ) ||
            this.receptionService.postOutsideImage.bind(this.receptionService),
          capImages:
            this.receptionService.postSingleHoodImage?.bind(
              this.receptionService
            ) ||
            this.receptionService.postHoodImage.bind(this.receptionService),
          backImages:
            this.receptionService.postSingleBackPartImage?.bind(
              this.receptionService
            ) ||
            this.receptionService.postBackPartImage.bind(this.receptionService),
        };

        // Enviar cada imagen individualmente usando forkJoin para ejecutar en paralelo
        return new Promise((resolve, reject) => {
          console.log(
            `Enviando ${newImages.length} imágenes nuevas a Azure...`
          );

          const uploadObservables: Observable<any>[] = newImages.map((image) =>
            postSingleImageFunctions[tableName](image)
          );

          forkJoin(uploadObservables).subscribe({
            next: (results) => {
              console.log(
                `Todas las imágenes se enviaron correctamente:`,
                results
              );
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

  /**
   * The `compressImage` function in TypeScript asynchronously compresses an image provided as base64
   * data to a specified maximum width and height with a given quality, returning the compressed image as
   * base64 data.
   * @param {string} imageData - The `imageData` parameter in the `compressImage` function is a base64
   * encoded string representing the image data that you want to compress. This string typically starts
   * with `"data:image/jpeg;base64,"` followed by the actual base64 encoded image data.
   * @param {number} [maxWidth=1200] - The `maxWidth` parameter in the `compressImage` function specifies
   * the maximum width that the image should be resized to during compression. If the original image
   * width is greater than this value, the function will resize the image while maintaining the aspect
   * ratio to ensure that the width does not exceed the specified `
   * @param {number} [maxHeight=1200] - The `maxHeight` parameter in the `compressImage` function
   * represents the maximum height that the image will be resized to during the compression process. If
   * the original image height is greater than this value, the function will proportionally resize the
   * image to ensure that the height does not exceed the specified `max
   * @param {number} [quality=0.75] - The `quality` parameter in the `compressImage` function determines
   * the quality of the compressed image. It is a number between 0 and 1, where 0 is the lowest quality
   * and 1 is the highest quality. In the function provided, the default value for `quality` is set
   * @returns The `compressImage` function returns a Promise that resolves to a compressed image as a
   * base64 encoded string.
   */
  async compressImage(
    imageData: string,
    maxWidth: number = 1200,
    maxHeight: number = 1200,
    quality: number = 0.75
  ): Promise<string> {
    const image = new Image();
    image.src = 'data:image/jpeg;base64,' + imageData;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('No se pudo obtener el contexto del canvas');
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    context.drawImage(image, 0, 0, width, height);

    const compressed = canvas.toDataURL('image/jpeg', quality).split(',')[1];

    const originalSize = imageData.length;
    const compressedSize = compressed.length;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(
      `🖼️ Redimensionado: ${image.width}x${image.height} → ${width}x${height}`
    );
    console.log(`📊 Compresión: ${reduction}% de reducción`);

    return compressed;
  }
}

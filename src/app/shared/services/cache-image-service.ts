import { Injectable } from '@angular/core';
import Dexie from 'dexie';

// Define la estructura base de los objetos que se guardarán en las tablas
interface ImageCacheItem {
  id?: number; // Clave primaria autoincremental
  image: string; // La imagen (generalmente en Base64 o URL)
  comment: string;
  appointmentNumber: string; // El campo clave para consultas
}

// Union Type para asegurar que solo se usan nombres de tabla válidos
export type TableName =
  | 'insideImages'
  | 'outsideImages'
  | 'capImages'
  | 'backImages';

@Injectable({
  providedIn: 'root',
})
export class CacheImgService extends Dexie {
  // Declaración de las tablas
  insideImages: Dexie.Table<ImageCacheItem, number>;
  outsideImages: Dexie.Table<ImageCacheItem, number>;
  capImages: Dexie.Table<ImageCacheItem, number>;
  backImages: Dexie.Table<ImageCacheItem, number>;

  constructor() {
    // 1. Inicializa la base de datos con el nombre 'CacheImgService'
    super('CacheImgService');

    // 2. Define la estructura y los índices de las tablas
    // Se añade 'appointmentNumber' al índice (separado por comas) para permitir búsquedas rápidas.
    this.version(1).stores({
      insideImages: '++id, appointmentNumber, image, comment',
      outsideImages: '++id, appointmentNumber, image, comment',
      capImages: '++id, appointmentNumber, image, comment',
      backImages: '++id, appointmentNumber, image, comment',
    });

    // 3. Inicializa las referencias a las tablas
    this.insideImages = this.table('insideImages');
    this.outsideImages = this.table('outsideImages');
    this.capImages = this.table('capImages');
    this.backImages = this.table('backImages');
  }

  // -------------------------------------------------------------------
  // MÉTODOS GENÉRICOS DE ACCIÓN (Creación, Lectura, Eliminación)
  // -------------------------------------------------------------------

  /**
   * Guarda múltiples imágenes en una tabla específica.
   * Utiliza bulkAdd para inserciones eficientes.
   */
  async saveImages(
    tableName: TableName,
    imagesData: Omit<ImageCacheItem, 'id'>[] // Omitimos 'id' porque es autogenerado
  ): Promise<void> {
    console.log(`Saving ${imagesData.length} images to ${tableName}`);
    await this.table(tableName).bulkAdd(imagesData);
  }

  /**
   * Obtiene TODAS las imágenes de una tabla.
   */
  async getImages(tableName: TableName): Promise<ImageCacheItem[]> {
    return this.table(tableName).toArray();
  }

  /**
   * Elimina una imagen específica por su ID de una tabla.
   */
  async deleteImage(tableName: TableName, id: number): Promise<void> {
    await this.table(tableName).delete(id);
    console.log(`Deleted image with ID ${id} from ${tableName}`);
  }

  // -------------------------------------------------------------------
  // MÉTODOS OPTIMIZADOS POR CITA (appointmentNumber)
  // -------------------------------------------------------------------

  /**
   * Obtiene todas las imágenes asociadas a un número de cita específico.
   * Usa la consulta .where('appointmentNumber').equals() gracias al nuevo índice.
   */
  async getImagesByAppointment(
    tableName: TableName,
    appointmentNumber: string
  ): Promise<ImageCacheItem[]> {
    console.log(
      `Fetching images for appointment: ${appointmentNumber} in ${tableName}`
    );
    return this.table(tableName)
      .where('appointmentNumber')
      .equals(appointmentNumber)
      .toArray();
  }

  /**
   * Elimina todas las imágenes de una tabla asociadas a un número de cita.
   * Retorna la cantidad de elementos eliminados.
   */
  async clearImagesByAppointment(
    tableName: TableName,
    appointmentNumber: string
  ): Promise<number> {
    const deletedCount = await this.table(tableName)
      .where('appointmentNumber')
      .equals(appointmentNumber)
      .delete();

    console.log(
      `Cleared ${deletedCount} images for appointment ${appointmentNumber} from ${tableName}`
    );
    return deletedCount;
  }

  // -------------------------------------------------------------------
  // MÉTODOS DE LIMPIEZA TOTAL
  // -------------------------------------------------------------------

  /**
   * Elimina TODOS los datos de una tabla específica.
   */
  async clearTable(tableName: TableName): Promise<void> {
    await this.table(tableName).clear();
    console.log(`Cleared all data from ${tableName}`);
  }

  /**
   * Elimina TODOS los datos de TODAS las tablas en una sola transacción.
   * Esto garantiza la integridad de los datos y un mejor rendimiento.
   */
  async clearAllTables(): Promise<void> {
    // Se inicia una transacción 'rw' (read/write) incluyendo todas las tablas.
    await this.transaction(
      'rw',
      this.insideImages,
      this.outsideImages,
      this.capImages,
      this.backImages,
      async () => {
        await this.insideImages.clear();
        await this.outsideImages.clear();
        await this.capImages.clear();
        await this.backImages.clear();
        console.log('All tables cleared successfully within a transaction.');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonFooter,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SharedButtonComponent } from 'src/app/shared/components/shared-button/shared-button.component';
import { IonButton } from '@ionic/angular/standalone';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { CacheImgService } from 'src/app/shared/services/cache-image-service';
import { ImageService } from 'src/app/shared/services/image-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inside-images',
  templateUrl: './inside-images.page.html',
  styleUrls: ['./inside-images.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonTitle,
    CommonModule,
    FormsModule,
    SharedButtonComponent,
    IonCard,
    IonIcon,
    IonButton,
  ],
})
export class InsideImagesPage implements OnInit {
  imgList: Array<{ id?: number; image: string; comment: string; appointmentNumber: string }> = [];
  appointmentNumber = '';
  readonly maxImages = 6;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private cacheImgServices: CacheImgService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const navState = this.router.getCurrentNavigation()?.extras?.state;
    this.appointmentNumber =
      navState?.['appointmentNumber'] ||
      this.route.snapshot.queryParamMap.get('appointmentNumber') ||
      '';

    this.loadFromCache();
  }

  private async loadFromCache() {
    const dataImages =
      this.appointmentNumber
        ? await this.cacheImgServices.getImagesByAppointment(
            'insideImages',
            this.appointmentNumber
          )
        : await this.cacheImgServices.getImages('insideImages');

    if (dataImages?.length) {
      this.imgList = dataImages;
    }
  }

  private isWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
  }

  async takePicture() {
    if (this.imgList.length >= this.maxImages) {
      this.presentAlert(`No puedes subir más de ${this.maxImages} fotos.`);
      return;
    }

    try {
      // En web algunos navegadores bloquean CameraSource.Prompt; forzamos Photos y, si falla, usamos input file
      const photo = await Camera.getPhoto({
        quality: 80,
        source: this.isWeb() ? CameraSource.Photos : CameraSource.Prompt,
        promptLabelPhoto: 'Abrir galería',
        promptLabelPicture: 'Tomar fotografía',
        promptLabelHeader: 'Seleccionar fotografía',
        allowEditing: false,
        width: 800,
        resultType: CameraResultType.Base64,
      });

      if (!photo.base64String) {
        throw new Error('No se pudo obtener la imagen.');
      }

      this.imgList.push({
        image: photo.base64String,
        comment: 'N/A',
        appointmentNumber: this.appointmentNumber,
      });
    } catch (error: any) {
      // Fallback en web con input file nativo
      if (this.isWeb()) {
        const picked = await this.pickFromFile();
        if (picked) return;
      }
      if (error?.message?.includes('User cancelled')) {
        return;
      }
      console.error('Error al tomar foto', error);
      this.presentAlert('No se pudo tomar la foto. Inténtalo de nuevo.');
    }
  }

  async onRemove(image: { id?: number }) {
    this.imgList = this.imgList.filter((img) => img !== image);
    if (image.id) {
      await this.cacheImgServices.deleteImage('insideImages', image.id);
    }
  }

  async saveImages() {
    const loading = await this.loadingController.create({
      message: 'Enviando información, favor de esperar...',
      backdropDismiss: false,
    });
    await loading.present();

    try {
      const success = await this.imageService.saveImages(
        this.imgList,
        'insideImages'
      );

      if (success) {
        this.presentAlert('Fotos guardadas correctamente.');
      } else {
        this.presentAlert('Error al subir las fotos.');
      }
    } finally {
      loading.dismiss();
    }
  }

  async customAlert(image: any) {
    const imageIndex = this.imgList.indexOf(image);
    if (imageIndex < 0) return;

    const alert = await this.alertController.create({
      header: 'Comentarios',
      message: `Agrega un comentario a la foto #${imageIndex + 1}`,
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Comentario (250 caracteres máx)',
          name: 'comment',
          value: `${this.imgList[imageIndex].comment || ''}`,
          attributes: {
            maxlength: 250,
          },
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'OK',
          role: 'confirm',
          handler: (res) => {
            this.imgList[imageIndex].comment = res.comment ?? 'N/A';
          },
        },
      ],
    });

    await alert.present();
  }

  private async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  /**
   * Fallback para web: abre input file y retorna true si se agregó imagen
   */
  private pickFromFile(): Promise<boolean> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) {
          resolve(false);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string)?.split(',')[1];
          if (base64) {
            this.imgList.push({
              image: base64,
              comment: 'N/A',
              appointmentNumber: this.appointmentNumber,
            });
            resolve(true);
          } else {
            resolve(false);
          }
        };
        reader.onerror = () => resolve(false);
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }
}

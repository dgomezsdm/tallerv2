// // import { Injectable } from '@angular/core';
// // import { AlertController, ToastController } from '@ionic/angular';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AlertService {
// //   constructor(
// //     private alertCtrl: AlertController,
// //     private toastCtrl: ToastController
// //   ) {}

// //   // =================================================
// //   // ===================   TOASTS   ===================
// //   // =================================================

// //   async toastSuccess(message: string) {
// //     return this.showToast(message, 'success', 'checkmark-circle');
// //   }

// //   async toastError(message: string) {
// //     return this.showToast(message, 'danger', 'close-circle');
// //   }

// //   async toastWarning(message: string) {
// //     return this.showToast(message, 'warning', 'alert-circle');
// //   }

// //   async toastInfo(message: string) {
// //     return this.showToast(message, 'primary', 'information-circle');
// //   }

// //   private async showToast(message: string, color: string, icon: string) {
// //     const toast = await this.toastCtrl.create({
// //       message: `<ion-icon name="${icon}"></ion-icon> ${message}`,
// //       duration: 2500,
// //       position: 'bottom',
// //       color,
// //       cssClass: 'mustard-toast',
// //       mode: 'md',
// //     });

// //     await toast.present();
// //   }

// //   // =================================================
// //   // ==================   ALERTAS   ==================
// //   // =================================================

// //   async success(message: string) {
// //     return this.showAlert('Éxito', message, 'success');
// //   }

// //   async error(message: string) {
// //     return this.showAlert('Error', message, 'danger');
// //   }

// //   async warning(message: string) {
// //     return this.showAlert('Advertencia', message, 'warning');
// //   }

// //   async info(message: string) {
// //     return this.showAlert('Información', message, 'primary');
// //   }

// //   private async showAlert(title: string, message: string, color: string) {
// //     const alert = await this.alertCtrl.create({
// //       header: title, // ← TEXTO NORMAL
// //       message: message, // ← TEXTO NORMAL
// //       cssClass: `mustard-alert`,
// //       buttons: [
// //         {
// //           text: 'OK',
// //           cssClass: 'mustard-btn',
// //         },
// //       ],
// //       mode: 'md',
// //     });

// //     await alert.present();
// //   }

// //   // =================================================
// //   // ==================   CONFIRM   ==================
// //   // =================================================

// //   async confirm(message: string): Promise<boolean> {
// //     return new Promise(async (resolve) => {
// //       const alert = await this.alertCtrl.create({
// //         header: 'Confirmación', // ← TEXTO
// //         message: message, // ← TEXTO
// //         cssClass: 'mustard-alert',
// //         buttons: [
// //           {
// //             text: 'Cancelar',
// //             role: 'cancel',
// //             cssClass: 'mustard-btn-cancel',
// //             handler: () => resolve(false),
// //           },
// //           {
// //             text: 'Aceptar',
// //             cssClass: 'mustard-btn',
// //             handler: () => resolve(true),
// //           },
// //         ],
// //         mode: 'md',
// //       });

// //       await alert.present();
// //     });
// //   }
// // }

// import { Injectable } from '@angular/core';
// import {
//   AlertController,
//   ToastController,
//   LoadingController,
// } from '@ionic/angular';
// import { Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AlertService {
//   constructor(
//     private alertCtrl: AlertController,
//     private toastCtrl: ToastController,
//     private loadingCtrl: LoadingController,
//     private router: Router
//   ) {}

//   // =================================================
//   // ===================   TOASTS   ==================
//   // =================================================

//   async toastSuccess(message: string) {
//     return this.showToast(message, 'success', 'checkmark-circle');
//   }

//   async toastError(message: string) {
//     return this.showToast(message, 'danger', 'close-circle');
//   }

//   async toastWarning(message: string) {
//     return this.showToast(message, 'warning', 'alert-circle');
//   }

//   async toastInfo(message: string) {
//     return this.showToast(message, 'primary', 'information-circle');
//   }

//   private async showToast(message: string, color: string, icon: string) {
//     const toast = await this.toastCtrl.create({
//       message: `<ion-icon name="${icon}"></ion-icon> ${message}`,
//       duration: 2500,
//       position: 'bottom',
//       color,
//       cssClass: 'mustard-toast',
//       mode: 'md',
//     });

//     await toast.present();
//   }

//   // =================================================
//   // ====================   ALERTS   ==================
//   // =================================================

//   async success(message: string) {
//     return this.showAlert('Éxito', message, 'success');
//   }

//   async error(message: string) {
//     return this.showAlert('Error', message, 'danger');
//   }

//   async warning(message: string) {
//     return this.showAlert('Advertencia', message, 'warning');
//   }

//   async info(message: string) {
//     return this.showAlert('Información', message, 'primary');
//   }

//   private async showAlert(title: string, message: string, color: string) {
//     const alert = await this.alertCtrl.create({
//       header: title,
//       message,
//       cssClass: `mustard-alert ${color}`,
//       buttons: [{ text: 'OK', cssClass: 'mustard-btn' }],
//       mode: 'md',
//     });

//     await alert.present();
//   }

//   // =================================================
//   // ===================   CONFIRM   ==================
//   // =================================================

//   async confirm(message: string): Promise<boolean> {
//     return new Promise(async (resolve) => {
//       const alert = await this.alertCtrl.create({
//         header: 'Confirmación',
//         message,
//         cssClass: 'mustard-alert',
//         buttons: [
//           {
//             text: 'Cancelar',
//             role: 'cancel',
//             cssClass: 'mustard-btn-cancel',
//             handler: () => resolve(false),
//           },
//           {
//             text: 'Aceptar',
//             cssClass: 'mustard-btn',
//             handler: () => resolve(true),
//           },
//         ],
//         mode: 'md',
//       });

//       await alert.present();
//     });
//   }

//   // =================================================
//   // =============   CONFIRM CON CALLBACK   ===========
//   // =================================================

//   async confirmAction(
//     message: string,
//     onAccept: () => void,
//     onCancel?: () => void
//   ) {
//     const alert = await this.alertCtrl.create({
//       header: 'Confirmación',
//       message,
//       cssClass: 'mustard-alert',
//       buttons: [
//         {
//           text: 'Cancelar',
//           role: 'cancel',
//           cssClass: 'mustard-btn-cancel',
//           handler: () => onCancel?.(),
//         },
//         {
//           text: 'Aceptar',
//           cssClass: 'mustard-btn',
//           handler: () => onAccept(),
//         },
//       ],
//       mode: 'md',
//     });

//     await alert.present();
//   }

//   // =================================================
//   // ======================  PROMPT  ==================
//   // =================================================

//   async prompt(
//     title: string,
//     message: string,
//     placeholder: string
//   ): Promise<string | null> {
//     return new Promise(async (resolve) => {
//       const alert = await this.alertCtrl.create({
//         header: title,
//         message,
//         inputs: [{ name: 'value', type: 'text', placeholder }],
//         buttons: [
//           { text: 'Cancelar', role: 'cancel', handler: () => resolve(null) },
//           { text: 'Aceptar', handler: (data) => resolve(data.value) },
//         ],
//         mode: 'md',
//       });

//       await alert.present();
//     });
//   }

//   // =================================================
//   // ===============  CONFIRM DANGER  =================
//   // =================================================

//   async confirmDanger(message: string): Promise<boolean> {
//     return new Promise(async (resolve) => {
//       const alert = await this.alertCtrl.create({
//         header: 'Acción peligrosa',
//         message,
//         cssClass: 'mustard-alert-danger',
//         buttons: [
//           {
//             text: 'Cancelar',
//             role: 'cancel',
//             cssClass: 'mustard-btn-cancel',
//             handler: () => resolve(false),
//           },
//           {
//             text: 'Eliminar',
//             cssClass: 'mustard-btn-danger',
//             handler: () => resolve(true),
//           },
//         ],
//         mode: 'md',
//       });

//       await alert.present();
//     });
//   }

//   // =================================================
//   // ==================== AUTO CLOSE ==================
//   // =================================================

//   async autoClose(message: string, duration = 2000) {
//     const alert = await this.alertCtrl.create({
//       message,
//       cssClass: 'mustard-alert',
//       buttons: [],
//       backdropDismiss: false,
//       mode: 'md',
//     });

//     await alert.present();

//     setTimeout(() => alert.dismiss(), duration);
//   }

//   // =================================================
//   // ====================== LOADING ===================
//   // =================================================

//   async showLoading(message: string = 'Cargando...') {
//     const loading = await this.loadingCtrl.create({
//       message,
//       spinner: 'crescent',
//       cssClass: 'mustard-loading',
//     });

//     await loading.present();
//     return loading;
//   }

//   async hideLoading(loader: HTMLIonLoadingElement) {
//     await loader.dismiss();
//   }

//   // =================================================
//   // =====================  NAV ALERT =================
//   // =================================================

//   async confirmNavigate(message: string, route: string) {
//     const alert = await this.alertCtrl.create({
//       header: 'Navegación',
//       message,
//       cssClass: 'mustard-alert',
//       buttons: [
//         {
//           text: 'Cancelar',
//           role: 'cancel',
//           cssClass: 'mustard-btn-cancel',
//         },
//         {
//           text: 'Ir',
//           cssClass: 'mustard-btn',
//           handler: () => this.router.navigate([route]),
//         },
//       ],
//       mode: 'md',
//     });

//     await alert.present();
//   }
// }

import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  // =================================================
  // ===================   TOASTS   ==================
  // =================================================

  async toastSuccess(message: string) {
    return this.showToast(message, 'success', 'checkmark-circle');
  }

  async toastError(message: string) {
    return this.showToast(message, 'danger', 'close-circle');
  }

  async toastWarning(message: string) {
    return this.showToast(message, 'warning', 'alert-circle');
  }

  async toastInfo(message: string) {
    return this.showToast(message, 'primary', 'information-circle');
  }

  private async showToast(message: string, color: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
      icon,
      cssClass: 'mustard-toast',
      mode: 'md',
    });

    await toast.present();
  }

  // =================================================
  // ====================   ALERTS   ==================
  // =================================================

  async success(message: string) {
    return this.showAlert('Éxito', message, 'success');
  }

  async error(message: string) {
    return this.showAlert('Error', message, 'danger');
  }

  async warning(message: string) {
    return this.showAlert('Advertencia', message, 'warning');
  }

  async info(message: string) {
    return this.showAlert('Información', message, 'primary');
  }

  private async showAlert(title: string, message: string, color: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      cssClass: `mustard-alert ${color}`,
      buttons: [{ text: 'OK', cssClass: 'mustard-btn' }],
      mode: 'md',
    });

    await alert.present();
  }

  // =================================================
  // ===================   CONFIRM   ==================
  // =================================================

  async confirm(message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Confirmación',
        message,
        cssClass: 'mustard-alert',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'mustard-btn-cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Aceptar',
            cssClass: 'mustard-btn',
            handler: () => resolve(true),
          },
        ],
        mode: 'md',
      });

      await alert.present();
    });
  }

  // =================================================
  // =============  CONFIRM CON CALLBACK   ============
  // =================================================

  async confirmAction(
    message: string,
    onAccept: () => void,
    onCancel?: () => void
  ) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message,
      cssClass: 'mustard-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'mustard-btn-cancel',
          handler: () => onCancel?.(),
        },
        {
          text: 'Aceptar',
          cssClass: 'mustard-btn',
          handler: () => onAccept(),
        },
      ],
      mode: 'md',
    });

    await alert.present();
  }

  // =================================================
  // ======================  PROMPT  ==================
  // =================================================

  async prompt(
    title: string,
    message: string,
    placeholder: string
  ): Promise<string | null> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        inputs: [{ name: 'value', type: 'text', placeholder }],
        buttons: [
          { text: 'Cancelar', role: 'cancel', handler: () => resolve(null) },
          { text: 'Aceptar', handler: (data) => resolve(data.value) },
        ],
        mode: 'md',
      });

      await alert.present();
    });
  }

  // =================================================
  // ===============  CONFIRM DANGER  =================
  // =================================================

  async confirmDanger(message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Acción peligrosa',
        message,
        cssClass: 'mustard-alert-danger',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'mustard-btn-cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Eliminar',
            cssClass: 'mustard-btn-danger',
            handler: () => resolve(true),
          },
        ],
        mode: 'md',
      });

      await alert.present();
    });
  }

  // =================================================
  // ==================== AUTO CLOSE ==================
  // =================================================

  async autoClose(message: string, duration = 2000) {
    const alert = await this.alertCtrl.create({
      message,
      cssClass: 'mustard-alert',
      buttons: [],
      backdropDismiss: false,
      mode: 'md',
    });

    await alert.present();
    setTimeout(() => alert.dismiss(), duration);
  }

  // =================================================
  // ====================== LOADING ===================
  // =================================================

  async showLoading(message: string = 'Cargando...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      cssClass: 'mustard-loading',
    });

    await loading.present();
    return loading;
  }

  async hideLoading(loader: HTMLIonLoadingElement) {
    await loader.dismiss();
  }

  // =================================================
  // =====================  NAV ALERT =================
  // =================================================

  async confirmNavigate(message: string, route: string) {
    const alert = await this.alertCtrl.create({
      header: 'Navegación',
      message,
      cssClass: 'mustard-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'mustard-btn-cancel',
        },
        {
          text: 'Ir',
          cssClass: 'mustard-btn',
          handler: () => this.router.navigate([route]),
        },
      ],
      mode: 'md',
    });

    await alert.present();
  }
}

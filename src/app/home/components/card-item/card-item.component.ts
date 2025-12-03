// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardSubtitle,
//   IonCardContent,
//   IonButton,
//   IonIcon,
// } from '@ionic/angular/standalone';

// import { addIcons } from 'ionicons';
// import {
//   chevronForward,
//   timeOutline,
//   calendarOutline,
//   callOutline,
//   carOutline,
//   hammerOutline,
// } from 'ionicons/icons';

// // =============================
// //   INTERFACE PARA EL JSON
// // =============================
// export interface Appointment {
//   numberOfAppointment: string;
//   clientCode: string;
//   clientNames: string;
//   clientSurnames: string;
//   clientPhone: string;
//   chassis: string;
//   brandCode: string;
//   brandDescription: string;
//   modelCode: string;
//   modelDescription: string;
//   email: string;
//   vehicleYear: string;
//   date: string;
//   type: string;
//   typeDescription: string;
//   feeling: any;
//   crane: boolean;
//   home: boolean;
//   isEmergency: boolean;
//   hour: string;
// }

// @Component({
//   selector: 'app-card-item',
//   templateUrl: './card-item.component.html',
//   styleUrls: ['./card-item.component.scss'],
//   standalone: true,
//   imports: [CommonModule, IonCard, IonCardContent, IonIcon],
// })
// export class CardItemComponent {
//   @Input() appointment!: Appointment;

//   @Output() itemClick = new EventEmitter<Appointment>();

//   constructor() {
//     addIcons({
//       chevronForward,
//       timeOutline,
//       calendarOutline,
//       callOutline,
//       carOutline,
//       hammerOutline,
//     });
//   }

//   onCardClick() {
//     this.itemClick.emit(this.appointment);
//   }
// }
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { time, person, car, call } from 'ionicons/icons';
import { AppointmentPool } from '../../interface/appointmentPool.interface';

@Component({
  selector: 'app-card-item',
  standalone: true,
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  imports: [CommonModule, IonCard, IonCardContent, IonIcon],
})
export class CardItemComponent {
  @Input() appointment!: AppointmentPool; // ✅ Cambiar a AppointmentPool
  @Output() itemClick = new EventEmitter<AppointmentPool>();

  constructor() {
    addIcons({ time, person, car, call });
  }

  onCardClick() {
    this.itemClick.emit(this.appointment);
  }

  // ✅ Getter para manejar ambos formatos de hora
  get appointmentHour(): string {
    return this.appointment.hora || this.appointment.hour || '';
  }
}

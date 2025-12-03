// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonButton,
//   IonIcon,
//   IonGrid,
//   IonRow,
//   IonCol,
// } from '@ionic/angular/standalone';
// import { addIcons } from 'ionicons';
// import { add, notifications, search } from 'ionicons/icons';

// // Importar componentes personalizados

// import {
//   Appointment,
//   CardItemComponent,
// } from './components/card-item/card-item.component';

// import { AlertService } from '../shared/services/alert';
// import { DateFilterComponent } from './components/date-filter/date-filter.component';
// import { SearchBarComponent } from './components/search-bar/search-bar.component';
// import { EmptyStateComponent } from './components/empty-state/empty-state.component';
// import { SkeletonCardComponent } from '../shared/components/skeleton-card/skeleton-card.component';
// import { AppointmentPool } from './interface/appointmentPool.interface';
// import { HomeService } from './services/home-service';

// // Importar servicio

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonButtons,
//     IonMenuButton,
//     IonGrid,
//     IonRow,
//     IonCol,
//     CardItemComponent,
//     DateFilterComponent,
//     SearchBarComponent,
//     EmptyStateComponent,
//     SkeletonCardComponent,
//   ],
// })
// export class HomePage implements OnInit {
//   appointments: AppointmentPool[] = [];

//   loading = false;

//   email = 'gferrando@sdm.com.do';
//   workshop = 'zv02';

//   constructor(
//     private alertServices: AlertService,
//     private appointmentService: HomeService
//   ) {
//     addIcons({ add, notifications, search });
//   }

//   ngOnInit() {
//     this.loadAppointments();
//   }

//   loadAppointments() {
//     this.loading = true;

//     this.appointmentService
//       .getAppointmentPool(this.email, this.workshop)
//       .subscribe({
//         next: (res) => {
//           console.log('Respuesta del servidor:', res);

//           // Filtrar appointments vacíos
//           this.appointments = res.filter((ap) => {
//             const isEmpty = this.isEmptyAppointment(ap);
//             console.log('¿Es vacío?', isEmpty, ap);
//             return !isEmpty;
//           });

//           console.log('Appointments filtrados:', this.appointments);
//           this.loading = false;
//         },
//         error: () => {
//           this.loading = false;
//         },
//       });
//   }

//   isEmptyAppointment(ap: any): boolean {
//     if (!ap) return true;

//     // Verificar campos críticos específicos
//     const hasValidData =
//       ap.clientNames && ap.clientSurnames && ap.date && ap.hour;

//     // Si no tiene datos válidos, es una cita vacía
//     if (!hasValidData) {
//       return true;
//     }

//     // Verificar si todos los valores son null/vacío/undefined
//     const allEmpty = Object.values(ap).every(
//       (v) => v === null || v === '' || v === undefined
//     );

//     return allEmpty;
//   }

//   onSearch(term: string) {
//     console.log('Buscando:', term);
//     // Tu lógica de búsqueda aquí
//   }

//   onClearSearch() {
//     console.log('Búsqueda limpiada');
//   }

//   filteredAppointments: Appointment[] = this.appointments;

//   onRangeSelected(range: { start: string; end: string }) {
//     // ✅ ACTIVAR LOADING
//     this.loading = true;

//     // Convertir las fechas al formato YYYYMMDD
//     const fec_ini = this.formatDateToYYYYMMDD(range.start);
//     const fec_fin = this.formatDateToYYYYMMDD(range.end);

//     console.log('Fecha inicio:', fec_ini);
//     console.log('Fecha fin:', fec_fin);

//     // Llamar al servicio
//     this.appointmentService
//       .getAppointmentPoolByTwoDates(this.email, this.workshop, fec_ini, fec_fin)
//       .subscribe({
//         next: (res) => {
//           console.log('Citas filtradas:', res);
//           // ✅ FILTRAR Y ASIGNAR
//           this.appointments = res.filter((ap) => !this.isEmptyAppointment(ap));
//           this.loading = false;
//         },
//         error: (error) => {
//           console.error('Error al obtener citas:', error);
//           this.loading = false;
//         },
//       });
//   }
//   private formatDateToYYYYMMDD(dateString: string): string {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');

//     return `${year}${month}${day}`;
//   }

//   openAppointment(ap: Appointment) {
//     console.log('Clicked:', ap);
//   }

//   onItemClick(item: any) {
//     console.log('Item clicked:', item);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, notifications, search } from 'ionicons/icons';

import { CardItemComponent } from './components/card-item/card-item.component';

import { AlertService } from '../shared/services/alert';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SkeletonCardComponent } from '../shared/components/skeleton-card/skeleton-card.component';
import { AppointmentPool } from './interface/appointmentPool.interface';
import { HomeService } from './services/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    CardItemComponent,
    DateFilterComponent,
    SearchBarComponent,
    EmptyStateComponent,
    SkeletonCardComponent,
  ],
})
export class HomePage implements OnInit {
  appointments: AppointmentPool[] = [];
  loading = false;

  email = 'gferrando@sdm.com.do';
  workshop = 'zv02';

  constructor(
    private alertServices: AlertService,
    private appointmentService: HomeService
  ) {
    addIcons({ add, notifications, search });
  }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;

    this.appointmentService
      .getAppointmentPool(this.email, this.workshop)
      .subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res);
          this.appointments = res.filter((ap) => !this.isEmptyAppointment(ap));
          console.log('Appointments filtrados:', this.appointments);
          this.loading = false;
        },
        error: () => {
          this.appointments = [];
          this.loading = false;
        },
      });
  }

  isEmptyAppointment(ap: any): boolean {
    if (!ap) return true;

    // ✅ Verificar numberOfAppointment (campo principal)
    const hasAppointmentNumber =
      ap.numberOfAppointment && ap.numberOfAppointment.trim() !== '';

    if (!hasAppointmentNumber) return true;

    // ✅ Verificar que tenga datos básicos del cliente
    const hasClientData =
      (ap.clientNames && ap.clientNames.trim() !== '') ||
      (ap.clientSurnames && ap.clientSurnames.trim() !== '');

    if (!hasClientData) return true;

    // ✅ Verificar fecha y hora (manejar ambos formatos: hour y hora)
    const hasDateTime = ap.date && (ap.hour || ap.hora);

    return !hasDateTime;
  }

  onRangeSelected(range: { start: string; end: string }) {
    this.loading = true;

    const fec_ini = this.formatDateToYYYYMMDD(range.start);
    const fec_fin = this.formatDateToYYYYMMDD(range.end);

    console.log('Fecha inicio:', fec_ini);
    console.log('Fecha fin:', fec_fin);

    this.appointmentService
      .getAppointmentPoolByTwoDates(this.email, this.workshop, fec_ini, fec_fin)
      .subscribe({
        next: (res) => {
          console.log('Respuesta cruda del servidor:', res);
          console.log('Total de registros:', res.length);

          // Filtrar citas vacías
          this.appointments = res.filter((ap) => {
            const isEmpty = this.isEmptyAppointment(ap);
            if (!isEmpty) {
              console.log('✅ Cita válida:', {
                numero: ap.numberOfAppointment,
                cliente: `${ap.clientNames} ${ap.clientSurnames}`,
                fecha: ap.date,
                hora: ap.hora || ap.hour,
              });
            } else {
              console.log('❌ Cita rechazada:', ap);
            }
            return !isEmpty;
          });

          console.log('Total de citas válidas:', this.appointments.length);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener citas:', error);
          this.appointments = [];
          this.loading = false;
        },
      });
  }

  private formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  }

  onSearch(term: string) {
    console.log('Buscando:', term);
    if (!term.trim()) {
      this.loadAppointments();
      return;
    }

    // Filtrar localmente
    const searchLower = term.toLowerCase();
    this.appointments = this.appointments.filter(
      (ap) =>
        ap.clientNames?.toLowerCase().includes(searchLower) ||
        ap.clientSurnames?.toLowerCase().includes(searchLower) ||
        ap.numberOfAppointment?.includes(term) ||
        ap.chassis?.includes(term)
    );
  }

  onClearSearch() {
    console.log('Búsqueda limpiada');
    this.loadAppointments();
  }

  openAppointment(ap: AppointmentPool) {
    console.log('Clicked:', ap);
  }
}

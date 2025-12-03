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

// Importar componentes personalizados

import {
  Appointment,
  CardItemComponent,
} from './components/card-item/card-item.component';

import { AlertService } from '../shared/services/alert';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SkeletonCardComponent } from '../shared/components/skeleton-card/skeleton-card.component';
import { AppointmentPool } from './interface/appointmentPool.interface';
import { HomeService } from './services/home-service';

// Importar servicio

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

    const email = 'gferrando@sdm.com.do';
    const workshop = 'zv02';

    this.appointmentService.getAppointmentPool(email, workshop).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);

        // Filtrar appointments vacíos
        this.appointments = res.filter((ap) => {
          const isEmpty = this.isEmptyAppointment(ap);
          console.log('¿Es vacío?', isEmpty, ap);
          return !isEmpty;
        });

        console.log('Appointments filtrados:', this.appointments);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  isEmptyAppointment(ap: any): boolean {
    if (!ap) return true;

    // Verificar campos críticos específicos
    const hasValidData =
      ap.clientNames && ap.clientSurnames && ap.date && ap.hour;

    // Si no tiene datos válidos, es una cita vacía
    if (!hasValidData) {
      return true;
    }

    // Verificar si todos los valores son null/vacío/undefined
    const allEmpty = Object.values(ap).every(
      (v) => v === null || v === '' || v === undefined
    );

    return allEmpty;
  }

  onRangeSelected(range: { start: string; end: string }) {
    this.loading = true;

    this.appointmentService
      .getAppointmentPoolByTwoDates(
        'ledelossantos@sdm.com.do',
        'zl02',
        range.start,
        range.end
      )
      .subscribe({
        next: (res) => {
          console.log('Respuesta por rango:', res);
          this.appointments = res.filter((ap) => !this.isEmptyAppointment(ap));
          console.log('Appointments filtrados:', this.appointments);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  onSearch(term: string) {
    console.log('Buscando:', term);
    // Tu lógica de búsqueda aquí
  }

  onClearSearch() {
    console.log('Búsqueda limpiada');
  }

  filteredAppointments: Appointment[] = this.appointments;

  onDateRangeSelected(range: { start: string; end: string }) {
    const start = new Date(range.start);
    const end = new Date(range.end);

    this.filteredAppointments = this.appointments.filter((ap) => {
      const d = new Date(ap.date);
      return d >= start && d <= end;
    });
  }

  openAppointment(ap: Appointment) {
    console.log('Clicked:', ap);
  }

  onItemClick(item: any) {
    console.log('Item clicked:', item);
  }
}

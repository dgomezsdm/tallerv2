import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedButtonComponent } from '../shared/components/shared-button/shared-button.component';

import { ActivatedRoute } from '@angular/router';
import { CheckInService } from './services/check-in-service';
import { AppointmentData } from './interfaces/appointment-data.interface';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  host: { class: 'ion-page' },
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedButtonComponent
  ],
})
export class CheckInPage implements OnInit {
  cita: AppointmentData | null = null;
  writedChassis: string = '';
  verificateChassis: boolean = false;
  canStart: boolean = true; // Se fija en true para el mockup
  home: boolean = false;
  crane: boolean = false;
  isEmergency: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const appointmentNumber = params['appointmentNumber'];
      if (appointmentNumber) {
        this.loadAppointmentData(appointmentNumber);
      } else {
        console.warn('No appointmentNumber provided');
        this.canStart = false;
        // Handle case properly - maybe go back or show empty state?
        // For now, we just don't load mock data.
      }
    });
  }

  loadAppointmentData(appointmentNumber: string) {
    this.checkInService.getAppointmentData(appointmentNumber).subscribe({
      next: (data) => {
        this.cita = data;
        this.initForm(data);
        console.log('Cita loaded:', data);
        console.log('Cita loaded:', this.cita);
      },
      error: (err) => {
        console.error('Error loading appointment:', err);
        // Handle error handling
      },
    });
  }

  // Inicializa los toggles con los valores de la cita
  initForm(ap: AppointmentData): void {
    this.writedChassis = ap.chassis;
    this.home = ap.home;
    this.crane = ap.crane;
    this.isEmergency = ap.isEmergency;
    this.verificateChassis = true; // Simula que el chasis ya está validado o debería validarse?
    // Assuming if data comes from backend, it's valid? 
    // Or do we still need to validate? The mockup said "Simula que el chasis ya está validado"
    // We'll keep it as true for now if loaded successfully.
  }

  // Los siguientes métodos permanecen como stubs de la lógica real
  hasChassis(chassis: string): void {
    this.verificateChassis = true;
    this.canStart = true;
    console.log(`Chassis validado (Mock): ${chassis}`);
  }

  presentAlert(): void {
    console.log('Alerta de cerrar/cancelar presentada (Mock).');
  }

  openModal(): void {
    console.log('Abriendo modal de campañas (Mock)');
  }

  openMantModal(): void {
    console.log('Abriendo modal de mantenimientos (Mock)');
  }

  next(): void {
    console.log('Iniciando recepción (Mock)...');
  }
}

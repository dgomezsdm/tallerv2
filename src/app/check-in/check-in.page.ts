import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonIcon,
  IonBadge,
  IonList,
  IonItem,
  IonButtons,
  IonInput,
  IonSkeletonText,
  IonToggle,
} from '@ionic/angular/standalone';
import { AppointmentPool } from '../home/interface/appointmentPool.interface';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonItem,
    IonList,
    IonBadge,
    IonIcon,
    IonCard,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonSkeletonText,
    IonToggle,
  ],
})
export class CheckInPage implements OnInit {
  cita: any | null = null;
  writedChassis: string = '';
  verificateChassis: boolean = false;
  canStart: boolean = true; // Se fija en true para el mockup
  home: boolean = false;
  crane: boolean = false;
  isEmergency: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Datos fijos simulados para la maqueta
    const mockCita: any = {
      numberOfAppointment: '000120411181',
      clientNames: 'MILTON',
      clientSurnames: 'RAFAEL',
      chassis: 'MA3JC74W9S0194045',
      typeDescription: 'Chequeo',
      crane: false,
      home: true, // Cambiado a true para mostrar el toggle activo
      isEmergency: false,
      services: [
        {
          serviceNumber: '001',
          serviceDescription: 'Diagnóstico general de motor',
        },
        {
          serviceNumber: '002',
          serviceDescription: 'Cambio de aceite y filtro',
        },
        {
          serviceNumber: '003',
          serviceDescription: 'Rotación y balanceo de neumáticos',
        },
        { serviceNumber: '004', serviceDescription: 'Inspección de frenos' },
      ],
      vehicleCampaigns: [1, 2], // Dos campañas activas simuladas
    };

    // Simular carga de datos para mostrar skeleton
    setTimeout(() => {
      this.cita = mockCita;
      this.initForm(mockCita);
      console.log('Maqueta de Cita cargada con datos fijos.');
    }, 2000);
  }

  // Inicializa los toggles con los valores de la cita
  initForm(ap: AppointmentPool): void {
    this.writedChassis = ap.chassis;
    this.home = ap.home;
    this.crane = ap.crane;
    this.isEmergency = ap.isEmergency;
    this.verificateChassis = true; // Simula que el chasis ya está validado
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent, ModalController } from '@ionic/angular';
import { SharedButtonComponent } from '../shared/components/shared-button/shared-button.component';

import { ActivatedRoute, Router } from '@angular/router';
import { CheckInService } from './services/check-in-service';
import { AppointmentData } from './interfaces/appointment-data.interface';
import { CampaignsModalComponent } from './modals/campaigns-modal/campaigns-modal.component';
import { AlertService } from '../shared/services/alert';
import { LoggerService } from '../shared/services/logger.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  host: { class: 'ion-page' },
  imports: [CommonModule, FormsModule, IonicModule, SharedButtonComponent],
})
export class CheckInPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  cita: AppointmentData | null = null;
  writedChassis: string = '';
  verificateChassis: boolean = false;
  canStart: boolean = true; // Se fija en true para el mockup
  home: boolean = false;
  crane: boolean = false;
  isEmergency: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly checkInService: CheckInService,
    private readonly modalCtrl: ModalController,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const appointmentNumber = params['appointmentNumber'];
      if (appointmentNumber) {
        this.loadAppointmentData(appointmentNumber);
      } else {
        this.logger.warn('No appointmentNumber provided');
        this.alertService.toastWarning('No se proporcionó un número de cita');
        this.canStart = false;
      }
    });
  }

  loadAppointmentData(appointmentNumber: string) {
    this.checkInService.getAppointmentData(appointmentNumber).subscribe({
      next: (data: any) => {
        // Use setTimeout to avoid 'offsetHeight' error during rapid DOM changes
        setTimeout(() => {
          const citaData = data?.[0] || null;
          this.cita = citaData;

          if (this.cita) {
            this.initForm(this.cita);

            // Load campaigns to update the badge
            if (this.cita.Chassis) {
              this.checkInService
                .getVehicleCampaigns(this.cita.Chassis)
                .subscribe({
                  next: (campaigns) => {
                    if (this.cita) {
                      this.cita.VehicleCampaigns = campaigns;
                      this.logger.debug('Campaigns loaded for badge', campaigns);
                    }
                  },
                  error: (err) => {
                    this.logger.error('Error loading campaigns for badge', err);
                  },
                });
            }

            // Marcar chasis validado cuando llega la data
            this.hasChassis(this.cita.Chassis);
          } else {
            this.logger.warn('No appointment data found for number', appointmentNumber);
            this.alertService.toastWarning('No se encontraron datos para esta cita');
            this.canStart = false;
          }

          this.logger.debug('Cita loaded', this.cita);
          // Optional: force resize if needed, though setTimeout usually suffices
          // this.content?.resize();
        }, 0);
      },
      error: (err) => {
        this.logger.error('Error loading appointment', err);
        this.alertService.error('No se pudo cargar la información de la cita. Por favor, intenta nuevamente.');
        this.canStart = false;
      },
    });
  }

  // Inicializa los toggles con los valores de la cita
  initForm(ap: AppointmentData): void {
    this.writedChassis = ap.Chassis;
    this.home = ap.Home;
    this.crane = ap.Crane;
    this.isEmergency = ap.IsEmergency;
    this.verificateChassis = true; // Simula que el chasis ya está validado o debería validarse?
    // Assuming if data comes from backend, it's valid?
    // Or do we still need to validate? The mockup said "Simula que el chasis ya está validado"
    // We'll keep it as true for now if loaded successfully.
  }

  hasChassis(chassis: string): void {
    this.verificateChassis = true;
    this.canStart = true;
    this.logger.debug('Chassis validado', chassis);
  }

  presentAlert(): void {
    this.logger.debug('Alerta de cerrar/cancelar presentada');
  }

  async openModal(): Promise<void> {
    this.logger.debug('Abriendo modal de campañas');
    if (!this.cita) return;

    const modal = await this.modalCtrl.create({
      component: CampaignsModalComponent,
      componentProps: {
        vehicleData: this.cita,
      },
    });
    await modal.present();
  }

  openMantModal(): void {
    this.logger.debug('Abriendo modal de mantenimientos');
  }

  next(): void {
    this.logger.debug('Iniciando recepción');

    this.router.navigate(['/app/check-in/vehicle-interior'], {
      state: {
        serviceType: this.cita?.TypeDescription,
        isWalkin: false,
        appointmentNumber: this.cita?.NumberOfAppointment,
        vehicleData: this.cita,
      },
    });
  }
}

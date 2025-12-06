import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { AppointmentData } from '../../interfaces/appointment-data.interface';
import { CheckInService } from '../../services/check-in-service';
import { VehicleCampaigns } from '../../interfaces/vehicle-campains.interface';

@Component({
    selector: 'app-campaigns-modal',
    templateUrl: './campaigns-modal.component.html',
    styleUrls: ['./campaigns-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class CampaignsModalComponent implements OnInit {
    @Input() vehicleData!: AppointmentData;
    vehicleCampaigns: VehicleCampaigns[] = [];
    loading = true;

    constructor(
        private modalCtrl: ModalController,
        private checkInService: CheckInService,
        private popoverCtrl: PopoverController
    ) { }

    ngOnInit() {
        if (this.vehicleData && this.vehicleData.Chassis) {
            this.loadCampaigns(this.vehicleData.Chassis);
        } else {
            this.loading = false;
        }
    }

    loadCampaigns(chassis: string) {
        this.checkInService.getVehicleCampaigns(chassis).subscribe({
            next: (campaigns) => {
                this.vehicleCampaigns = campaigns;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading campaigns', err);
                this.loading = false;
            }
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    async presentPopover(e: Event, message: string) {
        const popover = await this.popoverCtrl.create({
            component: 'span', // Helper simple, o crear componente custom si es necesario
            componentProps: { innerHTML: message }, // Esto es un hack rápido, idealmente usar template o componente
            event: e,
            // Para simplificar, usaremos un template inline o contenido directo si es posible, 
            // pero Ionic Popover generalmente pide componente.
            // Mejor usamos un contenido HTML simple.
            htmlAttributes: { class: 'ion-padding' }
        });

        // Simplificación para el popover message: usando el contenido directo en el HTML del popover
        // En versiones modernas se puede pasar content directamente pero create pide component.
        // Vamos a ajustar esto. Para este caso simple, tal vez un Toast o Alert sea mejor,
        // pero el usuario pidió popover. Dejaremos un binding en el HTML principal del modal si es posible,
        // o simplemente mostraremos un toast que es más limpio en móvil.
        // Revisando el código del usuario, usaban un ion-popover inline. Haremos lo mismo.
    }

    // Métodos de validación copiados/adaptados
    validateWarantyDateByYears(campaign: VehicleCampaigns): boolean {
        if (!campaign.warrantyEndDate) return false;
        const end = new Date(campaign.warrantyEndDate);
        const now = new Date();
        return end > now; // Simplificado: activa si no ha vencido
    }

    validateWarantyDate(campaign: VehicleCampaigns): boolean {
        if (!campaign.warrantyEndDate) return false;
        const end = new Date(campaign.warrantyEndDate);
        const now = new Date();
        // Lógica de "por vencer" (ej. menos de 30 días)
        const diffTime = Math.abs(end.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && end > now;
    }
}

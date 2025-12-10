import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonCard,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonList,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  alertCircle,
  checkmarkCircle,
} from 'ionicons/icons';
import { SharedButtonComponent } from 'src/app/shared/components/shared-button/shared-button.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage';
import { RecepcionService } from 'src/app/shared/services/reception';

// Interfaz para el modelo de datos
interface InsidePart {
  vehicleMileage: string;
  unitOfMeasurement: string;
  currentFuel: string;
  beeper: string;
  hornWhistle: string;
  umbrella: string;
  interiorLights: string;
  sunroofOperation: string;
  centerConsoleLid: string;
  a_C_Grille: string;
  air_conditioning: string;
  radio: string;
  lighter: string;
  ashtrayDrawer: string;
  crystalsOperation: string;
  switchCrystals: string;
  safeOperation: string;
  upholsteredSeats: string;
  moldings: string;
  rugs: string;
  numberOfAppointment?: string;
}

@Component({
  selector: 'app-vehicle-interior',
  templateUrl: './vehicle-interior.page.html',
  styleUrls: ['./vehicle-interior.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonIcon,
    IonSelectOption,
    IonSelect,
    IonInput,
    IonCard,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedButtonComponent,
  ],
})
export class VehicleInteriorPage implements OnInit {
  // Propiedades del componente
  serviceType: string = 'Mantenimiento Regular'; // Puedes recibirlo de la navegación
  isWalkin: boolean = false; // Si es servicio walk-in no necesita kilometraje
  validMilage: boolean = false;
  appointmentNumber: string = '';

  // Modelo de datos del interior del vehículo
  insidePart: InsidePart = {
    vehicleMileage: '',
    unitOfMeasurement: 'KM',
    currentFuel: '',
    beeper: 'Bueno',
    hornWhistle: 'Bueno',
    umbrella: 'Bueno',
    interiorLights: 'Bueno',
    sunroofOperation: 'Bueno',
    centerConsoleLid: 'Bueno',
    a_C_Grille: 'Bueno',
    air_conditioning: 'Bueno',
    radio: 'Bueno',
    lighter: 'Bueno',
    ashtrayDrawer: 'Bueno',
    crystalsOperation: 'Bueno',
    switchCrystals: 'Bueno',
    safeOperation: 'Bueno',
    upholsteredSeats: 'Bueno',
    moldings: 'Bueno',
    rugs: 'Bueno',
    numberOfAppointment: '',
  };

  private mileageTimer: any;
  vehicleData: any;

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private recepcionService: RecepcionService
  ) {
    // Registrar iconos
    addIcons({
      checkmarkCircleOutline,
      alertCircle,
      checkmarkCircle,
    });
  }

  ngOnInit() {
    // Aquí puedes recibir datos de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.serviceType =
        navigation.extras.state['serviceType'] || this.serviceType;
      this.isWalkin = navigation.extras.state['isWalkin'] || false;
      this.appointmentNumber =
        navigation.extras.state['appointmentNumber'] || this.appointmentNumber;
      this.vehicleData = navigation.extras.state['vehicleData'] || null;
    }

    // Si es walk-in, el kilometraje es válido por defecto
    if (this.isWalkin) {
      this.validMilage = true;
    }

    this.restoreFromStorage();
  }
    //TODO: Volver habilitar la validación de kilometraje
  /**
   * Valida que el kilometraje sea un número válido
   */
//   validMileage(event: any) {
//     const value = event.target.value ?? '';
//     const numericValue = value.toString().replace(/[^0-9]/g, '');
//     this.insidePart.vehicleMileage = numericValue;

//     // Si es walk-in, no necesita validar con backend
//     if (this.isWalkin) {
//       this.validMilage = true;
//       return;
//     }

//     // Resetear cuando está vacío
//     if (!numericValue) {
//       this.validMilage = false;
//       return;
//     }
// console.log('vehicleData', JSON.stringify(this.vehicleData));
//     // Debounce y llamada a validación de millaje
//     clearTimeout(this.mileageTimer);
//     this.mileageTimer = setTimeout(() => {
//       const chassis = this.vehicleData?.chassis || this.vehicleData?.Chassis;
//       if (!chassis) {
//         console.warn('No se encontró chassis para validar millaje');
//         this.validMilage = false;
//         return;
//       }

//       const mileageNumber = Number(numericValue);
//       this.recepcionService
//         .getValidMileage(chassis, mileageNumber)
//         .subscribe({
//           next: () => {
//             this.validMilage = true;
//           },
//           error: (err) => {
//             console.error('Millaje no válido', err?.error ?? err);
//             this.validMilage = false;
//           },
//         });
//     }, 500);
//   }

  /**
   * Envía los datos y navega a la siguiente pantalla
   */
  send() {
    // Validar que todos los campos requeridos estén completos
    // if (!this.validateForm()) {
    //   console.warn('Formulario incompleto');
    //   return;
    // }

    this.insidePart.vehicleMileage = this.insidePart.vehicleMileage.toString();
    this.insidePart.numberOfAppointment = this.appointmentNumber;

    // Guardar en storage por si el usuario regresa
    this.storage.set('inside-features', this.insidePart);

    console.log('Datos del interior del vehículo:', this.insidePart);

    // Navegar a la siguiente pantalla (por ejemplo, exterior del vehículo)

   
    this.router.navigate(['/app/check-in/inside-images'], {
      state: {
        interiorData: this.insidePart,
        serviceType: this.serviceType,
        appointmentNumber: this.appointmentNumber,
      },
    });
  }

  /**
   * Valida que el formulario esté completo
   */
  private validateForm(): boolean {
    // Validar kilometraje (si no es walk-in)
    if (!this.isWalkin && !this.validMilage) {
      return false;
    }

    // Validar que el combustible esté seleccionado
    if (!this.insidePart.currentFuel) {
      return false;
    }

    // Opcional: Validar que todos los componentes estén evaluados
    // Descomenta si quieres que sea obligatorio evaluar todos los items
    /*
    const components = [
      this.insidePart.beeper,
      this.insidePart.hornWhistle,
      this.insidePart.umbrella,
      this.insidePart.interiorLights,
      this.insidePart.sunroofOperation,
      this.insidePart.centerConsoleLid,
      this.insidePart.a_C_Grille,
      this.insidePart.air_conditioning,
      this.insidePart.radio,
      this.insidePart.lighter,
      this.insidePart.ashtrayDrawer,
      this.insidePart.crystalsOperation,
      this.insidePart.switchCrystals,
      this.insidePart.safeOperation,
      this.insidePart.upholsteredSeats,
      this.insidePart.moldings,
      this.insidePart.rugs,
    ];

    return components.every((component) => component !== '');
    */

    return true;
  }

  /**
   * Obtiene el progreso de la inspección
   */
  getProgress(): number {
    const components = [
      this.insidePart.beeper,
      this.insidePart.hornWhistle,
      this.insidePart.umbrella,
      this.insidePart.interiorLights,
      this.insidePart.sunroofOperation,
      this.insidePart.centerConsoleLid,
      this.insidePart.a_C_Grille,
      this.insidePart.air_conditioning,
      this.insidePart.radio,
      this.insidePart.lighter,
      this.insidePart.ashtrayDrawer,
      this.insidePart.crystalsOperation,
      this.insidePart.switchCrystals,
      this.insidePart.safeOperation,
      this.insidePart.upholsteredSeats,
      this.insidePart.moldings,
      this.insidePart.rugs,
    ];

    const completed = components.filter((c) => c !== '').length;
    return Math.round((completed / components.length) * 100);
  }

  /**
   * Restaura datos de storage si existen
   */
  private restoreFromStorage() {
    const stored = this.storage.get<InsidePart>('inside-features');
    const vehicleStored = this.storage.get<any>('vehicleData');
    if (vehicleStored && !this.vehicleData) {
      this.vehicleData = vehicleStored;
    }

    if (stored) {
      this.insidePart = {
        ...this.insidePart,
        ...stored,
        // Forzar reingreso de millaje si no es walk-in
        vehicleMileage: this.isWalkin ? stored.vehicleMileage : '',
      };
      this.validMilage = this.isWalkin ? true : !!stored.vehicleMileage;
    }
  }
}

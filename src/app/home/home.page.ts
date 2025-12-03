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
import { HeaderComponent } from './components/header/header.component';
import {
  Appointment,
  CardItemComponent,
} from './components/card-item/card-item.component';
import { HomeService } from './services/home';
import { AlertService } from '../shared/services/alert';

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
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    HeaderComponent,
    CardItemComponent,
  ],
})
export class HomePage implements OnInit {
  items: any[] = [];

  appointments: Appointment[] = [
    {
      numberOfAppointment: '000120410848',
      clientCode: '1400043266',
      clientNames: 'NATHALIE',
      clientSurnames: 'JOMAR',
      clientPhone: '829-312-5860',
      chassis: 'MA3JC74W0S0210245',
      brandCode: '03',
      brandDescription: 'SUZUKI',
      modelCode: '6N11BHH00019600',
      email: 'njhp.02@gmail.com',
      modelDescription: 'JIMNY 5DR GLX 4WD',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '12',
      //versionDescription: null,
      vehicleYear: '2025',
      date: '2025-12-03',
      type: '0006',
      typeDescription: 'Chequeo y Mantenimiento',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '08:00:00',
    },
    {
      numberOfAppointment: '000120410975',
      clientCode: '0000281007',
      clientNames: 'KAROLIN',
      clientSurnames: 'ELIZABETH',
      clientPhone: '809-851-3926',
      chassis: 'TSMYD21S2LM800316',
      brandCode: '03',
      brandDescription: 'SUZUKI',
      modelCode: 'PK131XFAFDSDO',
      email: 'KAROLIN.OVALLES@GMAIL.COM',
      modelDescription: 'VITARA 2WD GL+ 1.6',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '09',
      //versionDescription: null,
      vehicleYear: '2020',
      date: '2025-12-03',
      type: 'MANT',
      typeDescription: 'Mantenimiento',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '08:30:00',
    },
    {
      numberOfAppointment: '000120411029',
      clientCode: '0000400176',
      clientNames: 'AUTO REP. RODRIGUEZ MONTILLA SRL',
      clientSurnames: '',
      clientPhone: '809-880-6980',
      chassis: 'JS3JB74V5T5100780',
      brandCode: '03',
      brandDescription: 'SUZUKI',
      modelCode: '6GG1BHH00AX96',
      email: 'auxdealer@grupomontilla.com',
      modelDescription: 'JIMNY GLX 4WD',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '12',
      //versionDescription: null,
      vehicleYear: '2026',
      date: '2025-12-03',
      type: '0008',
      typeDescription: 'Chequeo',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '09:00:00',
    },
    {
      numberOfAppointment: '000130272898',
      clientCode: '0000235598',
      clientNames: 'CONSTRUCTORA HERRERA (COHESA) SRL',
      clientSurnames: '',
      clientPhone: '809-534-8634',
      chassis: '3GCUY9EL7NG201737',
      brandCode: '02',
      brandDescription: 'CHEVROLET',
      modelCode: 'CK18543-G',
      email: 'cohesa.kaoma@gmail.com',
      modelDescription: 'SILVERADO HIGH COUNTRY',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '25',
      //versionDescription: null,
      vehicleYear: '2022',
      date: '2025-12-03',
      type: '0008',
      typeDescription: 'Chequeo',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '09:30:00',
    },
    {
      numberOfAppointment: '000130273105',
      clientCode: '0000242385',
      clientNames: 'ARSENIO',
      clientSurnames: 'RADAMES',
      clientPhone: '809-910-0156',
      chassis: '1GNSK8KT1PR246836',
      brandCode: '02',
      brandDescription: 'CHEVROLET',
      modelCode: 'CK10706-L',
      email: 'NO@HOTMAIL.COM',
      modelDescription: 'TAHOE HC DIESEL 4X4',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '25',
      //versionDescription: null,
      vehicleYear: '2023',
      date: '2025-12-03',
      type: '0009',
      typeDescription: 'Mantenimiento regular',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '10:00:00',
    },
    {
      numberOfAppointment: '000120411075',
      clientCode: '0000285608',
      clientNames: 'DALVI',
      clientSurnames: 'RAMON',
      clientPhone: '829-761-6994',
      chassis: '3N6CD33BXZK440441',
      brandCode: '01',
      brandDescription: 'NISSAN',
      modelCode: 'CVLNLWLD23IYP-----',
      email: 'noellluberes7@gmail.com',
      modelDescription: 'FRONTIER LE 4X4 2CAB',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '12',
      //versionDescription: null,
      vehicleYear: '2022',
      date: '2025-12-03',
      type: '0006',
      typeDescription: 'Chequeo y Mantenimiento',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '10:30:00',
    },
    {
      numberOfAppointment: '000120410815',
      clientCode: '0000205807',
      clientNames: 'SEGURIDAD Y GARANTIA, SAS',
      clientSurnames: '',
      clientPhone: '809-547-1912',
      chassis: '3N6CD33B0ZK475313',
      brandCode: '01',
      brandDescription: 'NISSAN',
      modelCode: 'CVLNLEYD23FYP-J---',
      email: 'lisbeth.aybar@segasa.com.do',
      modelDescription: 'FRONTIER S 4X4 2CAB MT',
      //lineCode: null,
      //lineDescription: null,
      //versionCode: '18',
      //versionDescription: null,
      vehicleYear: '2025',
      date: '2025-12-03',
      type: '0006',
      typeDescription: 'Chequeo y Mantenimiento',
      feeling: null,
      crane: false,
      home: false,
      isEmergency: false,
      hour: '11:00:00',
    },
  ];

  openAppointment(ap: Appointment) {
    console.log('Clicked:', ap);
  }

  constructor(
    private homeService: HomeService,
    private alertServices: AlertService
  ) {
    addIcons({ add, notifications, search });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.items = this.homeService.getItems();
  }

  onItemClick(item: any) {
    console.log('Item clicked:', item);
  }
}

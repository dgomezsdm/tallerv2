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
import { CardItemComponent } from './components/card-item/card-item.component';
import { HomeService } from './services/home';

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

  constructor(private homeService: HomeService) {
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

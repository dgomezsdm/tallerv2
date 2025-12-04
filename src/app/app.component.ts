import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  hammerOutline,
  chevronForward,
  callOutline,
  carOutline,
  timeOutline,
  searchOutline,
  homeOutline,
  calendarOutline,
  homeSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  personOutline,
  personSharp,
  settingsOutline,
  settingsSharp,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    // RouterLink,
    // RouterLinkActive,
    IonApp,
    // IonSplitPane,
    // IonMenu,
    // IonContent,
    // IonList,
    // IonListHeader,
    // IonNote,
    // IonMenuToggle,
    // IonItem,
    // IonIcon,
    // IonLabel,
    // IonRouterLink,
    // IonRouterOutlet,
    RouterOutlet,
  ],
})
export class AppComponent {
  // Páginas principales
  // public appPages = [
  //   { title: 'Home', url: '/home', icon: 'home' },
  //   { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  // ];

  // // Sección de configuración
  // public settingsPages = [
  //   { title: 'Profile', url: '/profile', icon: 'person' },
  //   { title: 'Settings', url: '/settings', icon: 'settings' },
  // ];

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({
      hammerOutline,
      chevronForward,
      callOutline,
      carOutline,
      timeOutline,
      searchOutline,
      homeOutline,
      calendarOutline,
      homeSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      personOutline,
      personSharp,
      settingsOutline,
      settingsSharp,
    });
  }
}

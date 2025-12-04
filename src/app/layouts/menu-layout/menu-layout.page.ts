import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
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
} from 'ionicons/icons';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.page.html',
  styleUrls: ['./menu-layout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
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
  ],
})
export class MenuLayoutPage implements OnInit {
  public appPages = [
    { title: 'Home', url: '/app/home', icon: 'home' }, // ✅ Corregido
    { title: 'Inbox', url: '/app/folder/inbox', icon: 'mail' }, // ✅ Corregido
    { title: 'Outbox', url: '/app/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/app/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/app/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/app/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/app/folder/spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({
      homeOutline,
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
    });
  }

  ngOnInit() {}
}

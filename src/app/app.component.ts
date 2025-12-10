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
  carSportSharp,
  checkmarkCircle,
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
  closeOutline,
  notifications,
  buildOutline,
  informationCircle,
  personCircleOutline,
  informationCircleSharp,
  cloudUploadOutline,
  imagesOutline,
  close
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [

    IonApp,

    RouterOutlet,
  ],
})
export class AppComponent {


  constructor() {
    addIcons({
      imagesOutline,
      cloudUploadOutline,
      carSportSharp,
      informationCircleSharp,
      personCircleOutline,
      checkmarkCircle,
      informationCircle,
      closeOutline,
      notifications,
      buildOutline,
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
      close
    });
  }
}

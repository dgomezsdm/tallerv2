import { Component } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent],
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss'],
})
export class SkeletonCardComponent {}

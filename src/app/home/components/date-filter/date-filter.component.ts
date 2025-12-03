import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonButton,
  IonIcon,
  IonModal,
  IonDatetime,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

import { chevronDown } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-filter',
  standalone: true,
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonModal,
    IonDatetime,
    IonToolbar,
    IonTitle,
    FormsModule,
  ],
})
export class DateFilterComponent {
  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();
  @ViewChild('modal') modal!: IonModal;

  openFromParent() {
    this.showSheet = true;
  }

  closeFromParent() {
    this.showSheet = false;
  }
  showSheet = false;
  startDate: string = '';
  endDate: string = '';

  constructor() {
    addIcons({ chevronDown });
  }

  openSheet() {
    this.showSheet = true;
  }

  closeSheet() {
    this.showSheet = false;
  }

  apply() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      if (end < start) {
        console.error('La fecha final debe ser posterior a la inicial');
        return;
      }

      this.rangeSelected.emit({
        start: this.startDate,
        end: this.endDate,
      });
      this.closeSheet();
    }
  }
}

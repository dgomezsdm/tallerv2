import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonSearchbar, IonIcon, IonSpinner } from '@ionic/angular/standalone';

import { search, close } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [IonSpinner, CommonModule, FormsModule, IonSearchbar],
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() debounce: number = 300;
  @Output() searchChange = new EventEmitter<string>();
  @Output() searchClear = new EventEmitter<void>();

  searchTerm: string = '';
  isLoading = false;

  constructor() {
    addIcons({ search, close });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.searchChange.emit(this.searchTerm);

    this.isLoading = true;

    setTimeout(() => {
      // tu lógica de filtro/búsqueda aquí
      this.isLoading = false;
    }, 900); // simula de
  }

  onClear() {
    this.searchTerm = '';
    this.searchClear.emit();
  }
}

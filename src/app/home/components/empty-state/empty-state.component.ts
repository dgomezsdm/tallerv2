import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  imports: [CommonModule, IonButton, IonIcon],
})
export class EmptyStateComponent {
  @Input() icon: string = 'alert-circle-outline';
  @Input() title: string = 'Sin resultados';
  @Input() message: string = '';
  @Input() actionText?: string;

  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}

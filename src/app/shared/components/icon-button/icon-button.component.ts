import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() icon: string = 'funnel-outline';
  @Output() onClick = new EventEmitter<void>();
}

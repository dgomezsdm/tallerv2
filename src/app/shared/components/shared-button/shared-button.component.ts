import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonSpinner } from '@ionic/angular/standalone';

@Component({
    selector: 'app-shared-button',
    templateUrl: './shared-button.component.html',
    styleUrls: ['./shared-button.component.scss'],
    standalone: true,
    imports: [CommonModule, IonButton, IonSpinner]
})
export class SharedButtonComponent {
    @Input() label: string = 'Button';
    @Input() disabled: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() loading: boolean = false;
    @Input() expand: 'block' | 'full' = 'block';
    @Input() color: string = 'tertiary';

    @Output() onClick = new EventEmitter<void>();

    handleClick() {
        if (!this.disabled && !this.loading) {
            this.onClick.emit();
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {

    team = [
        {
            role: 'Frontend Developer',
            name: 'Dayern Gomez',
            initials: 'DG',
            description: 'Encargado de la interfaz de usuario y experiencia móvil.'
        },
        {
            role: 'Frontend Developer',
            name: 'Kevin Feliz',
            initials: 'KF',
            description: 'Implementación de diseño y componentes visuales.'
        },
        {
            role: 'Backend Developer',
            name: 'Brayat Stwart',
            initials: 'BS',
            description: 'Lógica de negocio y APIs.'
        },
        {
            role: 'Backend Developer',
            name: 'Keven Correo',
            initials: 'KC',
            description: 'Base de datos y seguridad.'
        },
        {
            role: 'Consultor SAP',
            name: 'Manuel Ogando',
            initials: 'MO',
            description: 'Integración con sistemas ERP.'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}

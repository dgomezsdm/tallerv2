import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  hammerOutline,
  mailOutline,
  businessOutline,
  logInOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  email = '';
  selectedWorkshop: any = null;

  workshops = [
    { id: 1, name: 'Taller Central' },
    { id: 2, name: 'Taller Este' },
    { id: 3, name: 'Taller Norte' },
  ];

  constructor(private router: Router) {
    // Registrar iconos
    addIcons({
      hammerOutline,
      mailOutline,
      businessOutline,
      logInOutline,
      shieldCheckmarkOutline,
    });

    console.log('✅ LoginPage cargado');
  }

  ngOnInit() {
    console.log('✅ LoginPage inicializado');
  }

  onLogin() {
    console.log('🔑 Intento de login:', {
      email: this.email,
      workshop: this.selectedWorkshop,
    });

    if (!this.email || !this.selectedWorkshop) {
      console.warn('⚠️ Faltan datos para iniciar sesión');
      return;
    }

    // Aquí puedes agregar validación adicional
    if (!this.isValidEmail(this.email)) {
      console.error('❌ Email inválido');
      // Podrías mostrar un toast de error aquí
      return;
    }

    console.log('➡️ Navegando a /app/home');
    this.router.navigate(['/app/home']);
  }

  // Validación simple de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

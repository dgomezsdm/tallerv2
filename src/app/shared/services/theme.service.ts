import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    // Asegurar que siempre esté en modo claro
    this.ensureLightMode();
  }

  /**
   * Asegura que la aplicación siempre esté en modo claro
   */
  private ensureLightMode(): void {
    const body = document.body;
    body.classList.remove('dark');
  }
}

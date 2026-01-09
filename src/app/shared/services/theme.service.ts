import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'app-theme';
  private currentTheme: ThemeMode = 'light';

  constructor(private readonly localStorageService: LocalStorageService) {
    this.initializeTheme();
  }

  /**
   * Inicializa el tema desde localStorage o usa el tema del sistema
   */
  private initializeTheme(): void {
    const savedTheme = this.localStorageService.get<ThemeMode>(
      this.THEME_STORAGE_KEY
    );

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.setTheme(savedTheme, false);
    } else {
      // Si no hay tema guardado, usar el tema del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light', false);
    }
  }

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme(): ThemeMode {
    return this.currentTheme;
  }

  /**
   * Verifica si el tema actual es oscuro
   */
  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Cambia el tema
   * @param theme - Tema a aplicar ('light' o 'dark')
   * @param save - Si se debe guardar en localStorage (default: true)
   */
  setTheme(theme: ThemeMode, save = true): void {
    this.currentTheme = theme;
    const body = document.body;

    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    if (save) {
      this.localStorageService.set(this.THEME_STORAGE_KEY, theme);
    }
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

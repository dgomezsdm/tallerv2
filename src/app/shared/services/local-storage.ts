import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get<T = any>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('Error en get', error);
      return null;
    }
  }

  set(key: string, value: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error en set', error);
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error en remove', error);
      return false;
    }
  }

  removeMany(keys: string[]): boolean {
    try {
      keys.forEach((k) => localStorage.removeItem(k));
      return true;
    } catch (error) {
      console.error('Error en removeMany', error);
      return false;
    }
  }

  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error en clear', error);
      return false;
    }
  }
}

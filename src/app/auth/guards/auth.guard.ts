import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage';

export const authGuard: CanActivateFn = async () => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const user = await localStorageService.get('myUser');

  if (user) {
    return true;
  }

  // Redirigir al login si no hay sesión
  await router.navigate(['/login']);
  return false;
};

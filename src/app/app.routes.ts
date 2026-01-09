import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔓 Login independiente
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },

  // 🔒 Rutas privadas con layout
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/menu-layout/menu-layout.page').then(
        (m) => m.MenuLayoutPage
      ),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'check-in',
        loadComponent: () =>
          import('./check-in/check-in.page').then((m) => m.CheckInPage),
      },
      // 🚗 Nueva ruta: Interior del vehículo
      {
        path: 'check-in/vehicle-interior',
        loadComponent: () =>
          import(
            './check-in/pages/vehicle-interior/vehicle-interior.page'
          ).then((m) => m.VehicleInteriorPage),
      },
      {
        path: 'check-in/inside-images',
        loadComponent: () =>
          import('./check-in/pages/inside-images/inside-images.page').then(
            (m) => m.InsideImagesPage
          ),
      },
      {
        path: 'check-in/out-side-images',
        loadComponent: () =>
          import('./check-in/pages/out-side-images/out-side-images.page').then(
            (m) => m.OutSideImagesPage
          ),
      },
      {
        path: 'folder/:id',
        loadComponent: () =>
          import('./folder/folder.page').then((m) => m.FolderPage),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.page').then((m) => m.AboutPage),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

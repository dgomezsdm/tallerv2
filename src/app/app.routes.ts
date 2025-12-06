// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
//   {
//     path: 'folder/:id',
//     loadComponent: () =>
//       import('./folder/folder.page').then((m) => m.FolderPage),
//   },
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./auth/login/login.page').then((m) => m.LoginPage),
//   },
//   {
//     path: 'menu-layout',
//     loadComponent: () => import('./layouts/menu-layout/menu-layout.page').then( m => m.MenuLayoutPage)
//   },
// ];
import { Routes } from '@angular/router';

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
  // {
  //   path: 'check-in',
  //   loadComponent: () => import('./check-in/check-in.page').then( m => m.CheckInPage)
  // },
];

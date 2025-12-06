import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  homeSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  informationCircle
} from 'ionicons/icons';
import { Subject, takeUntil } from 'rxjs';

// Servicios
import { LocalStorageService } from 'src/app/shared/services/local-storage';
import { AlertService } from 'src/app/shared/services/alert';
import { LoginLogic } from 'src/app/auth/interfaces/login-logic.interface';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.page.html',
  styleUrls: ['./menu-layout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonAvatar,
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class MenuLayoutPage implements OnInit, OnDestroy {
  // Información del usuario
  userInfo: LoginLogic | null = null;
  userName = '';
  userEmail = '';
  userInitials = '';
  workshopName = '';

  // Subject para cleanup
  private readonly destroy$ = new Subject<void>();

  public appPages = [
    { title: 'Inicio', url: '/app/home', icon: 'home' },
    { title: 'Walk-ing', url: '/app/folder/inbox', icon: 'mail' },
    { title: 'Crear cliente', url: '/app/folder/outbox', icon: 'paper-plane' },
    { title: 'Asignar chassis', url: '/app/folder/favorites', icon: 'heart' },
    { title: 'Histórico', url: '/app/folder/archived', icon: 'archive' },
    { title: 'Perfil asesor', url: '/app/folder/trash', icon: 'trash' },
    { title: 'Almacenamiento', url: '/app/folder/spam', icon: 'warning' },
    { title: 'Acerca de', url: '/app/about', icon: 'information-circle' },
  ];

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Registra los iconos de Ionicons
   */
  private registerIcons(): void {
    addIcons({
      homeOutline,
      homeSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      logOutOutline,
      settingsOutline,
      informationCircle,
    });
  }

  /**
   * Carga la información del usuario desde localStorage
   */
  // ...

  /**
   * Carga la información del usuario desde localStorage
   */
  private async loadUserInfo(): Promise<void> {
    try {
      const userData = await this.localStorageService.get('myUser');

      if (userData) {
        this.userInfo = userData;
        this.extractUserData(userData);
        this.cd.detectChanges(); // <-- ESTO ES CLAVE: Fuerzas la actualización del template
      }
      console.log('Información del usuario cargada:', this.userInfo);
    } catch (error) {
      console.error('Error al cargar información del usuario:', error);
    }
  }

  // ...

  /**
   * Extrae y formatea los datos del usuario
   */
  /**
   * Extrae y formatea los datos del usuario
   */
  private extractUserData(userData: any): void {
    // 1. Extraer nombre completo
    const name = userData.employeeName || userData.name || '';
    const lastName = userData.employeeLastName || userData.lastName || '';

    // Combina nombre y apellido, usando 'Usuario' si ambos están vacíos.
    this.userName =
      (name.trim() + ' ' + lastName.trim()).trim() ||
      userData.userName ||
      userData.fullName ||
      'Usuario';

    // 2. Extraer email
    // Busca 'employeeEmail' primero, luego las opciones anteriores.
    this.userEmail =
      userData.employeeEmail || userData.email || userData.mail || '';

    // 3. Extraer nombre del taller (workshopName)
    // Busca 'workShop' primero, luego las opciones anteriores.
    this.workshopName =
      userData.workShop || userData.workshopName || userData.workshop || '';

    // 4. Generar iniciales (Usando el nombre completo combinado)
    this.userInitials = this.generateInitials(this.userName);
  }

  /**
   * Genera las iniciales del nombre del usuario
   */
  private generateInitials(name: string): string {
    if (!name) return 'U';

    const nameParts = name.trim().split(' ');

    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Tomar primera letra del primer nombre y primer apellido
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  }

  /**
   * Genera un color de fondo basado en el nombre
   */
  getAvatarColor(): string {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
      '#F8B739',
      '#52B788',
      '#E76F51',
      '#2A9D8F',
    ];

    if (!this.userName) return colors[0];

    // Usar el código ASCII del primer caracter para seleccionar un color
    const charCode = this.userName.charCodeAt(0);
    return colors[charCode % colors.length];
  }

  /**
   * Maneja el cierre de sesión
   */
  async onLogout(): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Estás seguro que deseas cerrar sesión?'
    );

    if (confirmed) {
      await this.performLogout();
    }
  }

  /**
   * Realiza el logout
   */
  private async performLogout(): Promise<void> {
    try {
      const loading = await this.alertService.showLoading('Cerrando sesión...');

      // Limpiar datos del usuario
      await this.localStorageService.remove('myUser');

      await this.alertService.hideLoading(loading);
      await this.alertService.toastSuccess('Sesión cerrada correctamente');

      // Navegar al login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      await this.alertService.error('Error al cerrar sesión');
    }
  }

  /**
   * Navega al perfil del usuario
   */
  goToProfile(): void {
    // Implementar navegación al perfil
    this.alertService.toastInfo('Función de perfil próximamente');
  }

  /**
   * Navega a configuración
   */
  goToSettings(): void {
    // Implementar navegación a settings
    this.alertService.toastInfo('Función de configuración próximamente');
  }
}

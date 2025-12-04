import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, MenuController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  hammerOutline,
  mailOutline,
  businessOutline,
  logInOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

// Importar servicios
import { AuthServices } from '../services/auth-services';
import { LocalStorageService } from 'src/app/shared/services/local-storage';
import { AlertService } from 'src/app/shared/services/alert';
import { environment } from 'src/environments/environment';

// Importar interfaces
import { SAPWorkshops } from 'src/app/shared/interface/sap-workshops.interface';
import { LoginLogic } from '../interfaces/login-logic.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage implements OnInit, OnDestroy {
  // Propiedades del formulario
  email = '';
  selectedWorkshop: string | null = null;
  workshops: SAPWorkshops[] = [];

  // Estado de carga
  isLoading = false;

  // Subject para manejar unsubscribe
  private readonly destroy$ = new Subject<void>();

  // Regex para validación de email
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Keys de localStorage a limpiar
  private readonly STORAGE_KEYS_TO_CLEAR = [
    'back-images',
    'inside-images',
    'inside-features',
    'signatures',
    'feelings-home-crane',
    'back-features',
    'workOrderForm',
    'client',
    'vehicleData',
    'workOrderResponse',
    'promiseDate',
    'clientSecondPhone',
    'contact',
    'cap-features',
    'walkInData',
    'cap-images',
    'walkInDataResponse',
    'vehicle-images',
    'orderNumber',
    'hora',
  ];

  constructor(
    private readonly router: Router,
    private readonly loginService: AuthServices,
    private readonly localStorageService: LocalStorageService,
    private readonly alertService: AlertService,
    private readonly loadingController: LoadingController
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicializa el componente
   */
  private async initializeComponent(): Promise<void> {
    await this.checkUserSession();
    await this.cleanLocalStorage();

    // Validar versión de la app en producción (opcional)
    if (environment.production) {
      this.checkAppVersion();
    }
  }

  /**
   * Registra los iconos de Ionicons
   */
  private registerIcons(): void {
    addIcons({
      hammerOutline,
      mailOutline,
      businessOutline,
      logInOutline,
      shieldCheckmarkOutline,
    });
  }

  /**
   * Verifica si hay una sesión activa
   */
  private async checkUserSession(): Promise<void> {
    const user = await this.localStorageService.get('myUser');

    if (user) {
      await this.router.navigate(['/app/home']);
    } else {
      this.loadWorkshops();
    }
  }

  /**
   * Carga los talleres desde SAP
   */
  private async loadWorkshops(): Promise<void> {
    const loading = await this.alertService.showLoading(
      'Cargando talleres, favor esperar...'
    );

    this.loginService
      .getSAPWorkshops()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (workshops: SAPWorkshops[]) => {
          await this.alertService.hideLoading(loading);
          this.handleWorkshopsResponse(workshops);
        },
        error: async (error) => {
          console.error('Error al cargar talleres:', error);
          await this.alertService.hideLoading(loading);
          await this.alertService.error(
            'No se pudieron cargar los talleres. Por favor, intenta nuevamente.'
          );
        },
      });
  }

  /**
   * Procesa la respuesta de talleres
   */
  private handleWorkshopsResponse(workshops: SAPWorkshops[]): void {
    if (!workshops || workshops.length === 0) {
      this.alertService.warning('No hay talleres disponibles en este momento.');
      return;
    }

    // Limpiar y formatear nombres de talleres
    this.workshops = workshops.map((workshop) => ({
      ...workshop,
      descripcion: workshop.descripcion.replace('DE SERVICIOS ', '').trim(),
    }));
  }

  /**
   * Maneja el evento de login
   */
  async onLogin(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    await this.authenticateUser();
  }

  /**
   * Valida el formulario de login
   */
  private validateForm(): boolean {
    if (!this.selectedWorkshop) {
      this.alertService.toastWarning(
        'Debes seleccionar un taller para continuar'
      );
      return false;
    }

    if (!this.email?.trim()) {
      this.alertService.toastWarning('Debes ingresar tu correo electrónico');
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.alertService.toastError(
        'El formato del correo electrónico no es válido'
      );
      return false;
    }

    return true;
  }

  /**
   * Autentica al usuario
   */
  private async authenticateUser(): Promise<void> {
    this.isLoading = true;
    const loading = await this.alertService.showLoading('Iniciando sesión...');

    this.loginService
      .getLoginLogic(this.email.trim(), this.selectedWorkshop!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (response: LoginLogic) => {
          await this.alertService.hideLoading(loading);
          await this.handleSuccessfulLogin(response);
        },
        error: async (error) => {
          await this.alertService.hideLoading(loading);
          this.handleLoginError(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * Maneja un login exitoso
   */
  private async handleSuccessfulLogin(userData: LoginLogic): Promise<void> {
    try {
      await this.localStorageService.set('myUser', userData);
      await this.alertService.toastSuccess('¡Bienvenido!');

      // Pequeño delay para que se vea el toast
      setTimeout(async () => {
        await this.router.navigate(['/app/home']);
      }, 500);
    } catch (error) {
      console.error('Error al guardar sesión:', error);
      await this.alertService.error('Ocurrió un error al guardar la sesión');
    }
  }

  /**
   * Maneja errores de login
   */
  private handleLoginError(error: any): void {
    this.isLoading = false;

    const errorMessage =
      error?.error?.message ||
      'No se pudo iniciar sesión. Verifica tus credenciales.';

    this.alertService.error(errorMessage);
  }

  /**
   * Valida el formato del email
   */
  private isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  /**
   * Limpia el localStorage de datos temporales
   */
  private async cleanLocalStorage(): Promise<void> {
    try {
      await this.localStorageService.removeMany(this.STORAGE_KEYS_TO_CLEAR);
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }

  /**
   * Verifica la versión de la aplicación
   */
  private checkAppVersion(): void {
    this.loginService
      .getAppVersion()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (response: any) => {
          const serverVersion = response?.data?.version;

          if (serverVersion && environment.appVersion !== serverVersion) {
            const needsUpdate = this.compareVersions(
              environment.appVersion,
              serverVersion
            );

            if (needsUpdate) {
              await this.showUpdateAlert(serverVersion);
            }
          }
        },
        error: (error) => {
          console.warn('No se pudo verificar la versión de la app:', error);
        },
      });
  }

  /**
   * Muestra alerta de actualización disponible
   */
  private async showUpdateAlert(newVersion: string): Promise<void> {
    const shouldUpdate = await this.alertService.confirm(
      `Hay una nueva versión disponible (${newVersion}). ¿Deseas actualizar ahora?`
    );

    if (shouldUpdate) {
      // Aquí puedes redirigir a la tienda o recargar la app
      window.location.reload();
    }
  }

  /**
   * Compara versiones semánticas
   */
  private compareVersions(local: string, server: string): boolean {
    const localParts = local.split('.').map(Number);
    const serverParts = server.split('.').map(Number);

    for (let i = 0; i < Math.max(localParts.length, serverParts.length); i++) {
      const localPart = localParts[i] || 0;
      const serverPart = serverParts[i] || 0;

      if (serverPart > localPart) return true;
      if (serverPart < localPart) return false;
    }

    return false;
  }
}

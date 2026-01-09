import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert';
import { LoggerService } from '../services/logger.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 400:
            errorMessage =
              error.error?.message || 'Solicitud incorrecta. Verifica los datos ingresados.';
            break;
          case 401:
            errorMessage = 'No autorizado. Por favor, inicia sesión nuevamente.';
            break;
          case 403:
            errorMessage = 'No tienes permisos para realizar esta acción.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 500:
            errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
            break;
          case 0:
            errorMessage = 'No hay conexión a internet. Verifica tu conexión.';
            break;
          default:
            errorMessage =
              error.error?.message ||
              `Error ${error.status}: ${error.statusText || 'Error desconocido'}`;
        }
      }

      // Mostrar error al usuario solo si no es un error silencioso
      if (!req.headers.get('X-Silent-Error')) {
        alertService.toastError(errorMessage);
      }

      // Log del error para debugging
      if (!req.headers.get('X-Silent-Error')) {
        logger.error('HTTP Error', {
          url: req.url,
          status: error.status,
          message: errorMessage,
          error: error.error,
        });
      }

      return throwError(() => error);
    })
  );
};

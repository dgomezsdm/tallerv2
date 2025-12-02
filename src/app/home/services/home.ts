import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  getItems() {
    return [
      {
        id: 1,
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        category: 'Trabajo',
      },
      {
        id: 2,
        title: 'Tarea importante',
        description: 'Completar documentación',
        category: 'Pendiente',
      },
      {
        id: 3,
        title: 'Reunión de equipo',
        description: 'Reunión semanal del equipo',
        category: 'Evento',
      },
      {
        id: 4,
        title: 'Revisión de código',
        description: 'Revisar pull requests pendientes',
        category: 'Desarrollo',
      },
    ];
  }

  // Puedes agregar más métodos aquí
  getItemById(id: number) {
    return this.getItems().find((item) => item.id === id);
  }

  addItem(item: any) {
    // Lógica para agregar items
    console.log('Nuevo item:', item);
  }
}

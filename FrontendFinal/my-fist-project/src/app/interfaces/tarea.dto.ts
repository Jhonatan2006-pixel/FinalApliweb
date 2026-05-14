export type EstadoTarea = 'pendiente' | 'en progreso' | 'completada';

export interface TareaDto {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: EstadoTarea;
  proyecto_id: number;
  proyecto?: {
    id: number;
    nombre: string;
  };
}

export interface CrearTareaDto {
  titulo: string;
  descripcion?: string;
  estado: string;
  proyecto_id: number;
}

export interface CambiarEstadoTareaDto {
  estado: string;
}

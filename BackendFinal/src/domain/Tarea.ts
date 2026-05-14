export type EstadoTarea = "pendiente" | "en progreso" | "completada";

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion?: string;
  estado: EstadoTarea;
  proyecto_id: number;
}
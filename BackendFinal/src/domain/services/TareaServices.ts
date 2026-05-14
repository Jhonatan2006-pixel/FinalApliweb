import { TareaModel } from "../../infrastructure/models/TareaModel";

export interface TareaServices {
  getTareas(estado?: string): Promise<TareaModel[]>;

  createTarea(data: {
    titulo: string;
    descripcion?: string;
    estado: string;
    proyecto_id: number;
  }): Promise<TareaModel>;

  cambiarEstado(id: number, estado: string): Promise<TareaModel | null>;
}
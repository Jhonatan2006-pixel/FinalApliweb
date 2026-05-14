import { ProyectoModel } from "../../infrastructure/models/ProyectoModel";

export interface ProyectoServices {
  getProyectos(): Promise<ProyectoModel[]>;

  createProyecto(data: {
    nombre: string;
    descripcion?: string;
  }): Promise<ProyectoModel>;
}
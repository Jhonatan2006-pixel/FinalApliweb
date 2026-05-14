import { ProyectoServices } from "../../domain/services/ProyectoServices";
import { ProyectoModel } from "../models/ProyectoModel";

export class ProyectoServiceImpl implements ProyectoServices {
  async getProyectos(): Promise<ProyectoModel[]> {
    return await ProyectoModel.findAll({
      order: [["id", "DESC"]]
    });
  }

  async createProyecto(data: {
    nombre: string;
    descripcion?: string;
  }): Promise<ProyectoModel> {
    return await ProyectoModel.create({
      nombre: data.nombre,
      descripcion: data.descripcion || null
    });
  }
}
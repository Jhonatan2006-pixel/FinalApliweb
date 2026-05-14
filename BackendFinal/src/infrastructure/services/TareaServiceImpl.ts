import { TareaServices } from "../../domain/services/TareaServices";
import { TareaModel } from "../models/TareaModel";
import { ProyectoModel } from "../models/ProyectoModel";

export class TareaServiceImpl implements TareaServices {
  async getTareas(estado?: string): Promise<TareaModel[]> {
    const where: any = {};

    if (estado && estado !== "todas") {
      where.estado = estado;
    }

    return await TareaModel.findAll({
      where,
      include: [
        {
          model: ProyectoModel,
          as: "proyecto"
        }
      ],
      order: [["id", "DESC"]]
    });
  }

  async createTarea(data: {
    titulo: string;
    descripcion?: string;
    estado: string;
    proyecto_id: number;
  }): Promise<TareaModel> {
    return await TareaModel.create({
      titulo: data.titulo,
      descripcion: data.descripcion || null,
      estado: data.estado || "pendiente",
      proyecto_id: data.proyecto_id
    });
  }

  async cambiarEstado(id: number, estado: string): Promise<TareaModel | null> {
    const tarea = await TareaModel.findByPk(id);

    if (!tarea) {
      return null;
    }

    tarea.estado = estado;
    await tarea.save();

    return tarea;
  }
}
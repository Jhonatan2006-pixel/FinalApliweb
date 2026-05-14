import { Request, Response } from "express";
import { TareaServiceImpl } from "../../infrastructure/services/TareaServiceImpl";

const tareaService = new TareaServiceImpl();

export class TareaController {
  static async getTareas(req: Request, res: Response): Promise<void> {
    try {
      const { estado } = req.query;
      const tareas = await tareaService.getTareas(estado as string);
      res.status(200).json(tareas);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      res.status(500).json({ mensaje: "Error al obtener tareas" });
    }
  }

  static async createTarea(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descripcion, estado, proyecto_id } = req.body;

      if (!titulo || !proyecto_id) {
        res.status(400).json({ mensaje: "El título y el proyecto son obligatorios" });
        return;
      }

      const nuevaTarea = await tareaService.createTarea({
        titulo,
        descripcion,
        estado: estado || "pendiente",
        proyecto_id
      });

      res.status(201).json(nuevaTarea);
    } catch (error) {
      console.error("Error al crear tarea:", error);
      res.status(500).json({ mensaje: "Error al crear tarea" });
    }
  }

  static async cambiarEstado(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      if (!estado) {
        res.status(400).json({ mensaje: "El estado es obligatorio" });
        return;
      }

      const tarea = await tareaService.cambiarEstado(Number(id), estado);

      if (!tarea) {
        res.status(404).json({ mensaje: "Tarea no encontrada" });
        return;
      }

      res.status(200).json(tarea);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      res.status(500).json({ mensaje: "Error al cambiar estado de la tarea" });
    }
  }
}

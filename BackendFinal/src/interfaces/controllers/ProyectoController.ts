import { Request, Response } from "express";
import { ProyectoServiceImpl } from "../../infrastructure/services/ProyectoServiceImpl";

const proyectoService = new ProyectoServiceImpl();

export class ProyectoController {
  static async getProyectos(req: Request, res: Response): Promise<void> {
    try {
      const proyectos = await proyectoService.getProyectos();
      res.status(200).json(proyectos);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      res.status(500).json({ mensaje: "Error al obtener proyectos" });
    }
  }

  static async createProyecto(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        res.status(400).json({ mensaje: "El nombre del proyecto es obligatorio" });
        return;
      }

      const nuevoProyecto = await proyectoService.createProyecto({
        nombre,
        descripcion
      });

      res.status(201).json(nuevoProyecto);
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      res.status(500).json({ mensaje: "Error al crear proyecto" });
    }
  }
}
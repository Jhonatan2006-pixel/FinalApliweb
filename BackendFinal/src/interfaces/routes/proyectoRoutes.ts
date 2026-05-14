import { Router } from "express";
import { ProyectoController } from "../controllers/ProyectoController";

const router = Router();

router.get("/api/proyectos", ProyectoController.getProyectos);
router.post("/api/proyectos", ProyectoController.createProyecto);

export default router;
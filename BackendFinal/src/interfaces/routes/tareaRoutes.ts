import { Router } from "express";
import { TareaController } from "../controllers/TareaController";

const router = Router();

router.get("/api/tareas", TareaController.getTareas);
router.post("/api/tareas", TareaController.createTarea);
router.patch("/api/tareas/:id/estado", TareaController.cambiarEstado);

export default router;

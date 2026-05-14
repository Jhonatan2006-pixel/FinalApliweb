import express from "express";
import cors from "cors";
import proyectoRoutes from "./interfaces/routes/proyectoRoutes";
import tareaRoutes from "./interfaces/routes/tareaRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.send("TaskFlow API funcionando");
});

app.use(proyectoRoutes);
app.use(tareaRoutes);

export default app;

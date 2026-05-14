import { ProyectoModel } from "./ProyectoModel";
import { TareaModel } from "./TareaModel";

export function registerModels() {
  ProyectoModel.hasMany(TareaModel, {
    foreignKey: "proyecto_id",
    as: "tareas"
  });

  TareaModel.belongsTo(ProyectoModel, {
    foreignKey: "proyecto_id",
    as: "proyecto"
  });
}

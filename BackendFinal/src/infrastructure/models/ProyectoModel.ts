import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProyectoModel extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
}

ProyectoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "proyectos",
    schema: "dbo",
    timestamps: false
  }
);

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class TareaModel extends Model {
  public id!: number;
  public titulo!: string;
  public descripcion!: string;
  public estado!: string;
  public proyecto_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

TareaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pendiente"
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "tareas",
    schema: "dbo",
    timestamps: false
  }
);
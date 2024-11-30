import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the Asignacion model
class Asignacion extends Model {
  public id_asig!: number;
  public rut_tec!: number | null;
  public rut_ges!: number | null;
  public fecha_asig!: Date;
  public notas_asig!: string | null;
  public es_actual!: boolean;
}

Asignacion.init(
  {
    id_asig: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rut_tec: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if not assigned
    },
    rut_ges: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if not assigned
    },
    fecha_asig: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to the current timestamp
      allowNull: false,
    },
    notas_asig: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    es_actual: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to 1 (true)
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Asignacion',
    tableName: 'asignacion',
    timestamps: false, // As the SQL definition doesn't use timestamps
  }
);

export default Asignacion;

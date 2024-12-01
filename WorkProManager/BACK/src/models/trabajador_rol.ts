import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Conexión a la base de datos

// Definir el modelo TrabajadorRol
class TrabajadorRol extends Model {
  public id_rol!: number;
  public nom_rol!: string;
}

TrabajadorRol.init(
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_rol: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'TrabajadorRol',
    tableName: 'trabajador_rol',
    timestamps: false,
  }
);

export default TrabajadorRol;

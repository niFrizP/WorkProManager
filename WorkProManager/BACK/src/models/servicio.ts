import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database
import ServicioOrden from './servicio_orden';

// Define the Servicio model
class Servicio extends Model {
  public id_serv!: number;
  public nom_serv!: string;
  public activo!: boolean;
}

Servicio.init(
  {
    id_serv: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_serv: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to '1' (active)
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Servicio',
    tableName: 'servicio',
    timestamps: false, // No timestamp fields are defined in the table
  }
);


export default Servicio;
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database
import Servicio from './servicio';

// Define the ServicioOrden model
class ServicioOrden extends Model {
  public id_ot!: number;
  public id_serv!: number;
  public desc_serv!: string | null;
  public fec_inicio_serv!: Date | null;
  public fec_ter_serv!: Date | null;
  public activo_serv!: boolean;
  public completado_serv!: boolean;
}

ServicioOrden.init(
  {
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_serv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to '1' (active)
      allowNull: false,
    },
    completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to '0' (not completed)
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'ServicioOrden',
    tableName: 'servicio_orden',
    timestamps: false, // No timestamp fields are defined in the table
  }
);

ServicioOrden.belongsTo(Servicio, { foreignKey: 'id_serv' });

export default ServicioOrden;

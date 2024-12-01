import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the HistorialServicioOrden model
class HistorialServicioOrden extends Model {
  public id_hist_serv!: number;
  public id_ot!: number | null;
  public id_serv!: number | null;
  public fecha_cambio_serv!: Date;
  public new_desc_serv!: string | null;
  public old_desc_serv!: string | null;
  public new_fec_inicio_serv!: Date | null;
  public old_fec_inicio_serv!: Date | null;
  public new_fec_ter_serv!: Date | null;
  public old_fec_ter_serv!: Date | null;
  public new_activo_serv!: boolean;
  public old_activo_serv!: boolean;
  public new_completado_serv!: boolean;
  public old_completado_serv!: boolean;
}

HistorialServicioOrden.init(
  {
    id_hist_serv: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_serv: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_cambio_serv: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to current timestamp
      allowNull: false,
    },
    new_desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    old_desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    new_fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    old_fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    new_fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    old_fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    new_activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    old_activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    new_completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    old_completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'HistorialServicioOrden',
    tableName: 'historial_servicio_orden',
    timestamps: false, // As the SQL definition doesn't include timestamps
  }
);

// Define associations

export default HistorialServicioOrden;

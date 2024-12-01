import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the HistorialOrden model
class HistorialOrden extends Model {
  public id_hist_ot!: number;
  public id_ot!: number;
  public fec_cambio!: Date;
  public desc_ot_old!: string | null;
  public desc_ot_new!: string | null;
  public fec_ter_old!: Date | null;
  public fec_ter_new!: Date | null;
  public det_adic_old!: string | null;
  public det_adic_new!: string | null;
  public num_ser_old!: string | null;
  public num_ser_new!: string | null;
  public id_estado_old!: number | null;
  public id_estado_new!: number | null;
  public motiv_rec_old!: string | null;
  public motiv_rec_new!: string | null;
  public old_rut_cli!: number | null;
  public new_rut_cli!: number | null;
  public id_asig_old!: number | null;
  public id_asig_new!: number | null;
}

HistorialOrden.init(
  {
    id_hist_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fec_cambio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to the current timestamp
      allowNull: false,
    },
    desc_ot_old: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    desc_ot_new: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fec_ter_old: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fec_ter_new: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    det_adic_old: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    det_adic_new: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    num_ser_old: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    num_ser_new: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    id_estado_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_estado_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    motiv_rec_old: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motiv_rec_new: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    old_rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    new_rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_asig_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_asig_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'HistorialOrden',
    tableName: 'historial_orden',
    timestamps: false, // As the SQL definition doesn't include timestamps
  }
);

export default HistorialOrden;

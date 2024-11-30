import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database


// Define the OrdenTrabajo model
class OrdenTrabajo extends Model {
  public id_ot!: number;
  public fec_creacion!: Date;
  public desc_ot!: string | null;
  public fec_ter!: Date | null;
  public det_adic!: string | null;
  public num_ser!: string;
  public id_estado!: number | null;
  public motiv_rec!: string | null;
  public rut_cli!: number;
  public id_asig!: number | null;
}

OrdenTrabajo.init(
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fec_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to current timestamp
      allowNull: false,
    },
    desc_ot: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fec_ter: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    det_adic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    num_ser: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    motiv_rec: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_asig: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'OrdenTrabajo',
    tableName: 'orden_trabajo',
    timestamps: false, // As the SQL definition doesn't include timestamps
  }
);

export default OrdenTrabajo;

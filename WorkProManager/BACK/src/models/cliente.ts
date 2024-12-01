import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the Cliente model
class Cliente extends Model {
  public rut_cli!: number;
  public nom_cli!: string;
  public dir_cli!: string | null;
  public tel_cli!: string | null;
  public email_cli!: string | null;
  public ape_cli!: string | null;
  public d_ver_cli!: string | null;
}

Cliente.init(
  {
    rut_cli: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    nom_cli: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dir_cli: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tel_cli: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email_cli: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ape_cli: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    d_ver_cli: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false, // As the SQL definition doesn't include timestamps
  }
);

export default Cliente;
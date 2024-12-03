import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class Cliente extends Model {
  public id_clientente!: number;
  public nom_cli!: string;
  public dir_cli!: string | null;
  public tel_cli!: string | null;
  public email_cli!: string | null;
  public ape_cli!: string | null;
  public d_ver_cli!: string | null;
}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    timestamps: false,
  }
);

export default Cliente;

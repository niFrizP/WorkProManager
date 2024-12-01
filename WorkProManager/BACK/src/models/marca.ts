import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the Marca model
class Marca extends Model {
  public id_marca!: number;
  public nom_marca!: string | null;
}

Marca.init(
  {
    id_marca: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_marca: {
      type: DataTypes.STRING(45),
      allowNull: true, // Nullable based on SQL schema
    },
  },
  {
    sequelize: db,
    modelName: 'Marca',
    tableName: 'marca',
    timestamps: false, // As the SQL definition doesn't use timestamps
  }
);

export default Marca;
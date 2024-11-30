import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the Equipo model
class Equipo extends Model {
  public num_ser!: string;
  public tip_equ!: string | null;
  public mod_equ!: string | null;
  public id_marca!: number | null;
}

Equipo.init(
  {
    num_ser: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
    },
    tip_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mod_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id_marca: {
      type: DataTypes.INTEGER,
      allowNull: true, // Foreign key, nullable if not assigned
    },
  },
  {
    sequelize: db,
    modelName: 'Equipo',
    tableName: 'equipo',
    timestamps: false, // As the SQL definition doesn't use timestamps
  }
);



export default Equipo;

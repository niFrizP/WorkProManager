import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database

// Define the EstadoOT model
class EstadoOT extends Model {
  public id_estado!: number;
  public nom_estado!: 'Cotización y revisión' | 'Confirmando cotización con el cliente' | 'Servicios siendo realizados' | 'Orden Realizada' | 'Orden Rechazada';
}

EstadoOT.init(
  {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_estado: {
      type: DataTypes.ENUM(
        'Cotización y revisión',
        'Confirmando cotización con el cliente',
        'Servicios siendo realizados',
        'Orden Realizada',
        'Orden Rechazada'
      ),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'EstadoOT',
    tableName: 'estado_ot',
    timestamps: false, // As the SQL definition doesn't use timestamps
  }
);

export default EstadoOT;
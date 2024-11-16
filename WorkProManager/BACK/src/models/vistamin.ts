import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class VistaSolicitud extends Model {
  public id_ot!: number;
  public fecha_emision!: Date;
  public isview!: boolean;
  // Otros campos de tu vista si es necesario
}

VistaSolicitud.init(
  {
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rut_remitente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut_receptor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Otros campos según tu vista
  },
  {
    sequelize,
    modelName: 'VistaSolicitud',
    tableName: 'vista_solicitudes_min_fecha', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default VistaSolicitud;

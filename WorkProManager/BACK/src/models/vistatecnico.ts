import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class VistaSolicitudTecnico extends Model {
  public id_ot!: number;
  public fecha_emision!: Date;
  public isview!: boolean;
  // Otros campos de tu vista si es necesario
}

VistaSolicitudTecnico.init(
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
    completada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rut_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_estado_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_termino: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_vista: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    // Otros campos según tu vista
  },
  {
    sequelize,
    modelName: 'VistaSolicitudTecnico',
    tableName: 'vista_ultima_solicitud_por_orden', // Nombre de la vista en la base de datos
    timestamps: false, // No tienes timestamps en la vista
  }
);

export default VistaSolicitudTecnico;

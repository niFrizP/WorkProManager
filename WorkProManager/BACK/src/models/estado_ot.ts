import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';

const EstadoOT = db.define('EstadoOT', {
    id_estado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_estado: {
      type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Completada', 'Cancelada'),
      allowNull: false,
    },
  }, {
    tableName: 'estado_ot', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  EstadoOT.hasMany(Asignacion, { foreignKey: 'id_estado' });
  Asignacion.belongsTo(EstadoOT, { foreignKey: 'id_estado', targetKey: 'id_estado' });

  export default EstadoOT;
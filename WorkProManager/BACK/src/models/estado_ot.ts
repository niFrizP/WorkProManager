import { DataTypes } from 'sequelize';
import db from '../db/connection';

const EstadoOT = db.define('EstadoOT', {
  id_estado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  nom_estado: {
      type: DataTypes.ENUM(
          'Cotización en curso',
          'Verificando cotización',
          'En progreso',
          'Completada',
          'Rechazada'
      ),
      allowNull: false,
  },
}, {
  tableName: 'estado_ot',
  timestamps: false,
});

export default EstadoOT;
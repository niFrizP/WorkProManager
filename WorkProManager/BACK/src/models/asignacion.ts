import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Trabajador from './trabajador';

const Asignacion = db.define('Asignacion', {
  id_asig: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  rut_tec: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'trabajador',
        key: 'rut_trab'
      }
  },
  rut_ges: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'trabajador',
        key: 'rut_trab'
      }
  },
  fecha_asig: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  notas_asig: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  es_actual: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  }
}, {
  tableName: 'asignacion',
  timestamps: false,
});

Asignacion.belongsTo(Trabajador, { as: 'tecnico', foreignKey: 'rut_tec', targetKey: 'rut_trab' });
Asignacion.belongsTo(Trabajador, { as: 'gerente', foreignKey: 'rut_ges', targetKey: 'rut_trab' });

export default Asignacion;
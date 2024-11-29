import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Trabajador from './trabajador';
import Accion from './accion';

const Asignacion = db.define('Asignacion', {
    id_asignacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_trabajador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asignado_por: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_asignacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_finalizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'asignacion', // Nombre explícito de la tabla en la base de datos
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  Asignacion.hasMany(Asignacion, { foreignKey: 'id_asignacion' });
  Asignacion.belongsTo(Asignacion, { foreignKey: 'id_asignacion', targetKey: 'id_asignacion' });
  Asignacion.belongsTo(Trabajador, { foreignKey: 'id_trabajador', targetKey: 'id_trabajador' });
  Asignacion.belongsTo(Trabajador, { foreignKey: 'asignado_por', targetKey: 'id_trabajador' });
  Asignacion.hasMany(Accion, { foreignKey: 'id_asignacion' });
  Asignacion.belongsTo(Accion, { foreignKey: 'id_asignacion', targetKey: 'id_asignacion' });

  export default Asignacion;
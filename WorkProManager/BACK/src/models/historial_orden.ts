import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';
import Accion from './accion';
import Trabajador from './trabajador';

const HistorialOrden = db.define('HistorialOrden', {
    id_historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_cambio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    usuario_responsable: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_accion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado_anterior: {
      type: DataTypes.ENUM('Abierta', 'En progreso', 'Cerrada'),
      allowNull: true,
    },
    estado_nuevo: {
      type: DataTypes.ENUM('Abierta', 'En progreso', 'Cerrada'),
      allowNull: true,
    },
    id_trabajador_asignado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'historial_orden', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  HistorialOrden.belongsTo(Asignacion, { foreignKey: 'id_ot', targetKey: 'id_ot' });
  HistorialOrden.belongsTo(Accion, { foreignKey: 'id_accion', targetKey: 'id_accion' });
  HistorialOrden.belongsTo(Trabajador, { foreignKey: 'id_trabajador_asignado', targetKey: 'id_trabajador' });

  export default HistorialOrden;
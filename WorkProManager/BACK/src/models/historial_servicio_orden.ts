import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Servicio from './servicio';
import Accion from './accion';
import Asignacion from './asignacion';
import ServicioOrden from './servicio_orden';

const HistorialServicioOrden = db.define('HistorialServicioOrden', {
    id_historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_accion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_cambio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    usuario_responsable: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'historial_servicio_orden', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  HistorialServicioOrden.belongsTo(Servicio, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });
  HistorialServicioOrden.belongsTo(Accion, { foreignKey: 'id_accion', targetKey: 'id_accion' });
  HistorialServicioOrden.belongsTo(Asignacion, { foreignKey: 'id_ot', targetKey: 'id_ot' });
  HistorialServicioOrden.belongsTo(ServicioOrden, { foreignKey: 'id_ot', targetKey: 'id_ot' }); 
  HistorialServicioOrden.belongsTo(Servicio, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });

  export default HistorialServicioOrden;
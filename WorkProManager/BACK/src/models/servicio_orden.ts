import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Servicio from './servicio';
import OrdenTrabajo from './orden_trabajo';

const ServicioOrden = db.define('ServicioOrden', {
  id_servicio_orden: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_ot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_servicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion_servicio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'servicio_orden',
  timestamps: false,
});

// Definir las relaciones
ServicioOrden.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot', targetKey: 'id_ot' });
ServicioOrden.belongsTo(Servicio, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });

export default ServicioOrden;

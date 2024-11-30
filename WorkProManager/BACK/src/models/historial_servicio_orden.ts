import { DataTypes } from 'sequelize';
import db from '../db/connection';
import OrdenTrabajo from './orden_trabajo';

const HistorialServicioOrden = db.define('HistorialServicioOrden', {
  id_hist_serv: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  id_ot: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'orden_trabajo',
          key: 'id_ot',
      },
  },
  id_serv: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  fecha_cambio_serv: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  new_desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  old_desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  new_fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
  },
  old_fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
  },
  new_fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  old_fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  new_activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },
  old_activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },
  new_completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  },
  old_completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  }
}, {
  tableName: 'historial_servicio_orden',
  timestamps: false,
});

HistorialServicioOrden.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot' });

export default HistorialServicioOrden;
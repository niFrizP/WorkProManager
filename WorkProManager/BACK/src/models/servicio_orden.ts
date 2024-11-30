import { DataTypes } from 'sequelize';
import db from '../db/connection';
import OrdenTrabajo from './orden_trabajo';
import Servicio from './servicio';

const ServicioOrden = db.define('ServicioOrden', {
  id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
          model: 'orden_trabajo',
          key: 'id_ot',
      },
  },
  id_serv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
          model: 'servicio',
          key: 'id_serv',
      },
  },
  desc_serv: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  fec_inicio_serv: {
      type: DataTypes.DATEONLY,
      allowNull: true,
  },
  fec_ter_serv: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  activo_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },
  completado_serv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  }
}, {
  tableName: 'servicio_orden',
  timestamps: false,
});

ServicioOrden.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot', targetKey: 'id_ot' });
ServicioOrden.belongsTo(Servicio, { foreignKey: 'id_serv', targetKey: 'id_serv' });

export default ServicioOrden;
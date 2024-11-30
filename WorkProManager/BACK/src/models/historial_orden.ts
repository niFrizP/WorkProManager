import { DataTypes } from 'sequelize';
import db from '../db/connection';
import OrdenTrabajo from './orden_trabajo';

const HistorialOrden = db.define('HistorialOrden', {
  id_hist_ot: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'orden_trabajo',
          key: 'id_ot',
      },
  },
  fec_cambio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  desc_ot_old: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  desc_ot_new: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  fec_ter_old: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  fec_ter_new: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  det_adic_old: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  det_adic_new: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  num_ser_old: {
      type: DataTypes.STRING(30),
      allowNull: true,
  },
  num_ser_new: {
      type: DataTypes.STRING(30),
      allowNull: true,
  },
  id_estado_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  id_estado_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  motiv_rec_old: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  motiv_rec_new: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  old_rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  new_rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  id_asig_old: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  id_asig_new: {
      type: DataTypes.INTEGER,
      allowNull: true,
  }
}, {
  tableName: 'historial_orden',
  timestamps: false,
});

HistorialOrden.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot' });

export default HistorialOrden;
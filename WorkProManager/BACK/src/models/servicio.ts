import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Servicio = db.define('Servicio', {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nom_serv: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  activo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  }
}, {
  tableName: 'servicio',
  timestamps: false,
});

export default Servicio;

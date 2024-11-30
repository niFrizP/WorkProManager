import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Servicio = db.define('Servicio', {
  id_serv: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },
  nom_serv: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
  activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  }
}, {
  tableName: 'servicio',
  timestamps: false,
});

export default Servicio;
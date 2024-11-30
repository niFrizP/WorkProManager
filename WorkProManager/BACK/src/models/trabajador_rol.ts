import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TrabajadorRol = db.define('TrabajadorRol', {
  id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  nom_rol: {
      type: DataTypes.STRING(15),
      allowNull: true,
  }
}, {
  tableName: 'trabajador_rol',
  timestamps: false,
});

export default TrabajadorRol;
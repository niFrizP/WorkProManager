import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TrabajadorRol = db.define('TrabajadorRol', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'trabajador_rol',
    timestamps: false,
    modelName: 'TrabajadorRol',
  });

  export default TrabajadorRol;
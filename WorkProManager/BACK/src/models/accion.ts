import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Accion = db.define('Accion', {
    id_accion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_accion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion_accion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'accion', // Nombre explícito de la tabla en la base de datos
    timestamps: false, // No hay columnas de createdAt/updatedAt
  });

  export default Accion;
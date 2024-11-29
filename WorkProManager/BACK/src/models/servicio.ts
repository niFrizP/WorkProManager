import { DataTypes } from 'sequelize';
import db from '../db/connection';
import HistorialServicioOrden from './historial_servicio_orden';

const Servicio = db.define('Servicio', {
    id_servicio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre_servicio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion_servicio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'servicio',
    timestamps: false, // Si no usas createdAt y updatedAt
  });

  Servicio.hasMany(HistorialServicioOrden, { foreignKey: 'id_servicio' });
  HistorialServicioOrden.belongsTo(Servicio, { foreignKey: 'id_servicio', targetKey: 'id_servicio' });

  export default Servicio;
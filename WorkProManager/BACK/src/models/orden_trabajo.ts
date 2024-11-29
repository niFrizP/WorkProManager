import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';
import EstadoOT from './estado_ot';

const OrdenTrabajo = db.define('OrdenTrabajo', {
    id_ot: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_creacion_ot: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    descripcion_ot: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    detalles_adicionales: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numero_serie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'orden_trabajo', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  OrdenTrabajo.hasMany(Asignacion, { foreignKey: 'id_ot' });
  Asignacion.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot', targetKey: 'id_ot' });
  OrdenTrabajo.belongsTo(EstadoOT, { foreignKey: 'id_estado', targetKey: 'id_estado' });


  export default OrdenTrabajo;
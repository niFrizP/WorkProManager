import { DataTypes } from 'sequelize';
import db from '../db/connection';
import TrabajadorRol from './trabajador_rol';

// Definición del modelo Usuario
const Trabajador = db.define('Trabajador', {
    id_trabajador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_trabajador: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido_trabajador: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TrabajadorRol,
        key: 'id_rol',
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    clave: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    tableName: 'trabajador',
    timestamps: false, // No hay columnas de createdAt/updatedAt en tu tabla
    modelName: 'Trabajador',
  });

  Trabajador.belongsTo(TrabajadorRol, { foreignKey: 'id_rol'});
  TrabajadorRol.hasMany(Trabajador, { foreignKey: 'id_rol' });

export default Trabajador;

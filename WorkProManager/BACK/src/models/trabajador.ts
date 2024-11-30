import { DataTypes } from 'sequelize';
import db from '../db/connection';
import TrabajadorRol from './trabajador_rol';

const Trabajador = db.define('Trabajador', {
  rut_trab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
  },
  nom_trab: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
  ape_trab: {
      type: DataTypes.STRING(100),
      allowNull: true,
  },
  id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'trabajador_rol',
          key: 'id_rol',
      },
  },
  activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },
  clave: {
      type: DataTypes.STRING(10),
      allowNull: true,
  },
  d_veri_trab: {
      type: DataTypes.STRING(1),
      allowNull: true,
  }
}, {
  tableName: 'trabajador',
  timestamps: false,
});

Trabajador.belongsTo(TrabajadorRol, { foreignKey: 'id_rol', targetKey: 'id_rol', onDelete: 'CASCADE'})

export default Trabajador;

import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Marca from './marca';

const Equipo = db.define('Equipo', {
  num_ser: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
  },
  tip_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
  },
  mod_equ: {
      type: DataTypes.STRING(50),
      allowNull: true,
  },
  id_marca: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'marca',
          key: 'id_marca',
      },
  }
}, {
  tableName: 'equipo',
  timestamps: false,
});

Equipo.belongsTo(Marca, { foreignKey: 'id_marca', targetKey: 'id_marca' });

export default Equipo;
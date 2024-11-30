import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Cliente = db.define('Cliente', {
  rut_cli: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
  },
  nom_cli: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  ape_cli: {
      type: DataTypes.STRING(100),
      allowNull: true,
  },
  dir_cli: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  tel_cli: {
      type: DataTypes.STRING(15),
      allowNull: true,
  },
  email_cli: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
          isEmail: true,
      },
  },
  d_ver_cli: {
      type: DataTypes.STRING(1),
      allowNull: true,
  }
}, {
  tableName: 'cliente',
  timestamps: false,
});

export default Cliente;
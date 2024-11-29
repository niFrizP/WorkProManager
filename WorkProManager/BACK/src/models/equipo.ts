import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';
import Cliente from './cliente';

const Equipo = db.define('Equipo', {
    numero_serie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_equipo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'equipo', // Nombre explícito de la tabla
    timestamps: false, // No hay columnas createdAt/updatedAt
  });

  Equipo.hasMany(Asignacion, { foreignKey: 'numero_serie' });
  Asignacion.belongsTo(Equipo, { foreignKey: 'numero_serie', targetKey: 'numero_serie' });
  Equipo.belongsTo(Cliente, { foreignKey: 'id_cliente', targetKey: 'id_cliente' });

  export default Equipo;
import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Asignacion from './asignacion';
import EstadoOT from './estado_ot';
import Cliente from './cliente';
import Equipo from './equipo';

const OrdenTrabajo = db.define('OrdenTrabajo', {
  id_ot: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  fec_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  desc_ot: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  fec_ter: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  det_adic: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  num_ser: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
          model: 'equipo',
          key: 'num_ser',
      },
  },
  id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'estado_ot',
          key: 'id_estado',
      },
  },
  motiv_rec: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'cliente',
          key: 'rut_cli',
      },
  },
  id_asig: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'asignacion',
          key: 'id_asig',
      },
  }
}, {
  tableName: 'orden_trabajo',
  timestamps: false,
});

// Definición de relaciones
OrdenTrabajo.belongsTo(EstadoOT, { 
  foreignKey: 'id_estado',
  targetKey: 'id_estado',
  onDelete: 'SET NULL'
});

OrdenTrabajo.belongsTo(Cliente, { 
  foreignKey: 'rut_cli',
  targetKey: 'rut_cli',
  onDelete: 'CASCADE'
});

OrdenTrabajo.belongsTo(Equipo, { 
  foreignKey: 'num_ser',
  targetKey: 'num_ser'
});

OrdenTrabajo.belongsTo(Asignacion, { 
  foreignKey: 'id_asig',
  targetKey: 'id_asig'
});

export default OrdenTrabajo;
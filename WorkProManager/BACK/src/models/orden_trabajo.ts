import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Cliente from './cliente';
import EstadoOT from './estado_ot';
import Equipo from './equipo';
import Asignacion from './asignacion';

class OrdenTrabajo extends Model {
  public id_ot!: number;
  public fec_creacion!: Date;
  public desc_ot!: string | null;
  public fec_ter!: Date | null;
  public det_adic!: string | null;
  public id_estado!: number | null;
  public motiv_rec!: string | null;
  public id_equipo!: number;
  public id_cliente!: number;
}

OrdenTrabajo.init(
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fec_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
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
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    motiv_rec: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_equipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipo', // Relación con la tabla Equipo
        key: 'id_equipo',
      },
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente', // Relación con la tabla Cliente
        key: 'id_cliente',
      },
    }
  },
  {
    sequelize: db,
    modelName: 'OrdenTrabajo',
    tableName: 'orden_trabajo',
    timestamps: false,
  }
);

// Relationships
OrdenTrabajo.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
});

OrdenTrabajo.belongsTo(EstadoOT, {
  foreignKey: 'id_estado'
});

OrdenTrabajo.belongsTo(Equipo, {
  foreignKey: 'id_equipo'
});



export default OrdenTrabajo;

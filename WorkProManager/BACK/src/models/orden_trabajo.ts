import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Conexión a la base de datos
import Cliente from './cliente';
import EstadoOT from './estado_ot';
import Equipo from './equipo';
import Asignacion from './asignacion'; // Si quieres la relación con Asignacion

class OrdenTrabajo extends Model {
  public id_ot!: number;
  public fec_creacion!: Date;
  public desc_ot!: string | null;
  public fec_ter!: Date | null;
  public det_adic!: string | null;
  public num_ser!: string;
  public id_estado!: number | null;
  public motiv_rec!: string | null;
  public rut_cli!: number;
  public id_asig!: number | null;
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
      defaultValue: DataTypes.NOW, // Fecha de creación, por defecto la fecha actual
      allowNull: false,
    },
    desc_ot: {
      type: DataTypes.STRING(255),
      allowNull: true, // Puede ser nulo si no se proporciona una descripción
    },
    fec_ter: {
      type: DataTypes.DATE,
      allowNull: true, // Puede ser nulo si no se ha establecido una fecha de terminación
    },
    det_adic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    num_ser: {
      type: DataTypes.STRING(30),
      allowNull: true, // No se permite nulo, ya que es la clave foránea
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser nulo si no se proporciona un estado
    },
    motiv_rec: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rut_cli: {
      type: DataTypes.INTEGER,
      allowNull: false, // No se permite nulo, ya que es la clave foránea
    },

  },
  {
    sequelize: db,
    modelName: 'OrdenTrabajo',
    tableName: 'orden_trabajo',
    timestamps: false, // Ya que no usamos `createdAt` ni `updatedAt`
  }
);

// Relaciones

// Relación con la tabla `cliente` (cliente que creó la orden)
OrdenTrabajo.belongsTo(Cliente, {
  foreignKey: 'rut_cli',
  as: 'cliente', // Alias para cliente
});

// Relación con la tabla `estado_ot` (estado de la orden)
OrdenTrabajo.belongsTo(EstadoOT, {
  foreignKey: 'id_estado',
  as: 'estado', 
});

// Relación con la tabla `equipo` (equipo asociado a la orden)
OrdenTrabajo.belongsTo(Equipo, {
  foreignKey: 'num_ser',
  as: 'equipo', // Alias para equipo
});



// Relaciones

// Relación con la tabla `cliente` (cliente que creó la orden)
OrdenTrabajo.belongsTo(Cliente, {
  foreignKey: 'rut_cli'
});

// Relación con la tabla `estado_ot` (estado de la orden)
OrdenTrabajo.belongsTo(EstadoOT, {
  foreignKey: 'id_estado'
});

// Relación con la tabla `equipo` (equipo asociado a la orden)
OrdenTrabajo.belongsTo(Equipo, {
  foreignKey: 'num_ser'
});





export default OrdenTrabajo;

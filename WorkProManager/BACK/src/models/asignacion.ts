import { DataTypes, Model } from 'sequelize';
import db from '../db/connection'; // Connection to the database
import Trabajador from './trabajador';
import OrdenTrabajo from './orden_trabajo';

// Define the Asignacion model
class Asignacion extends Model {
  public id_asig!: number;
  public rut_tec!: number | null;
  public rut_ges!: number | null;
  public fecha_asig!: Date;
  public notas_asig!: string | null;
  public es_actual!: boolean;
  public id_ot!: number | null;
}



Asignacion.init(
  {
    id_asig: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rut_tec: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if not assigned
    },
    rut_ges: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if not assigned
    },
    fecha_asig: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to the current timestamp
      allowNull: false,
    },
    notas_asig: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    es_actual: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to 1 (true)
      allowNull: false,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Asignacion',
    tableName: 'asignacion',
    timestamps: false, // As the SQL definition doesn't use timestamps
  }
);

// Asociación con el modelo Trabajador (para el técnico)
Asignacion.belongsTo(Trabajador, {
  foreignKey: 'rut_tec',
  as: 'tecnico', // Alias para técnico
});

// Asociación con el modelo Trabajador (para el gestor)
Asignacion.belongsTo(Trabajador, {
  foreignKey: 'rut_ges',
  as: 'gestor', // Alias para gestor
});

// Asignación tiene un técnico y un gestor
Asignacion.belongsTo(Trabajador, { foreignKey: 'rut_tec' });
Asignacion.belongsTo(Trabajador, { foreignKey: 'rut_ges' });

Asignacion.belongsTo(OrdenTrabajo, { foreignKey: 'id_ot' });
OrdenTrabajo.hasMany(Asignacion, { foreignKey: 'id_ot' });  // Una orden de trabajo tiene muchas asignaciones


export default Asignacion;

import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import TrabajadorRol from './trabajador_rol'; // Importa el modelo trabajador_rol
import Asignacion from './asignacion';

// Definición del modelo Trabajador
class Trabajador extends Model {
  public rut_trab!: number;
  public nom_trab!: string;
  public ape_trab!: string | null;
  public id_rol!: number;
  public activo!: boolean;
  public clave!: string;
  public d_veri_trab!: string | null;
}

Trabajador.init(
  {
    rut_trab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    nom_trab: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ape_trab: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    d_veri_trab: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Trabajador',
    tableName: 'trabajador',
    timestamps: false,
  }
);

// Definir la relación entre Trabajador y TrabajadorRol
Trabajador.belongsTo(TrabajadorRol, { foreignKey: 'id_rol' });

export default Trabajador;

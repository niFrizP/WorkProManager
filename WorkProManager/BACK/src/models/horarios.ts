import { DataTypes, Model } from 'sequelize';
import Cliente from './cliente'; // Importa el modelo Cliente
import Usuario from './usuario'; // Importa el modelo Usuario
import Servicio from './servicio'; // Importa el modelo Servicio
import Equipo from './equipo'; // Importa el modelo Equipo
import EstadoOT from './estado_ot'; // Importa el modelo EstadoOT
import db from '../db/connection';
import Solicitud from './solicitud';
import VistaSolicitud from './vistamin';


class Horarios extends Model {}


// Definir el modelo de 'Order'
Horarios.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    rut_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'rut_usuario'
        }
    },
    dia_semana:
    {
        type: DataTypes.STRING
    },
    hora_inicio:
    {
        type: DataTypes.TIME
    },
    hora_fin:
    {
        type: DataTypes.TIME
    },
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: db,
    modelName: 'horarios_trabajadores',
    tableName: 'horarios_trabajadores',
    createdAt: false,
    updatedAt: false
});

// Definir las relaciones
Horarios.belongsTo(Usuario, {
    foreignKey: 'rut_usuario'
});



export default Horarios;

import { DataTypes, Model } from 'sequelize';
import Cliente from './cliente'; // Importa el modelo Cliente
import Servicio from './servicio'; // Importa el modelo Servicio
import Equipo from './equipo'; // Importa el modelo Equipo
import EstadoOT from './estado_ot'; // Importa el modelo EstadoOT
import db from '../db/connection';
import Solicitud from './solicitud';
import VistaSolicitud from './vistamin';
import VistaSolicitudTecnico from './vistatecnico';
import { getOrdersByUsuarioOrder } from '../controllers/order';
import VistaUltimaAdjudicacion from './vistaultimousuario';
import vista_tiempos_estimados_por_ot from './vistatiemposestimados';


class Order extends Model {}


// Definir el modelo de 'Order'
Order.init({
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: 'solicitud',
            key: 'id_ot'
        }
    },
    fec_creacion: {
        type: DataTypes.DATE
    },
    fec_entrega: {
        type: DataTypes.DATE
    },
    descripcion: {
        type: DataTypes.STRING
    },
    rut_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cliente', // Nombre de la tabla a la que hace referencia
            key: 'rut_cliente'
        }
    },

    num_equipo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },

    
    
    
}, {
    // Update the type to ModelOptions<Model<any, any>>
    sequelize: db,
    modelName: 'orden_trabajo',
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});

// Definir las relaciones
Order.belongsTo(Cliente, { foreignKey: 'rut_cliente', targetKey: 'rut_cliente' });
Order.belongsTo(Solicitud, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(Equipo, { foreignKey: 'num_equipo', targetKey: 'num_equipo' });
Order.hasMany(Order, { foreignKey: 'id_ot' });
Order.belongsTo(VistaSolicitud, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(VistaUltimaAdjudicacion, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.belongsTo(VistaSolicitudTecnico, { foreignKey: 'id_ot', targetKey: 'id_ot' });
Order.hasMany(Solicitud, { foreignKey: 'id_ot' }); // Cambiado a hasMany
Order.belongsTo(vista_tiempos_estimados_por_ot, { foreignKey: 'id_ot', targetKey: 'id_ot' });




export default Order;

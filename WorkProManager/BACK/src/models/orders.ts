import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Definir el modelo de 'Order'
const Order = db.define('Order', {
    id_ot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    costo: {
        type: DataTypes.INTEGER
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
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    id_serv: {
        type: DataTypes.INTEGER,
        references: {
            model: 'servicio',
            key: 'id_serv'
        }
    },
    num_equipo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'equipo',
            key: 'num_equipo'
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        references:{
            model: 'estado_ot',
            key: 'id_estado'
        }
    }
}, {
    tableName: 'orden_trabajo',
    createdAt: false,
    updatedAt: false
});

export default Order;

import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Cliente = db.define('Cliente', {
    rut_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_ot es la clave primaria
       // Si es autoincremental, añade esto
    },
    d_verificador_cliente: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'cliente', // Especifica el nombre exacto de la tabla
    createdAt: false,
    updatedAt: false
});

export default Cliente;

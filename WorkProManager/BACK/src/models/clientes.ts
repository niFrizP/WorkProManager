import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Cliente = db.define('Cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define que id_ot es la clave primaria
        autoIncrement: true // Si es autoincremental, añade esto
    },
    rut: {
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

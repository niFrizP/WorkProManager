import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';

// Definición del modelo Usuario
const UsuarioEliminado = db.define('UsuarioEliminado', {
    rut_usuario: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que rut_usuario es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    rut_usu: {
        type: DataTypes.STRING, // Define el RUT del usuario como una cadena de caracteres
        allowNull: false // RUT no puede ser nulo
    },
    d_verificador_usu: {
        type: DataTypes.STRING, // Define el dígito verificador como una cadena de caracteres
        allowNull: false // Dígito verificador no puede ser nulo
    },
    nom_usu: {
        type: DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    ap_usu: {
        type: DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    correo: {
        type: DataTypes.STRING, // Define el correo del usuario como una cadena de caracteres
        allowNull: true // Correo es opcional
    }
}, {
    tableName: 'usuario_eliminado', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});

UsuarioEliminado.hasMany(UsuarioEliminado, { foreignKey: 'rut_usuario' });

export default UsuarioEliminado;

import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import Rol from './rol';

// Definición del modelo Usuario
const Usuario = db.define('Usuario', {
    rut_usuario: {
        type: DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que rut_usuario es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },

    d_veri_usu: {
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
    email_usu: {
        type: DataTypes.STRING, // Define el correo del usuario como una cadena de caracteres
        allowNull: true // Correo es opcional
    },
    password:{
        type: DataTypes.STRING, // Define la contraseña del usuario como una cadena de caracteres
        allowNull: false // Contraseña no puede ser nula    
    },
    cel_usu:{
        type: DataTypes.STRING, // Define el celular del usuario como una cadena de caracteres
        allowNull: false // Celular no puede ser nulo
    },
    id_rol:{
        type: DataTypes.INTEGER, // Define el rol del usuario como un entero
        allowNull: false,
        references: {
            model: 'rol',
            key: 'nom_rol'
        }
    }
}, {
    tableName: 'usuario', // Especifica el nombre exacto de la tabla en la base de datos
    createdAt: false, // Desactiva el timestamp de creación
    updatedAt: false // Desactiva el timestamp de actualización
});

Usuario.hasMany(Usuario, { foreignKey: 'rut_usuario' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol',  targetKey: 'id_rol' });
Usuario.hasMany(Usuario, { foreignKey: 'rut_usuario' });


export default Usuario;

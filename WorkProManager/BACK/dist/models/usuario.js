"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = __importDefault(require("./rol"));
const usuarios_rol_2_con_tiempo_1 = __importDefault(require("./usuarios_rol_2_con_tiempo"));
// Definición del modelo Usuario
const Usuario = connection_1.default.define('Usuario', {
    rut_usuario: {
        type: sequelize_1.DataTypes.INTEGER, // El tipo de dato es un entero
        primaryKey: true, // Define que rut_usuario es la clave primaria
        autoIncrement: true // Indica que se incrementa automáticamente
    },
    d_veri_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el dígito verificador como una cadena de caracteres
        allowNull: false // Dígito verificador no puede ser nulo
    },
    nom_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    ap_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el nombre del usuario como una cadena de caracteres
        allowNull: false // Nombre no puede ser nulo
    },
    email_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el correo del usuario como una cadena de caracteres
        allowNull: true // Correo es opcional
    },
    password: {
        type: sequelize_1.DataTypes.STRING, // Define la contraseña del usuario como una cadena de caracteres
        allowNull: false // Contraseña no puede ser nula    
    },
    cel_usu: {
        type: sequelize_1.DataTypes.STRING, // Define el celular del usuario como una cadena de caracteres
        allowNull: false // Celular no puede ser nulo
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER, // Define el rol del usuario como un entero
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
Usuario.belongsTo(rol_1.default, { foreignKey: 'id_rol', targetKey: 'id_rol' });
Usuario.hasMany(Usuario, { foreignKey: 'rut_usuario' });
Usuario.hasOne(usuarios_rol_2_con_tiempo_1.default, { foreignKey: 'rut_usuario' });
usuarios_rol_2_con_tiempo_1.default.belongsTo(Usuario, { foreignKey: 'rut_usuario' });
exports.default = Usuario;

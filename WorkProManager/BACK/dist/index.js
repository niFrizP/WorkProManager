"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
//Configuración variables de entorno
dotenv_1.default.config(); // Configurar dotenv
const server = new server_1.default(); // Crear una instancia de la clase Server

import Server from "./models/server";
import dotenv from "dotenv";

//Configuración variables de entorno
dotenv.config(); // Configurar dotenv
const server = new Server(); // Crear una instancia de la clase Server

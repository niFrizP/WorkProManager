import Server from "./models/server";
import dotenv from 'dotenv'

//configuramos la variables de ambiente
dotenv.config();

const server = new Server();
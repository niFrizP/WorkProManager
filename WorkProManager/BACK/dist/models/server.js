"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = process.env.PORT || "3001";
        this.app = (0, express_1.default)();
        this.listen();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.json({
                msg: "API Works",
            });
        });
    }
}
exports.default = Server;

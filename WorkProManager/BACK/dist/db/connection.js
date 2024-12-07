"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize
const sequelize = new sequelize_1.Sequelize('workpromanager', 'root', '7697', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;

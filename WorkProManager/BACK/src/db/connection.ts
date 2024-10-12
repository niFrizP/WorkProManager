import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('orden_trabajo', 'root', 'pelota50', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;

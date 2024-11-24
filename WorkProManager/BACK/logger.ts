// logger.ts
import winston from 'winston';

// Configura el transporte para el archivo de log
const logConfiguration = {
    transports: [
        new winston.transports.File({
            filename: 'logs/log.txt',  // Ruta del archivo donde se almacenarán los logs
            level: 'error',  // Registra solo errores (puedes cambiar a 'info' o 'warn' según sea necesario)
        }),
        new winston.transports.Console({ level: 'info' })  // También imprime logs en consola para desarrollo
    ],
};

// Crea el logger con la configuración
const logger = winston.createLogger(logConfiguration);

export default logger;

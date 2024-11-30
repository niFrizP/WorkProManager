import express, { Router, Request, Response, RequestHandler } from 'express';
import sequelize from '../db/connection';  // Asegúrate de importar sequelize correctamente
import jwt from 'jsonwebtoken';

const RouterLogin = express.Router();

// Ruta de login
const loginHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { rut_trab, clave } = req.body;

    try {
        // Ejecutar el procedimiento almacenado 'validar_credenciales'
        const [result] = await sequelize.query(`
            CALL validar_credenciales(:rut_trab, :clave, @p_valido, @p_usuario_id, @p_mensaje);
            SELECT @p_valido AS valido, @p_usuario_id AS usuario_id, @p_mensaje AS mensaje;
        `, {
            replacements: { rut_trab, clave }  // Reemplazar los parámetros con los valores del request
        });

        const valid = (result as any)[1][0].valido;  // Verificar si las credenciales son válidas
        const userId = (result as any)[1][0].usuario_id;
        const message = (result as any)[1][0].mensaje;

        if (!valid) {
            res.status(401).json({ message });  // Credenciales incorrectas
            return;  // Aseguramos que no se siga ejecutando el código
        }

        // Si todo es correcto, devolver el token
        const token = generateToken(userId);  // Ejemplo de generación de token
        res.status(200).json({ token, message }); // Enviar la respuesta con el token

    } catch (error) {
        console.error(error);

        // Registrar el error en la base de datos
        await sequelize.query(`
            INSERT INTO log_errors (mensaje_error, tipo_error, descripcion_error)
            VALUES (:mensaje_error, :tipo_error, :descripcion_error)
        `, {
            replacements: {
                mensaje_error: (error as Error).message,
                tipo_error: 'Autenticación',
                descripcion_error: 'Error al ejecutar procedimiento de login'
            }
        });

        res.status(500).json({ message: 'Error interno en el servidor' }); // Enviar mensaje de error
    }
};

// Asignar el manejador a la ruta
RouterLogin.post('/login', loginHandler);

// Función para generar el token JWT
function generateToken(userId: any) {
    const secret = 'your_secret_key';  // Reemplaza con tu clave secreta real
    const options = { expiresIn: '1h' };  // Tiempo de expiración del token

    const payload = { userId };  // Define el payload con el userId
    return jwt.sign(payload, secret, options);
}

export default RouterLogin;

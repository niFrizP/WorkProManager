import { Router } from 'express';
import {
    getTrabajadores,
    getTecnicos,
    verifyToken,
    logoutUser,
    getTrabajador,
    loginUser,
    postTrabajador,
    updateTrabajador,
    deleteTrabajador,
    updatePassword
} from '../controllers/trabajador';  // Asegúrate de importar los controladores correctos
/* import { verificarRolesMiddleware } from '../middleware/autenticacion';  // Middleware para roles
 */
const router = Router();

// Ruta para crear un nuevo trabajador (solo Admin puede crear trabajadores)
router.post('/'/* , verificarRolesMiddleware([1]) */, postTrabajador);

// Ruta para iniciar sesión (público)
router.post('/login', loginUser);

// Ruta para verificar token (público)
router.get('/verify-token', verifyToken);

// Ruta para cerrar sesión (público)
router.post('/logout', logoutUser);

// Ruta para obtener todos los trabajadores (solo Admin y Gestores pueden ver todos los trabajadores)
router.get('/'/* , verificarRolesMiddleware([1, 2]) */, getTrabajadores);

// Ruta para obtener todos los técnicos (solo Admin y Gestores pueden acceder)
router.get('/tecnico'/* , verificarRolesMiddleware([1, 2]) */, getTecnicos);

// Ruta para obtener un trabajador por su ID (solo Admin o el propio trabajador pueden acceder)
router.get('/:id'/* , verificarRolesMiddleware([1, 3]) */, getTrabajador);

// Ruta para actualizar un trabajador por su ID (solo Admin puede actualizar)
router.put('/:id'/* , verificarRolesMiddleware([1]) */, updateTrabajador);

// Ruta para eliminar un trabajador por su ID (solo Admin puede eliminar)
router.delete('/:id'/* , verificarRolesMiddleware([1]) */, deleteTrabajador);

// Ruta para actualizar la contraseña de un trabajador por su ID (solo Admin o el propio trabajador pueden cambiar la contraseña)
router.put('/api/reset-password/:rut_trab-:d_veri_trab'/* , verificarRolesMiddleware([1, 3]) */, updatePassword);

export default router;

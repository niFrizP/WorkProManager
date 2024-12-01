import { Router } from 'express';
import { getTrabajadorRoles, getTrabajadorRol, postTrabajadorRol, updateTrabajadorRol, deleteTrabajadorRol } from '../controllers/trabajador_rol';

const router = Router();

// Ruta para obtener todos los roles de los trabajadores
router.get('/', getTrabajadorRoles);

// Ruta para obtener un rol de trabajador por ID
router.get('/:id', getTrabajadorRol);

// Ruta para crear un nuevo rol de trabajador
router.post('/', postTrabajadorRol);

// Ruta para actualizar un rol de trabajador por ID
router.put('/:id', updateTrabajadorRol);

// Ruta para eliminar un rol de trabajador por ID
router.delete('/:id', deleteTrabajadorRol);

export default router;

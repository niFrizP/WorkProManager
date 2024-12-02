import { Router } from 'express';
import { getTrabajadores ,getTecnicos,verifyToken, logoutUser, getTrabajador,loginUser,postTrabajador, updateTrabajador, deleteTrabajador } from '../controllers/trabajador'; // Asegúrate de importar los controladores correctos
import validateToken from './validar_token';

const router = Router();

router.post('/',postTrabajador );


router.post('/login', loginUser);

router.get('/verify-token', verifyToken);

router.post('/logout', logoutUser);


// Ruta para obtener todos los trabajadores
router.get('/', getTrabajadores);


// Ruta para obtener todos los tecnicos
router.get('/tecnico', getTecnicos);

// Ruta para obtener un trabajador por su ID
router.get('/:id', getTrabajador);

// Ruta para crear un nuevo trabajador

// Ruta para actualizar un trabajador por su ID
router.put('/:id', updateTrabajador);

// Ruta para eliminar un trabajador por su ID
router.delete('/:id', deleteTrabajador);

export default router;

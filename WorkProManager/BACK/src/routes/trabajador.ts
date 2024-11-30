import { Router } from 'express';
import { getTrabajadores, getTrabajador,loginUser,postTrabajador, updateTrabajador, deleteTrabajador } from '../controllers/trabajador'; // Asegúrate de importar los controladores correctos


const router = Router();

router.post('/',postTrabajador );

router.post('/login', loginUser)


// Ruta para obtener todos los trabajadores
router.get('/', getTrabajadores);

// Ruta para obtener un trabajador por su ID
router.get('/:id', getTrabajador);

// Ruta para crear un nuevo trabajador

// Ruta para actualizar un trabajador por su ID
router.put('/:id', updateTrabajador);

// Ruta para eliminar un trabajador por su ID
router.delete('/:id', deleteTrabajador);

export default router;

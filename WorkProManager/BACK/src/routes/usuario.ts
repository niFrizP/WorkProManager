import { Router } from 'express';
import { getUsuario, getUsuarios,getUsuarios2,  updateUsuario, deleteUsuario, postUsuario} from '../controllers/usuario';
const router = Router();

router.get('/', getUsuarios);
router.get('/2', getUsuarios2);
router.get('/:id', getUsuario);
router.delete('/:id', deleteUsuario);
router.post('/', postUsuario);
router.put('/:id', updateUsuario);

export default router;

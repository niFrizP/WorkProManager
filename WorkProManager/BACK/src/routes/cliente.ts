import { Router } from 'express';
import { getCliente, getClientes, updateCliente, deleteCliente, postCliente } from '../controllers/cliente';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.delete('/:id', deleteCliente);
router.post('/', postCliente);
router.put('/:id', updateCliente);

export default router;

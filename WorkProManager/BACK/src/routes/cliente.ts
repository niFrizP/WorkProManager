import { Router, RequestHandler } from 'express';
import { 
    getClientes, 
    getCliente, 
    postCliente, 
    updateCliente, 
    deleteCliente 
} from '../controllers/cliente';

const router = Router();

router.get('/', getClientes as RequestHandler);
router.get('/:id', getCliente as RequestHandler);
router.post('/', postCliente as RequestHandler);
router.put('/:id', updateCliente as RequestHandler);
router.delete('/:id', deleteCliente as RequestHandler);

export default router; 
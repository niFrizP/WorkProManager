import { Router, Request, Response } from 'express';
import db from '../db/connection';

const router = Router();

interface InsertarTrabajadorBody {
  id_rol: number;
  rut_trab: string;
  id_estado: number;
  id_marca: number;
  id_serv: number;
}

// Ruta para insertar un trabajador con su rol y servicio
router.post('/insertar-trabajador', async (req: Request<{}, {}, InsertarTrabajadorBody>, res: Response): Promise<void> => {
  const { id_rol, rut_trab, id_estado, id_marca, id_serv } = req.body as InsertarTrabajadorBody;

  // Validación simple
  if (!id_rol || !rut_trab || !id_estado || !id_marca || !id_serv) {
    res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    return;
  }

  try {
    // Llamada al procedimiento almacenado
    const [results] = await db.query(
      'CALL InsertarTrabajadorRolServicio(?, ?, ?, ?, ?)',
      { replacements: [id_rol, rut_trab, id_estado, id_marca, id_serv]}
    );

    res.status(200).json({ message: 'Trabajador registrado exitosamente.', results });
  } catch (error: any) {
    if (error.sqlState === '45000') {
      res.status(400).json({ message: error.sqlMessage }); // Error personalizado del procedimiento
    } else {
      res.status(500).json({ message: 'Error en el servidor.', error });
    }
  }
});

export default router;

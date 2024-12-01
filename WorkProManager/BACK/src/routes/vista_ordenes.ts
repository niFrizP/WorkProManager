import { Router } from 'express';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';

const router = Router();

router.get('/obtener_ordenes', async (req, res) => {
    try {
        const ordenes = await db.query(
            'SELECT * FROM v_ordenes_completas',
            {
                type: QueryTypes.SELECT
            }
        );
        
        res.json({
            ordenes
        });
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({
            msg: 'Error al obtener las órdenes',
            error
        });
    }
});

export default router;
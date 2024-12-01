import { Router, Request, Response } from 'express';
import db from '../db/connection';
import { QueryTypes } from 'sequelize';

const router = Router();

interface OrdenClienteEquipoBody {
    // Datos de Cliente
    nom_cli: string;
    dir_cli: string;
    tel_cli: string;
    email_cli: string;
    ape_cli: string;
    rut_cli: number;
    d_ver_cli: string;

    // Datos de Orden de Trabajo
    desc_ot: string;
    fec_ter: Date;
    det_adic: string;
    num_ser: string;
    id_estado: number;
    motiv_rec: string;

    // Datos de Equipo
    id_marca: number;
    tip_equ: string;
    mod_equ: string;

    // Datos de Asignación
    rut_tec: number;
    rut_ges: number;
    notas_asig: string;

    // Datos del Servicio (opcionales)
    id_serv?: number;
    desc_serv?: string;
}

router.post('/insertar_orden', async (req: Request<{}, {}, OrdenClienteEquipoBody>, res: Response) => {
    try {
        console.log('Body recibido:', req.body);

        const {
            nom_cli, dir_cli, tel_cli, email_cli, ape_cli, rut_cli, d_ver_cli,
            desc_ot, fec_ter, det_adic, num_ser, id_estado, motiv_rec,
            id_marca, tip_equ, mod_equ,
            rut_tec, rut_ges, notas_asig,
            id_serv, desc_serv
        } = req.body;

        console.log('Intentando ejecutar el stored procedure...');

        const result = await db.query(
            'CALL insertar_orden_cliente_equipo_asig(:nom_cli, :dir_cli, :tel_cli, :email_cli, :ape_cli, :rut_cli, :d_ver_cli, :desc_ot, :fec_ter, :det_adic, :num_ser, :id_estado, :motiv_rec, :id_marca, :tip_equ, :mod_equ, :rut_tec, :rut_ges, :notas_asig, :id_serv, :desc_serv)',
            {
                replacements: {
                    nom_cli, dir_cli, tel_cli, email_cli, ape_cli, rut_cli, d_ver_cli,
                    desc_ot, fec_ter, det_adic, num_ser, id_estado, motiv_rec,
                    id_marca, tip_equ, mod_equ,
                    rut_tec, rut_ges, notas_asig,
                    id_serv: id_serv || null,
                    desc_serv: desc_serv || null
                },
                type: QueryTypes.RAW
            }
        );

        console.log('Resultado:', result);

        res.json({
            message: 'Orden de trabajo creada exitosamente',
            result
        });

    } catch (error: any) {
        console.error('Error completo:', error);
        if (error.sqlState === '45000') {
            res.status(400).json({ message: error.message });
        } else {
            console.error('Error al insertar la orden:', error);
            res.status(500).json({ 
                message: 'Error al crear la orden de trabajo',
                error: error.message 
            });
        }
    }
});

export default router;
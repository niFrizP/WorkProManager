import { Request, Response } from 'express';
import Log from '../models/log';

export const getLogs = async (req: Request, res: Response) => {
    const listLogs = await Log.findAll();
    res.json(listLogs);
}

export const getLog = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const log = await Log.findByPk(id);
        if (log) {
            res.json(log);
        } else {
            res.status(404).json({
                msg: `No existe un log con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el log, contacta con soporte`
        });
    }
};

export const deleteLog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const log = await Log.findByPk(id);
    if (!log) {
        res.status(404).json({
            msg: `No existe un log con el id ${id}`
        });
    } else {
        await log.destroy();
        res.json({
            msg: 'El log fue eliminado con éxito!'
        });
    }
}

export const postLog = async (req: Request, res: Response) => {
    const { fecha_ent, fecha_sal, ip, navegador } = req.body;

    try {
        const newLog = await Log.create({
            fecha_ent,
            fecha_sal,
            ip,
            navegador
        });

        res.json({
            msg: 'El log fue agregado con éxito!',
            log: newLog
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateLog = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const log = await Log.findByPk(id);
        if (log) {
            await log.update(body);
            res.json({
                msg: 'El log fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un log con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};

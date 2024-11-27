import { Request, Response } from 'express';
import Equipo from '../models/equipo'; // Asegúrate de tener el modelo de Equipo importado
import sequelize from '../db/connection';
import Marca from '../models/marca';
import Tipo_Equipo from '../models/tipo';

export const getEquipos = async (req: Request, res: Response) => {
    const listEquipos = await Equipo.findAll({include: [{model: Marca }, {model: Tipo_Equipo}]});

    res.json(listEquipos);
};


export const getEquipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const equipo = await Equipo.findByPk(id,{include: [{model: Marca },
            {model: Tipo_Equipo, attributes: ['nom_tipo']}
        ]});

        if (equipo) {
            res.json(equipo);
        } else {
            res.status(404).json({
                msg: `No existe un equipo con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener el equipo, contacta con soporte`
        });
    }
};

export const deleteEquipo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const equipo = await Equipo.findByPk(id);

    if (!equipo) {
        res.status(404).json({
            msg: `No existe un equipo con el id ${id}`
        });
    } else {
        await equipo.destroy();
        res.json({
            msg: 'El equipo fue eliminado con éxito!'
        });
    }
};

export const postEquipo = async (req: Request, res: Response) => {
    const { num_equipo, id_tipo, mod_equipo, fecha_fab,id_marca } = req.body; // Extrae los datos relevantes

    try {
        // Crear el nuevo equipo sin especificar `id_equipo`
        const newEquipo = await Equipo.create({
            num_equipo, id_tipo, mod_equipo, id_marca, fecha_fab
        });

        res.json({
            msg: 'El equipo fue agregado con éxito!',
            equipo: newEquipo // Devuelve el nuevo equipo, incluyendo el id_equipo generado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};

export const updateEquipo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const equipo = await Equipo.findByPk(id);

        if (equipo) {
            await equipo.update(body);
            res.json({
                msg: 'El equipo fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un equipo con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps, ocurrió un error. Comuníquese con soporte`
        });
    }
};

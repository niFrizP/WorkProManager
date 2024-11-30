import { Request, Response } from 'express';
import OrdenTrabajo from '../models/orden_trabajo';
import Cliente from '../models/cliente';
import EstadoOT from '../models/estado_ot';
import Asignacion from '../models/asignacion';
import Trabajador from '../models/trabajador';
import Equipo from '../models/equipo';
import { verificarToken, verificarRol } from '../middleware/autenticacion';

// Obtener todas las órdenes de trabajo
export const getOrdenesTrabajo = async (req: Request, res: Response) => {
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const ordenes = await OrdenTrabajo.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['rut_cli', 'nom_cli', 'ape_cli']
                },
                {
                    model: EstadoOT,
                    attributes: ['id_estado', 'nom_estado']
                },
                {
                    model: Asignacion,
                    include: [{
                        model: Trabajador,
                        as: 'Tecnico',
                        attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                    }]
                },
                {
                    model: Equipo,
                    attributes: ['num_ser', 'tip_equ', 'mod_equ']
                }
            ],
            order: [['fec_creacion', 'DESC']]
        });
        res.json(ordenes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener las órdenes de trabajo'
        });
    }
};

// Obtener una orden de trabajo por ID
export const getOrdenTrabajo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const decoded = await verificarToken(req);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        const orden = await OrdenTrabajo.findByPk(id, {
            include: [
                {
                    model: Cliente,
                    attributes: ['rut_cli', 'nom_cli', 'ape_cli']
                },
                {
                    model: EstadoOT,
                    attributes: ['id_estado', 'nom_estado']
                },
                {
                    model: Asignacion,
                    include: [{
                        model: Trabajador,
                        as: 'Tecnico',
                        attributes: ['rut_trab', 'nom_trab', 'ape_trab']
                    }]
                },
                {
                    model: Equipo,
                    attributes: ['num_ser', 'tip_equ', 'mod_equ']
                }
            ]
        });

        if (orden) {
            res.json(orden);
        } else {
            res.status(404).json({
                msg: `No existe una orden de trabajo con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener la orden de trabajo'
        });
    }
};

// Crear una nueva orden de trabajo
export const postOrdenTrabajo = async (req: Request, res: Response) => {
    const {
        desc_ot,
        fec_ter,
        det_adic,
        num_ser,
        id_estado,
        motiv_rec,
        rut_cli,
        id_asig
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para crear órdenes de trabajo'
            });
        }

        // Verificaciones
        const clienteExiste = await Cliente.findByPk(rut_cli);
        if (!clienteExiste) {
            return res.status(404).json({
                msg: `No existe un cliente con el RUT ${rut_cli}`
            });
        }

        const equipoExiste = await Equipo.findByPk(num_ser);
        if (!equipoExiste) {
            return res.status(404).json({
                msg: `No existe un equipo con el número de serie ${num_ser}`
            });
        }

        if (id_estado) {
            const estadoExiste = await EstadoOT.findByPk(id_estado);
            if (!estadoExiste) {
                return res.status(404).json({
                    msg: `No existe un estado con el ID ${id_estado}`
                });
            }
        }

        const orden = await OrdenTrabajo.create({
            desc_ot,
            fec_creacion: new Date(),
            fec_ter,
            det_adic,
            num_ser,
            id_estado,
            motiv_rec,
            rut_cli,
            id_asig
        });

        res.json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la orden de trabajo'
        });
    }
};

// Actualizar una orden de trabajo
export const updateOrdenTrabajo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        desc_ot,
        fec_ter,
        det_adic,
        num_ser,
        id_estado,
        motiv_rec,
        rut_cli,
        id_asig
    } = req.body;

    try {
        const decoded = await verificarToken(req);
        if (!decoded || !verificarRol(decoded, [1, 2])) { // Solo admin y gestor
            return res.status(403).json({
                msg: 'No tiene permisos para actualizar órdenes de trabajo'
            });
        }

        const orden = await OrdenTrabajo.findByPk(id);
        if (!orden) {
            return res.status(404).json({
                msg: `No existe una orden de trabajo con el id ${id}`
            });
        }

        // Verificaciones si se actualizan las referencias
        if (rut_cli) {
            const clienteExiste = await Cliente.findByPk(rut_cli);
            if (!clienteExiste) {
                return res.status(404).json({
                    msg: `No existe un cliente con el RUT ${rut_cli}`
                });
            }
        }

        if (num_ser) {
            const equipoExiste = await Equipo.findByPk(num_ser);
            if (!equipoExiste) {
                return res.status(404).json({
                    msg: `No existe un equipo con el número de serie ${num_ser}`
                });
            }
        }

        if (id_estado) {
            const estadoExiste = await EstadoOT.findByPk(id_estado);
            if (!estadoExiste) {
                return res.status(404).json({
                    msg: `No existe un estado con el ID ${id_estado}`
                });
            }
        }

        await orden.update({
            desc_ot,
            fec_ter,
            det_adic,
            num_ser,
            id_estado,
            motiv_rec,
            rut_cli,
            id_asig
        });

        res.json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar la orden de trabajo'
        });
    }
};
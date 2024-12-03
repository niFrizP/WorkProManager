import { NextFunction, Request, Response } from 'express';
import OrdenTrabajo from '../models/orden_trabajo';
import Cliente from '../models/cliente';
import Asignacion from '../models/asignacion';
import EstadoOT from '../models/estado_ot';
import Equipo from '../models/equipo';
import Trabajador from '../models/trabajador';

//

export const getOrdenConTrabajadorPorIDOTValidados = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
    const user = req.user as { id_rol: number; rut_trab: number } | null;

    if (!user) {
      return 
    }

    const { id_rol: userRole, rut_trab: userRut } = user;
    const { id } = req.params; // Suponemos que el ID de la orden se pasa como parámetro de ruta

    // Condiciones base para la consulta
    const queryOptions: any = {
      where: { id_ot: id },
      attributes: [
        'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic', 'id_estado', 'motiv_rec'
      ],
      include: [
        {
          model: EstadoOT,
          attributes: ['nom_estado'],
        },
        {
          model: Cliente,
          attributes: ['nom_cli', 'dir_cli', 'tel_cli', 'email_cli', 'ape_cli', 'rut_cli', 'd_ver_cli'],
        },
        {
          model: Equipo,
          attributes: ['tip_equ', 'mod_equ', 'id_marca'],
        },
        {
          model: Asignacion,
          attributes: ['id_asig', 'rut_tec', 'rut_ges', 'fecha_asig', 'notas_asig', 'es_actual'],
          include: [
            {
              model: Trabajador,
              as: 'tecnico',
              attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol', 'd_veri_trab'],
            },
            {
              model: Trabajador,
              as: 'gestor',
              attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol', 'd_veri_trab'],
            },
          ],
        },
      ],
    };

    // Ajusta la consulta según el rol del usuario
    if (userRole === 2) {
      if (!userRut) {
        return res.status(400).json({ msg: 'El rut del trabajador no está disponible.' });
      }
      // Filtra las asignaciones para el técnico actual
      queryOptions.include[3].where = { rut_tec: userRut };
    } else if (userRole !== 1 && userRole !== 3) {
      // Si el rol no está permitido, se bloquea el acceso
      return res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
    }

    // Realiza la consulta
    const orden = await OrdenTrabajo.findOne(queryOptions);

    if (!orden) {
      const errorMsg =
        userRole === 2
          ? 'Orden no encontrada o no asignada al trabajador.'
          : 'Orden no encontrada.';
      return res.status(404).json({ msg: errorMsg });
    }

    return res.status(200).json(orden); // Devuelve la orden encontrada
  } catch (error) {
    console.error('Error en getOrdenConTrabajadorPorIDOTValidados:', error);
    return res.status(500).json({ msg: 'Error interno del servidor.', error });
  }
};


// Obtener todas las órdenes de trabajo

export const getOrdenesConTrabajadoresValidados = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
    const user = req.user as { id_rol: number; rut_trab: number } | null;

    if (!user) {
      return 
    }

    const { id_rol: userRole, rut_trab: userRut } = user;

    // Base para la consulta de órdenes
    const queryOptions: any = {
      attributes: [
        'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic', 'id_estado', 'motiv_rec'
      ],
      include: [
        {
          model: EstadoOT,
          attributes: ['nom_estado'],
        },
        {
          model: Cliente,
          attributes: ['nom_cli', 'dir_cli', 'tel_cli', 'email_cli', 'ape_cli', 'rut_cli', 'd_ver_cli'],
        },
        {
          model: Equipo,
          attributes: ['tip_equ', 'mod_equ', 'id_marca'],
        },
        {
          model: Asignacion,
          attributes: ['id_asig', 'rut_tec', 'rut_ges', 'fecha_asig', 'notas_asig', 'es_actual'],
          include: [
            {
              model: Trabajador,
              as: 'tecnico',
              attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol', 'd_veri_trab'],
            },
            {
              model: Trabajador,
              as: 'gestor',
              attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol', 'd_veri_trab'],
            },
          ],
        },
      ],
    };

    // Ajusta las condiciones según el rol del usuario
    if (userRole === 2) {
      if (!userRut) {
        return res.status(400).json({ msg: 'El rut del trabajador no está disponible.' });
      }
      // Filtra las órdenes asignadas al técnico actual
      queryOptions.include[3].where = { rut_tec: userRut };
    } else if (userRole !== 1 && userRole !== 3) {
      // Si el rol no está permitido, se bloquea el acceso
      return res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
    }

    // Realiza la consulta
    const ordenes = await OrdenTrabajo.findAll(queryOptions);

    if (!ordenes || ordenes.length === 0) {
      const errorMsg = userRole === 2
        ? 'No se encontraron órdenes asignadas al trabajador.'
        : 'No se encontraron órdenes.';
      return res.status(404).json({ msg: errorMsg });
    }

    return res.status(200).json(ordenes); // Devuelve las órdenes encontradas
  } catch (error) {
    console.error('Error en getOrdenesConTrabajadoresValidados:', error);
    next(error); // Pasa el error al manejador global de errores
  }
};




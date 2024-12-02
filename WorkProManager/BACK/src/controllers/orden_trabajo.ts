import { NextFunction, Request, Response } from 'express';
import OrdenTrabajo from '../models/orden_trabajo';
import Cliente from '../models/cliente';
import Asignacion from '../models/asignacion';
import Equipo from '../models/equipo';
import Trabajador from '../models/trabajador';
import { where } from 'sequelize';
import EstadoOT from '../models/estado_ot';

//

export const getOrdenConTrabajadorPorIDOTValidados = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
    if (!req.user) {
      return res.status(401).json({ msg: 'No se encontró el rol del usuario en el token o el rol es inválido.' });
    }

    const user = req.user as { id_rol: number; rut_trab: string } | null;
    const userRole = user?.id_rol;
    const userRut = user?.rut_trab;
    const { id } = req.params; // Suponemos que el ID de la orden se pasa como parámetro de ruta

    let orden;

    // Si el rol es 1 o 3, puede ver cualquier orden
    if (userRole === 1 || userRole === 3) {
      orden = await OrdenTrabajo.findOne({
        where: { id_ot: id }, // Buscar una orden por su ID
        attributes: [
          'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic',
          'num_ser', 'id_estado', 'motiv_rec'
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
      });

      if (!orden) {
        return res.status(404).json({ msg: 'Orden no encontrada' });
      }

      return res.status(200).json(orden); // Devuelve la orden encontrada
    }

    // Si el rol es 2, puede ver solo las órdenes asignadas a él
    if (userRole === 2) {
      if (!userRut) {
        return res.status(400).json({ msg: 'El rut del trabajador no está disponible.' });
      }

      orden = await OrdenTrabajo.findOne({
        where: { id_ot: id }, // Buscar una orden por su ID
        attributes: [
          'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic',
          'num_ser', 'id_estado', 'motiv_rec'
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
            where: { rut_tec: userRut },
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
      });

      if (!orden) {
        return res.status(404).json({ msg: 'Orden no encontrada o no asignada al trabajador.' });
      }

      return res.status(200).json(orden); // Devuelve la orden encontrada
    }

    // Si el rol no está permitido para acceder a la orden
    return res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
  } catch (error) {
    console.error(error);
    next(error); // Pasa el error al manejador global
  }
};

// Obtener todas las órdenes de trabajo

  export const getOrdenesConTrabajadoresValidados = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
      if (!req.user) {
        return res.status(401).json({ msg: 'No se encontró el rol del usuario en el token o el rol es inválido.' });
      }
  
      const user = req.user as { id_rol: number; rut_trab: string } | null;
      const userRole = user?.id_rol;
      const userRut = user?.rut_trab;
  
      let ordenes;
  
      // Si el rol es 1 o 3, puede ver todas las órdenes
      if (userRole === 1 || userRole === 3) {
        ordenes = await OrdenTrabajo.findAll({
          attributes: [
            'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic',
            'num_ser', 'id_estado', 'motiv_rec'
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
        });
  
        return res.status(200).json(ordenes); // Devuelve las órdenes y finaliza aquí
      }
  
      // Si el rol es 2, puede ver solo las órdenes asignadas al trabajador logueado
      if (userRole === 2) {
        if (!userRut) {
          return res.status(400).json({ msg: 'El rut del trabajador no está disponible.' });
        }
  
        ordenes = await OrdenTrabajo.findAll({
          attributes: [
            'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic',
            'num_ser', 'id_estado', 'motiv_rec'
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
              where: {
                rut_tec: userRut,
              },
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
        });
  
        return res.status(200).json(ordenes); // Devuelve las órdenes y finaliza aquí
      }
  
      // Si el rol no está permitido para acceder a las órdenes
      res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
    } catch (error) {
      console.error(error);
      next(error); // Llama a `next` para pasar el error al manejador global
    }
  };
  
  
  
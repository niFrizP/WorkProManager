import { Request, Response } from 'express';
import OrdenTrabajo from '../models/orden_trabajo';
import Cliente from '../models/cliente';
import Asignacion from '../models/asignacion';
import Equipo from '../models/equipo';
import Servicio from '../models/servicio';
import Trabajador from '../models/trabajador';

// Obtener todas las órdenes de trabajo
export const getOrdenesConTrabajadores = async (req: Request, res: Response) => {
    try {
      const ordenes = await OrdenTrabajo.findOne({
        attributes: [
          'id_ot', 'fec_creacion', 'desc_ot', 'fec_ter', 'det_adic', 
          'num_ser', 'id_estado', 'motiv_rec'
        ],
        include: [
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
                as: 'tecnico', // Alias para técnico
                attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol'],
              },
              {
                model: Trabajador,
                as: 'gestor', // Alias para gestor
                attributes: ['rut_trab', 'nom_trab', 'ape_trab', 'id_rol'],
              },
            ],
          }
        ],
      });
  
      res.status(200).json(ordenes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving data' });
    }
  };

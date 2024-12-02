import { Request, Response, NextFunction } from 'express';
import ServicioOrden from '../models/servicio_orden';
import Servicio from '../models/servicio';


export const getServiciosOrdenPorIdOT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
      if (!req.user) {
        return res.status(401).json({ msg: 'No se encontró el rol del usuario en el token o el rol es inválido.' });
      }
  
      const user = req.user as { id_rol: number; rut_trab: string } | null;
      const userRole = user?.id_rol;
      const userRut = user?.rut_trab;
  
      // El id_ot que queremos consultar se toma de la URL
      const { id_ot } = req.params; 
  
      let servicioOrdenes;
  
      // Si el rol es 1 o 3, puede ver todas las órdenes
      if (userRole === 1 || userRole === 3) {
        // Consulta con findAll por id_ot
        servicioOrdenes = await ServicioOrden.findAll({
            include: [
                {
                    model: Servicio,
                    attributes: ['nom_serv'],
                },
            ],
          where: {
            id_ot: id_ot, // Filtra por el id_ot proporcionado en la URL
          }
        });
  
        if (!servicioOrdenes || servicioOrdenes.length === 0) {
          return res.status(404).json({ msg: 'No se encontraron servicios para esta orden.' });
        }
  
        return res.status(200).json(servicioOrdenes); // Devuelve los servicios encontrados
      }
  
      // Si el rol es 2, puede ver solo las órdenes asignadas al trabajador logueado
      if (userRole === 2) {
        if (!userRut) {
          return res.status(400).json({ msg: 'El rut del trabajador no está disponible.' });
        }
  
        // Consulta con findAll por id_ot
        servicioOrdenes = await ServicioOrden.findAll({
          include: [
            {
              model: Servicio,
              attributes: ['nom_serv'],
            },
          ],
          where: {
            id_ot: id_ot, // Filtra por el id_ot proporcionado en la URL
          }
        });
  
        if (!servicioOrdenes || servicioOrdenes.length === 0) {
          return res.status(404).json({ msg: 'No se encontraron servicios para esta orden.' });
        }
  
        return res.status(200).json(servicioOrdenes); // Devuelve los servicios encontrados
      }
  
      // Si el rol no está permitido para acceder a las órdenes
      res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
    } catch (error) {
      console.error(error);
      next(error); // Llama a `next` para pasar el error al manejador global
    }
  };

export const eliminarServicioOrden = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica si req.user está definido y tiene id_rol y rut_trab válidos
    if (!req.user) {
      return res.status(401).json({ msg: 'No se encontró el rol del usuario en el token o el rol es inválido.' });
    }

    const user = req.user as { id_rol: number; rut_trab: string } | null;
    const userRole = user?.id_rol;

    // Los parámetros de la URL (id_ot y id_serv)
    const { id_ot, id_serv } = req.params;

    // Si el rol es 1 o 3, puede eliminar cualquier servicio de la orden
    if (userRole === 1 || userRole === 3) {
      // Eliminar el servicio con id_ot e id_serv
      const resultado = await ServicioOrden.destroy({
        where: {
          id_ot: id_ot,      // Filtra por id_ot
          id_serv: id_serv,  // Filtra por id_serv
        }
      });

      if (resultado === 0) {
        return res.status(404).json({ msg: 'No se encontró el servicio para eliminar.' });
      }

      return res.status(200).json({ msg: 'Servicio eliminado correctamente.' });
    }else if (userRole === 2) {


      // Eliminar el servicio con id_ot e id_serv
      const resultado = await ServicioOrden.destroy({
        where: {
          id_ot: id_ot,      // Filtra por id_ot
          id_serv: id_serv,  // Filtra por id_serv
        }
      });

      if (resultado === 0) {
        return res.status(404).json({ msg: 'No se encontró el servicio para eliminar.' });
      }

      return res.status(200).json({ msg: 'Servicio eliminado correctamente.' });
    }

    // Si el rol no está permitido para realizar la eliminación
    res.status(403).json({ msg: 'Acceso denegado. Rol no permitido.' });
  } catch (error) {
    console.error(error);
    next(error); // Llama a `next` para pasar el error al manejador global
  }
};

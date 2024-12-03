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

// Función auxiliar para obtener servicios habilitados
export const fetchServiciosHabilitados = async (id_ot: string) => {
    const servicioOrdenes = await ServicioOrden.findAll({
        include: [
            {
                model: Servicio,
                attributes: ['nom_serv'],
            },
        ],
        where: {
            id_ot: id_ot, // Filtra por el id_ot proporcionado
            activo_serv: true,
        },
    });

    return servicioOrdenes;
};

// Función auxiliar para obtener servicios deshabilitados
export const fetchServiciosDeshabilitados = async (id_ot: string) => {
    const servicioOrdenes = await ServicioOrden.findAll({
        include: [
            {
                model: Servicio,
                attributes: ['nom_serv'],
            },
        ],
        where: {
            id_ot: id_ot, // Filtra por el id_ot proporcionado
            activo_serv: false,
        },
    });

    return servicioOrdenes;
};

// Actualizar controlador para usar funciones auxiliares
export const getServiciosHabilitados = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_ot } = req.params;
        const serviciosHabilitados = await fetchServiciosHabilitados(id_ot);

        if (!serviciosHabilitados || serviciosHabilitados.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron servicios habilitados para esta orden.' });
        }

        return res.status(200).json(serviciosHabilitados);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getServiciosDeshabilitados = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_ot } = req.params;
        const serviciosDeshabilitados = await fetchServiciosDeshabilitados(id_ot);

        if (!serviciosDeshabilitados || serviciosDeshabilitados.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron servicios deshabilitados para esta orden.' });
        }

        return res.status(200).json(serviciosDeshabilitados);
    } catch (error) {
        console.error(error);
        next(error);
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
        } else if (userRole === 2) {

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

export const desactivarServicioOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_ot, id_serv } = req.params; // Parámetros desde la URL

        if (!id_ot || !id_serv) {
            res.status(400).json({ msg: 'Faltan parámetros en la solicitud.' });
        }

        // Forzar los tipos a números para evitar errores de coincidencia
        const idOt = Number(id_ot);
        const idServ = Number(id_serv);

        // Intenta desactivar el servicio
        const [filasAfectadas] = await ServicioOrden.update(
            { activo_serv: false },
            {
                where: {
                    id_ot: idOt,
                    id_serv: idServ,
                },
            }
        );

    } catch (error) {
        console.error('Error al desactivar el servicio:', error);
        return res.status(500).json({ msg: 'Error interno del servidor.' });
    }
};

export const activarServicioOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_ot, id_serv } = req.params; // Parámetros desde la URL

        if (!id_ot || !id_serv) {
            res.status(400).json({ msg: 'Faltan parámetros en la solicitud.' });
        }

        // Forzar los tipos a números para evitar errores de coincidencia
        const idOt = Number(id_ot);
        const idServ = Number(id_serv);

        // Intenta desactivar el servicio
        const [filasAfectadas] = await ServicioOrden.update(
            { activo_serv: true },
            {
                where: {
                    id_ot: idOt,
                    id_serv: idServ,
                },
            }
        );

        // Verificar si se encontró y actualizó el registro
        if (filasAfectadas === 0) {
            res.status(404).json({ msg: 'No se encontró el servicio para desactivar.' });
        }

        // Respuesta exitosa
        res.status(200).json({ msg: 'Servicio activado correctamente.' });
    } catch (error) {
        console.error('Error al desactivar el servicio:', error);
        return res.status(500).json({ msg: 'Error interno del servidor.' });
    }
};

export const updateServicioOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_ot, id_serv } = req.params;
        const updates = req.body;

        const servicioOrden = await ServicioOrden.findOne({
            where: { id_ot: id_ot, id_serv: id_serv }
        });

        if (!servicioOrden) {
            return res.status(404).json({ msg: 'ServicioOrden no encontrado.' });
        }

        await servicioOrden.update(updates);

        return res.status(200).json({ msg: 'ServicioOrden actualizado correctamente.', servicioOrden });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

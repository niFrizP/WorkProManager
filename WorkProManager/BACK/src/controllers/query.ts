import { Request, Response } from 'express';
import Order from '../models/orders';
import Equipo from '../models/equipo';
import Cliente from '../models/cliente';
import Usuario from '../models/usuario';
import EstadoOT from '../models/estado_ot';
import { Op, Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import Query from '../models/query';


export const getOrdersByEstadoByUser_1 = async (req: Request, res: Response) => {


  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...({
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoByUser_2 = async (req: Request, res: Response) => {


  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...({
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoByUser_3 = async (req: Request, res: Response) => {


  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...({
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoByUser_4 = async (req: Request, res: Response) => {


  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...({
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoByUser_5 = async (req: Request, res: Response) => {


  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...({
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const getOrdersByEstadoEnTiempo = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoEnTiempoGrafico = async (req: Request, res: Response) => {
  try {
    // Definir la expresión de fecha para agrupar por mes/año
    const monthYearFormat = sequelize.fn('DATE_FORMAT', sequelize.col('fec_entrega'), '%Y-%m');

    const ordersCount = await Order.findAll({
      attributes: [
        [monthYearFormat, 'monthYear'], // Agrupar por año y mes
        [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total'], // Contar las órdenes por mes
      ],
      where: {

        fec_entrega: {
          [Op.between]: [
            sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal('INTERVAL 12 MONTH')), // Fecha de hace 12 meses
            sequelize.fn('NOW'), // Fecha actual
          ],
        },
      },
      group: [monthYearFormat], // Agrupar por mes y año
      order: [[monthYearFormat, 'ASC']], // Ordenar por mes/año
    });

    // Enviar los datos como respuesta
    res.json(ordersCount);
  } catch (error) {
    // Mejor manejo de errores con el mensaje completo
    console.error('Error al obtener los datos:', error);
    res.status(500).send('Error al obtener los datos: ' + error);
  }
};



export const getOrdersByEstadoTotalEnTiempo = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.gt]: sequelize.fn('NOW'),
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const getOrdersByEstado = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoTotal = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const getOrdersByEstadoEliminada = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoTotalByUser = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};

export const getOrdersByEstadoByUser = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const getOrdersByEstadoEliminadaByUser = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  try {
    const ordersCount = await Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número total de órdenes
      where: {

        ...(startDate && endDate && {
          fec_entrega: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
            rut_usuario: {
            [Op.eq]: req.body.rut_usuario
            }
        }),
      },
    });

    res.json(ordersCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const countOrdersByDate = async (req: Request, res: Response) => {
  try {
      const count = await Order.findAll({
        attributes: ['fecha', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por estado
        group: ['fecha'],  // Agrupar por el campo 'estado'
      });
      res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
};


export const getOrdersByUsuario = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
          attributes: ['rut_usuario', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por estado
          group: ['rut_usuario'],  // Agrupar por el campo 'estado'
        });

       
        res.json(ordersCount);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
      }
}  

export const getOrdersCosto = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
          attributes: ['', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por estado
          group: ['rut_usuario'],  // Agrupar por el campo 'estado'
        });

       
        res.json(ordersCount);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
      }
}  

export const getOrdersEstadoSum = async (req: Request, res: Response) => {
    try {
      const ordersCount = await Order.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('costo')), 'total_estado'] // Sumar el valor de id_estado_ot por usuario
        ],

      });
  
      res.json(ordersCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  }
  


export const getOrdersByFecha = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
          attributes: ['fecha', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por estado
          group: ['fecha'],  // Agrupar por el campo 'estado'
        });

       
        res.json(ordersCount);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
      }
}  

export const getOrdersByYear = async (req: Request, res: Response) => {
    try {
      const ordersCount = await Order.findAll({
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('fecha')), 'año'],  // Extraer el año de la fecha
          [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total'] // Contar el número total de OT por mes y año
        ],
        group: ['año', ], // Agrupar por año y mes
        order: [['año', 'ASC']] // Ordenar por año y mes en orden ascendente
      });
  
      res.json(ordersCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  }

  export const getOrdersFromLast7DaysExcludingWeekends = async (req: Request, res: Response) => {
    try {
      const { Op } = require('sequelize');
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
  
      const ordersCount = await Order.findAll({
        attributes: [
          'fecha',
          [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total'] // Contar el número total de OT por fecha
        ],
        where: {
          fecha: {
            [Op.between]: [sevenDaysAgo, today], // Filtrar órdenes entre hace 7 días y hoy
          },
          [Op.and]: sequelize.where(sequelize.fn('DAYOFWEEK', sequelize.col('fecha')), {
            [Op.notIn]: [1, 7], // Excluir sábados (7) y domingos (1) en MySQL (1 es domingo, 7 es sábado)
          })
        },
        group: ['fecha'], // Agrupar por fecha
        order: [['fecha', 'ASC']] // Ordenar por fecha en orden ascendente
      });
  
      res.json(ordersCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  }
  

export const getOrdersByMonthAndYear = async (req: Request, res: Response) => {
    try {
      const ordersCount = await Order.findAll({
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('fecha')), 'año'],  // Extraer el año de la fecha
          [sequelize.fn('MONTH', sequelize.col('fecha')), 'mes'], // Extraer el mes de la fecha
          [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total'] // Contar el número total de OT por mes y año
        ],
        group: ['año', 'mes'], // Agrupar por año y mes
        order: [['año', 'ASC'], ['mes', 'ASC']] // Ordenar por año y mes en orden ascendente
      });
  
      res.json(ordersCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  }
  


export const getOrdersBy = async (req: Request, res: Response) => {
    try {
        const ordersCount = await Order.findAll({
          attributes: ['rut_usuario', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por estado
          group: ['rut_usuario'],  // Agrupar por el campo 'estado'
        });

       
        res.json(ordersCount);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
      }
}  




export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                { model: Equipo },
                { model: Cliente },
                { model: Usuario },
            ]
        });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error al obtener la orden, contacta con soporte`
        });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        })
    } else {
        await order.destroy();
        res.json({
            msg: 'La orden fue eliminado con exito!'
        })
    }

}

export const postOrder = async (req: Request, res: Response) => {
    const { fecha, costo, descripcion, rut_cliente, rut_usuario, id_serv, num_equipo } = req.body;

    try {
        const newOrder = await Order.create({
            fecha,
            costo, 
            descripcion,
            rut_cliente, // Incluye id_cliente en la creación
            rut_usuario, // Incluye rut_usuario
            id_serv,    // Incluye id_serv
            num_equipo,  // Incluye num_equipo
        });

        res.json({
            msg: 'La orden fue agregada con éxito!',
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



export const updateOrder = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);

        if(order) {
            await order.update(body); // El body incluye ahora id_cliente, rut_usuario, etc.
            res.json({
                msg: 'La orden fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Upps, ocurrió un error. Comuníquese con soporte'
        });
    }
};



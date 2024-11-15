// WorkProManager/BACK/src/routes/order.ts
import { Router } from 'express';
import {  getOrder, getOrders, postOrder, updateOrder, countOrdersNotification, getSolicitudesFromView, deleteOrder, createSolicitudView} from '../controllers/order';
import { Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import db from '../db/connection';
import Order from '../models/orders';

const router = Router();

router.get('/', getOrders); // Ruta para obtener las órdenes con joins
router.get('/count', createSolicitudView)
router.get('/solicitudes', getSolicitudesFromView);
router.get('/countOrderN', countOrdersNotification); // Para obtener una orden específica por ID

router.get('/:id', getOrder); // Para obtener una orden específica por ID

router.put('/:id', updateOrder); // Para actualizar una orden por ID
router.post('/', postOrder); // Para crear una nueva orden
router.delete('/:id', deleteOrder); // Para eliminar una orden por ID

router.get('/count-by-status', async (req, res) => {
    try {
      const ordersCount = await Order.findAll({
        attributes: ['estado', [sequelize.fn('COUNT', sequelize.col('id')), 'total']], // Contar el número de órdenes por estado
        group: ['estado'],  // Agrupar por el campo 'estado'
      });
  
      res.json(ordersCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  });


  router.get('/ordersByUsuario', async (req, res) => {
    try {
      const ordersByUsuario = await Order.findAll({
        attributes: ['rut_usuario', [sequelize.fn('COUNT', sequelize.col('id_ot')), 'total']], // Contar el número de órdenes por usuario
        group: ['rut_usuario'],  // Agrupar por el campo 'rut_usuario'
      });
  
      res.json(ordersByUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  }
  );
  
  // Ejemplo de contar órdenes por servicio
  router.get('/count-by-service', async (req, res) => {
    try {
      const ordersCountByService = await Order.findAll({
        attributes: ['servicio_id', [sequelize.fn('COUNT', sequelize.col('id')), 'total']], // Contar el número de órdenes por servicio
        group: ['servicio_id'],  // Agrupar por el campo 'servicio_id'
      });
  
      res.json(ordersCountByService);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    }
  });
  

export default router;
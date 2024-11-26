// WorkProManager/BACK/src/routes/order.ts
import { Router } from 'express';
import {  getOrder,getOrdersByTecnico, getSolicitudesFromViewUsuario, createLastAdjucacionPerUsuario,getOrdersFinalizadasCountByMonth,countOrdersNotificationRechazadas,countOrdersNotificationFinalizada,countOrdersNotificationReportes,countOrdersNotificationCotizacon,getOrdersRealizadasCountByMonth,getOrdersCountRealizadasTecnico,getOrdersCountPorRealizarTecnico,getOrdersCountTerminadas, getOrdersCountPorRealizar,getOrders,getOrdersCountByMonth,getOrdersCotizacionesTecnico,getOrdersReporteTecnico, getOrdersCotizacionesGeneral,getOrdersReporteGeneral,getOrdersCompletadas, getOrderssEliminadas ,postOrder, updateOrder, getSolicitudesFromView, deleteOrder, createSolicitudView, getOrdersEliminadas, countOrdersNotificationReportesByRut, countOrdersNotificationCotizacionesByRut} from '../controllers/order';
import { Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import db from '../db/connection';
import Order from '../models/orders';

const router = Router();

router.get('/', getOrders); // Ruta para obtener todas las ordenes
router.post('/tecnico', getOrdersByTecnico)

router.get('/vistausuario', createLastAdjucacionPerUsuario) //crea vista de ultima solicitud por orden
router.get('/vervistausuario', getSolicitudesFromViewUsuario)

router.get('/completass', getOrdersCompletadas)
router.post('/reportestecnico', getOrdersReporteTecnico)
router.get('/rechazadass', getOrderssEliminadas)
router.get('/count', createSolicitudView)

//rutas del home grafico
router.get('/count12mesesa', getOrdersRealizadasCountByMonth)
router.get('/count12meseseliminadas', getOrdersFinalizadasCountByMonth)


//rutas de solicitudes general
router.get('/countabiertas', getOrdersCountPorRealizar)
router.get('/countcerradas', getOrdersCountTerminadas)

//rutas de solicitud por usuario
router.post('/cotizacionesabiertastecnico', getOrdersCountPorRealizarTecnico)



router.get('/cotizacionesgeneral', getOrdersCotizacionesGeneral)
router.post('/cotizacionestecnico', getOrdersCotizacionesTecnico)


router.get('/reportesGeneral', getOrdersReporteGeneral);

router.get('/solicitudes', getSolicitudesFromView);

router.get('/countOrderN', countOrdersNotificationCotizacon); // Para obtener una orden específica por ID
router.get('/countOrderNReportes', countOrdersNotificationReportes); // Para obtener una orden específica por ID
router.get('/countOrderNFinalizadas', countOrdersNotificationFinalizada); // Para obtener una orden específica por ID
router.get('/countOrderNRechazadas', countOrdersNotificationRechazadas); // Para obtener una orden específica por ID

router.post('/countOrderNReportesByRut', countOrdersNotificationReportesByRut);
router.post('/countOrderNCotizacionesByRut', countOrdersNotificationCotizacionesByRut);

router.get('/eliminadas', getOrdersEliminadas)

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
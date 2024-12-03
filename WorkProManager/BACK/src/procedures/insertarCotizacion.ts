import Cliente from '../models/cliente';
import OrdenTrabajo from '../models/orden_trabajo';
import Asignacion from '../models/asignacion';
import { Op } from 'sequelize';

export const insertarOrdenTrabajo = async (data) => {
  try {
    const {
      p_nom_cli,
      p_dir_cli,
      p_tel_cli,
      p_email_cli,
      p_ape_cli,
      p_d_ver_cli,
      p_desc_ot,
      p_fec_ter,
      p_det_adic,
      p_id_estado,
      p_motiv_rec,
      p_id_equipo,
      p_rut_tec,
      p_rut_ges,
    } = data;

    // 1. Insertar cliente
    const cliente = await Cliente.create({
      nom_cli: p_nom_cli,
      dir_cli: p_dir_cli,
      tel_cli: p_tel_cli,
      email_cli: p_email_cli,
      ape_cli: p_ape_cli,
      d_ver_cli: p_d_ver_cli,
    });

    // 2. Insertar orden de trabajo
    const ordenTrabajo = await OrdenTrabajo.create({
      fec_creacion: new Date(),
      desc_ot: p_desc_ot,
      fec_ter: p_fec_ter,
      det_adic: p_det_adic,
      id_estado: p_id_estado,
      motiv_rec: p_motiv_rec,
      id_equipo: p_id_equipo,
      id_clientente: cliente.id_clientente, // Relacionar con el cliente insertado
    });

    // 3. Insertar asignación
    const asignacion = await Asignacion.create({
      rut_tec: p_rut_tec,
      rut_ges: p_rut_ges,
      fecha_asig: new Date(),
      notas_asig: null,
      es_actual: true,
      id_ot: ordenTrabajo.id_ot, // Relacionar con la orden de trabajo insertada
    });

    // Retornar los IDs generados
    return {
      p_id_clientente: cliente.id_clientente,
      p_id_ot: ordenTrabajo.id_ot,
      p_id_asig: asignacion.id_asig,
    };

  } catch (error) {
    console.error('Error al insertar orden de trabajo:', error);
    throw error;
  }
};

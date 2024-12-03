import Cliente from '../models/cliente';
import Equipo from '../models/equipo';
import Asignacion from '../models/asignacion';
import OrdenTrabajo from '../models/orden_trabajo';
import Trabajador from '../models/trabajador';
import { Op } from 'sequelize';

interface OrdenTrabajoInput {
  id_clientente?: number; // Cambié de rut_cli a id_clientente
  id_equipo?: number;  // Cambié de num_ser a id_equipo
  nom_cli?: string;
  dir_cli?: string;
  tel_cli?: string;
  email_cli?: string;
  ape_cli?: string;
  d_ver_cli?: string;
  desc_ot?: string;
  fec_ter?: Date;
  det_adic?: string;
  id_estado?: number;
  motiv_rec?: string;
  id_marca?: number;
  tip_equ?: string;
  mod_equ?: string;
  rut_tec?: number;
  rut_ges?: number;
  notas_asig?: string;
  fecha_asig?: Date;
  es_actual?: boolean;
  id_asig?: number;
  id_ot?: number;
  rut_cli?: number;
}

export const actualizarOrdenClienteEquipoAsig = async (data: OrdenTrabajoInput) => {
  try {
    // Validar que el trabajador con rut_tec tenga rol 2
 
  

    // Actualizar o crear el equipo si se proporcionan valores
    let equipo = await Equipo.findOne({ where: { id_equipo: data.id_equipo } });
    if (equipo) {
      equipo = await equipo.update({
        ...(data.tip_equ ? { tip_equ: data.tip_equ } : {}),
        ...(data.mod_equ ? { mod_equ: data.mod_equ } : {}),
        ...(data.id_marca ? { id_marca: data.id_marca } : {}),
      });
    } else if (data.id_equipo) {
    }

    // Actualizar o crear el cliente si se proporcionan valores
    let cliente = await Cliente.findOne({ where: { rut_cli: data.rut_cli } });
    if (cliente) {
      cliente = await cliente.update({
        ...(data.nom_cli ? { nom_cli: data.nom_cli } : {}),
        ...(data.dir_cli ? { dir_cli: data.dir_cli } : {}),
        ...(data.tel_cli ? { tel_cli: data.tel_cli } : {}),
        ...(data.email_cli ? { email_cli: data.email_cli } : {}),
        ...(data.ape_cli ? { ape_cli: data.ape_cli } : {}),
        ...(data.d_ver_cli ? { d_ver_cli: data.d_ver_cli } : {}),
      });
    } else if (data.rut_cli) {
    }

    // Actualizar o crear la orden de trabajo si se proporcionan valores
    let ordenTrabajo = await OrdenTrabajo.findOne({ where: { id_ot: data.id_ot } });
    if (ordenTrabajo) {
      ordenTrabajo = await ordenTrabajo.update({
        ...(data.desc_ot ? { desc_ot: data.desc_ot } : {}),
        ...(data.fec_ter ? { fec_ter: data.fec_ter } : {}),
        ...(data.det_adic ? { det_adic: data.det_adic } : {}),
        ...(data.id_estado ? { id_estado: data.id_estado } : {}),
        ...(data.motiv_rec ? { motiv_rec: data.motiv_rec } : {}),
        ...(data.id_clientente ? { id_clientente: data.id_clientente } : {}),
      });
    } else if (data.id_equipo) {
    }

    // Actualizar o crear la asignación si se proporcionan valores
    let asignacion = await Asignacion.findOne({ where: { id_asig: data.id_asig } });
    if (asignacion) {
      asignacion = await asignacion.update({
        ...(data.rut_tec ? { rut_tec: data.rut_tec } : {}),
        ...(data.rut_ges ? { rut_ges: data.rut_ges } : {}),
        ...(data.notas_asig ? { notas_asig: data.notas_asig } : {}),
        ...(data.es_actual !== undefined ? { es_actual: data.es_actual } : {}),
      });
    } else if (data.id_asig && ordenTrabajo) {

    }

    return ordenTrabajo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

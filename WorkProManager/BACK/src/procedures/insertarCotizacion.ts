import  Cliente  from '../models/cliente';
import  Equipo  from '../models/equipo';
import  Asignacion  from '../models/asignacion';
import  OrdenTrabajo  from '../models/orden_trabajo';
import  ServicioOrden  from '../models/servicio_orden';
import  Trabajador  from '../models/trabajador';
import { Op } from 'sequelize';

interface OrdenTrabajoInput {
  nom_cli: string;
  dir_cli: string;
  tel_cli: string;
  email_cli: string;
  ape_cli: string;
  rut_cli: number;
  d_ver_cli: string;
  desc_ot: string;
  fec_ter: Date;
  det_adic: string;
  num_ser: string;
  id_estado: number;
  motiv_rec: string;
  id_marca: number;
  tip_equ: string;
  mod_equ: string;
  rut_tec: number;
  rut_ges: number;
  notas_asig: string;
  id_serv: number;
  desc_serv: string;
}

export const insertarOrdenClienteEquipoAsig = async (data: OrdenTrabajoInput) => {
  try {
    // Validar roles
    if (!data.rut_cli || !data.rut_tec || !data.rut_ges || !data.num_ser) {
        throw new Error('Faltan campos obligatorios (rut_cli, rut_tec, rut_ges, num_ser)');
      }
      

    // Insertar o actualizar el cliente
    let cliente = await Cliente.findOne({ where: { rut_cli: data.rut_cli } });
    if (!cliente) {
      cliente = await Cliente.create({
        nom_cli: data.nom_cli,
        dir_cli: data.dir_cli,
        tel_cli: data.tel_cli,
        email_cli: data.email_cli,
        ape_cli: data.ape_cli,
        rut_cli: data.rut_cli,
        d_ver_cli: data.d_ver_cli
      });
    } else {
      await cliente.update(data);
    }

    // Insertar o actualizar el equipo
    let equipo = await Equipo.findOne({ where: { num_ser: data.num_ser } });
    if (!equipo) {
      equipo = await Equipo.create({
        num_ser: data.num_ser,
        tip_equ: data.tip_equ,
        mod_equ: data.mod_equ,
        id_marca: data.id_marca
      });
    } else {
      await equipo.update(data);
    }

    // Insertar la asignación
    const asignacion = await Asignacion.create({
      rut_tec: data.rut_tec,
      rut_ges: data.rut_ges,
      notas_asig: data.notas_asig
    });

    // Insertar la orden de trabajo
    const ordenTrabajo = await OrdenTrabajo.create({
      desc_ot: data.desc_ot,
      fec_ter: data.fec_ter,
      det_adic: data.det_adic,
      num_ser: data.num_ser,
      id_estado: data.id_estado,
      motiv_rec: data.motiv_rec,
      rut_cli: data.rut_cli,
      id_asig: asignacion.id_asig
    });

    // Si se proporciona información del servicio, insertarlo
    if (data.id_serv && data.desc_serv) {
      await ServicioOrden.create({
        id_ot: ordenTrabajo.id_ot,
        id_serv: data.id_serv,
        desc_serv: data.desc_serv,
        fec_inicio_serv: null,
        fec_ter_serv: null,
        activo_serv: 1,
        completado_serv: 0
      });
    }

    return ordenTrabajo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

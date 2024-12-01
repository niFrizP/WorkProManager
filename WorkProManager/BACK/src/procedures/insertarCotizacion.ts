import Cliente from '../models/cliente';
import Equipo from '../models/equipo';
import Asignacion from '../models/asignacion';
import OrdenTrabajo from '../models/orden_trabajo';
import Trabajador from '../models/trabajador';
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
}

export const insertarOrdenClienteEquipoAsig = async (data: OrdenTrabajoInput) => {
  try {
    // Validar que el trabajador con rut_tec tenga rol 2
    const valid_tec = await Trabajador.count({
      where: { rut_trab: data.rut_tec, id_rol: 2 },
    });
    if (valid_tec === 0) {
      throw new Error('El trabajador con rut_tec no tiene el rol adecuado (Rol 2)');
    }

    // Validar que el trabajador con rut_ges tenga rol 1 o 3
    const valid_ges = await Trabajador.count({
      where: { rut_trab: data.rut_ges, id_rol: { [Op.in]: [1, 3] } },
    });
    if (valid_ges === 0) {
      throw new Error('El trabajador con rut_ges no tiene el rol adecuado (Rol 1 o 3)');
    }

    // Verificar si el equipo existe, si existe hacer un UPDATE, si no, insertar
    let equipo = await Equipo.findOne({ where: { num_ser: data.num_ser } });
    if (equipo) {
      // Si el equipo ya existe, actualizamos
      equipo = await equipo.update({
        tip_equ: data.tip_equ,
        mod_equ: data.mod_equ,
        id_marca: data.id_marca,
      });
    } else {
      // Si el equipo no existe, lo creamos
      equipo = await Equipo.create({
        num_ser: data.num_ser,
        tip_equ: data.tip_equ,
        mod_equ: data.mod_equ,
        id_marca: data.id_marca,
      });
    }

    // Verificar si el cliente existe, si existe hacer un UPDATE, si no, insertar
    let cliente = await Cliente.findOne({ where: { rut_cli: data.rut_cli } });
    if (cliente) {
      // Si el cliente ya existe, actualizamos
      cliente = await cliente.update({
        nom_cli: data.nom_cli,
        dir_cli: data.dir_cli,
        tel_cli: data.tel_cli,
        email_cli: data.email_cli,
        ape_cli: data.ape_cli,
        d_ver_cli: data.d_ver_cli,
      });
    } else {
      // Si el cliente no existe, lo creamos
      cliente = await Cliente.create({
        nom_cli: data.nom_cli,
        dir_cli: data.dir_cli,
        tel_cli: data.tel_cli,
        email_cli: data.email_cli,
        ape_cli: data.ape_cli,
        rut_cli: data.rut_cli,
        d_ver_cli: data.d_ver_cli,
      });
    }

    // Insertar Asignación
    const asignacion = await Asignacion.create({
      rut_tec: data.rut_tec,
      rut_ges: data.rut_ges,
      notas_asig: data.notas_asig,
    });

    // Insertar Orden de Trabajo
    const ordenTrabajo = await OrdenTrabajo.create({
      desc_ot: data.desc_ot,
      fec_ter: data.fec_ter,
      det_adic: data.det_adic,
      num_ser: data.num_ser,
      id_estado: data.id_estado,
      motiv_rec: data.motiv_rec,
      rut_cli: data.rut_cli,
      id_asig: asignacion.id_asig, // Se usa el ID de la asignación
    });

    return ordenTrabajo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

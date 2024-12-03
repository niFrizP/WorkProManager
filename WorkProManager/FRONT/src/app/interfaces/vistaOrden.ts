export interface vistaOrden {

  id_ot?: number;
  // Datos de Cliente
  nom_cli: string;
  dir_cli: string;
  tel_cli: number;
  email_cli: string;
  ape_cli: string;
  rut_cli: number;
  d_ver_cli: string;

  // Datos de Orden de Trabajo
  desc_ot: string;
  fec_ter: Date;
  det_adic: string;
  num_ser: string;
  id_estado: number;
  motiv_rec: string;

  // Datos de Equipo
  id_marca: number;
  tip_equ: string;
  mod_equ: string;

  // Datos de Asignación
  rut_tec: number;
  rut_ges: number;
  notas_asig: string;
}

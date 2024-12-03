export interface newOrder {
  id_ot?: number;
  num_ser: number; // Esto corresponde al número de serie del equipo
  fec_creacion: Date;
  fec_ter: Date;
  motiv_rec: string;
  id_rechazo?: number; 
  rut_cliente: number;
  cliente?: {
      nom_cli: string;
      ape_cli: string; 
      tel_cli: string; 
      d_veri_cli: string;
      email_cli: string; 
  };

  equipo?: {
      num_ser: string;
      id_marca: number;
      tip_equ: number;
      nom_marca: string;
  };

  VistaSolicitud?: {
      id_ot?: number; 
      isview: boolean;
      fecha_emision: Date;
      fec_ter: Date; 
      completada: boolean;
      id_estado?: number;
      nom_estado?: string; 
  };

  VistaUltimaAsignacion?: {
      id_asig?: number; // Correspondiente a la asignación
      fecha_asig?: Date;
      rut_tec?: number;
      nom_trab?: string;
      ape_trab?: string;
  };

  vista_tiempos_estimados_por_ot?: {
      id_ot?: number;
      tiempo_estimado_total: number;
  };

  det_adic?: string;
}

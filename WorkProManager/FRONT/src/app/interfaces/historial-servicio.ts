export interface HistorialServicio {
    id_hist_serv: number;
    id_ot: number;
    id_serv: number;
    fecha_cambio_serv: Date;
    new_desc_serv: string;
    old_desc_serv: string;
    new_fec_inicio_serv: Date;
    old_fec_inicio_serv: Date;
    new_fec_ter_serv: Date;
    old_fec_ter_serv: Date;
    new_activo_serv: boolean;
    old_activo_serv: boolean;
    new_completado_serv: boolean;
    old_completado_serv: boolean;
  }
export interface HistorialOrden {
    id_hist_ot: number;
    id_ot: number;
    fec_cambio: Date;
    desc_ot_old: string;
    desc_ot_new: string;
    fec_ter_old: Date;
    fec_ter_new: Date;
    det_adic_old: string;
    det_adic_new: string;
    num_ser_old: string;
    num_ser_new: string;
    id_estado_old: number;
    id_estado_new: number;
    motiv_rec_old: string;
    motiv_rec_new: string;
    old_rut_cli: number;
    new_rut_cli: number;
  }
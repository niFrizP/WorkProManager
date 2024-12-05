export interface Servicio {
    id_serv: number;
    nom_serv: string;
    activo: boolean;
    vista_count_ot_por_servicio?: {
      total_ot: number;
    };
  }
  
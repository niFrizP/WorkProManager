// src/app/models/servicio-orden.model.ts

export interface vistaServicio {
    id_ot?: number;
    id_serv: number;
    desc_serv?: string | null;
    fec_inicio_serv: Date | null;
    fec_ter_serv?: Date | null;
  }
  
  export interface vistaServicioResponse {
    id_ot?: number;
    id_serv: number;
    desc_serv: string;
    fec_inicio_serv: Date | null;
    fec_ter_serv: Date | null;
    activo_serv: boolean;
    completado_serv: boolean;
    Servicio: {
      nom_serv: string;
    };
  }
export interface Solicitud {
    id_sol?: number;
    id_ot: number;
    desc_sol: string;
    id_estado_ot: number;
    isView: boolean;
    fecha_vista?: Date | null; // Opcional porque puede ser null
    fecha_termino?: Date | null; // Opcional porque puede ser null
    fecha_emision: Date;
    fecha_plazo?: Date | null; // Opcional porque puede ser null
    rut_usuario?: number | null; // Opcional porque puede ser null
    completada: boolean;
    EstadoOT?: {
      id_estado_ot: number;
      nom_estado_ot: string;
    };
    Usuario?: {
      nom_usu?: string; // Opcional porque puede no estar presente
      ap_usu?: string;  // Opcional porque puede no estar presente
    } | null; // La propiedad `Usuario` completa puede ser null
  }
  
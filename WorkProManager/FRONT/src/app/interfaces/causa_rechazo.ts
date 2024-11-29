export interface CausaRechazo {
    id_rechazo?: number;
    nombre_rechazo: string;
    isactiva?: boolean;
    vista_count_ot_por_rechazo?: {
            id_rechazo: number,
            total_ot: number
        }
    
}
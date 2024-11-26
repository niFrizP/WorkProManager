export interface DetalleCausaRechazo {
    id_rechazo: number;
    id_ot: number;
    fecha_rechazo?: Date;
    observaciones?: string;
    nombre_rechazo?: string;
    Causa_rechazo?: {
        nombre_rechazo: string;
    }
    count?: number;

}
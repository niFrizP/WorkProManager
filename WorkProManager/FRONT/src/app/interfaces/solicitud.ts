export interface Solicitud {
    id_sol?: number;
    id_ot: number;
    desc_sol: string;
    id_estado_ot: number;
    isView: boolean;
    fecha_vista?: Date | undefined;
    fecha_emision?: Date | undefined;
    fecha_termino?: Date | undefined;
    fecha_plazo?: Date | undefined;
}
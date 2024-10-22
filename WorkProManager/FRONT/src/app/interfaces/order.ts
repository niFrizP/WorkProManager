export interface Order {
    id_ot?: number;
    num_equipo: number;
    fec_creacion: Date;
    fec_entrega: Date;
    descripcion: String;
    rut_usuario: number;
    id_estado_ot: Number;
    rut_cliente: number;
}
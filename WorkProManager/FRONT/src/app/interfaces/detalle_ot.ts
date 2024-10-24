import { Servicio } from "./servicio";

export interface DetalleOT {
    id_ot: number;
    id_serv: number;
    fecha_detalle: Date;
    desc_detalle: string;
    rut_usuario: number;
    Servicio: {
        nom_serv: string;
    }
}

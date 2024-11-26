export interface Adjudicacion {
    id_adjudicacion?: number;
    id_ot: number;
    rut_usuario: number;
    fecha_adjudicacion: Date;
    Usuario?:{
        nom_usu: string;
        ap_usu: string;
        d_veri_usu: string;
    }
}
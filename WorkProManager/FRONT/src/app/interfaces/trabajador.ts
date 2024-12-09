export interface Trabajador {
    rut_trab: number;
    nom_trab: string;
    ape_trab: string | null;
    id_rol: number;
    activo: boolean;
    clave: string;
    d_veri_trab: string | null;
    TrabajadorRol?: {
        nom_rol: string;
    };
}

export interface Cliente {
    nom_cli: string;
    dir_cli: string;
    tel_cli: string;
    email_cli: string;
    ape_cli: string;
    rut_cli: number;
    d_ver_cli: string;
}

export interface Equipo {
    tip_equ: string;
    mod_equ: string;
    id_marca: number;
}

export interface Trabajador {
    rut_trab: number;
    nom_trab: string;
    ape_trab: string;
    id_rol: number;
}

export interface Asignacion {
    id_asig: number;
    rut_tec: number | null;
    rut_ges: number | null;
    fecha_asig: string; // Usamos string para representar la fecha en formato ISO
    notas_asig: string | null;
    es_actual: boolean;
    tecnico: Trabajador;
    gestor: Trabajador;
}

export interface OrdenTrabajo {
    id_ot: number;
    fec_creacion: string; // Usamos string para representar la fecha en formato ISO
    desc_ot: string;
    fec_ter: string; // Usamos string para representar la fecha en formato ISO
    det_adic?: string | null;
    num_ser: string;
    id_estado: number;
    motiv_rec?: string;
    Cliente: Cliente;
    Equipo: Equipo;
    Asignacion: Asignacion;
}

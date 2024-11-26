export interface Marca {
    id_marca?: number;
    nom_marca: string;
    vista_count_marca?:{
        id_marca: number;
        total_equipo: number;
    }
}
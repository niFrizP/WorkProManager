export interface Servicio {
    id_serv?: number;
    nom_serv: string;
    vista_count_ot_por_servicio?: {
            id_serv: number,
            total_ot: number
        }
}
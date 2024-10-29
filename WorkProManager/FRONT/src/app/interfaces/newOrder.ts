export interface newOrder {
  id_ot?: number;
  num_equipo: number;
  fec_creacion: Date;
  fec_entrega: Date;
  descripcion: String;
  rut_usuario: number;
  id_estado_ot: Number;
  rut_cliente: number;
  cliente: {
          nom_cli: string;
          ap_cli: string;
          cel_cli: string;
          d_veri_cli: string;
      },
      Usuario: {
          nom_usu: string;
          ap_usu: string;
      },
  Equipo: {
      mod_equipo: string;
      id_marca: number;
      fecha_fab: Date;
  },
  EstadoOT: {
      nom_estado_ot: string
      }
}

export interface orderEstado {
    id_ot: number;
    id_estado_ot: number;
}
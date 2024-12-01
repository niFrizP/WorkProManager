export interface newOrder {
    id_ot?: number;
    num_equipo: number;
    fec_creacion: Date;
    fec_entrega: Date;
    descripcion: string;
    id_rechazo?: number; // Opcional
    rut_cliente: number;
    nombre_rechazo?: string;
    cliente?: {
      nom_cli: string;
      ap_cli: string;
      cel_cli: string;
      d_veri_cli: string;
      email_cli: string; // Agregado según los datos
    };

    Equipo?: {
      mod_equipo: string;
      id_marca: number;
      id_tipo: number; // Agregado según los datos
      fecha_fab?: Date; // Opcional, ya que no aparece en el JSON proporcionado
    };
    VistaSolicitud?: {
      id_ot?: number; // Opcional, ya que no aparece en todos los casos
      isview: boolean;
      fecha_emision: Date;
      fecha_plazo: Date; // Opcional según los datos
      fecha_termino?: Date; // Agregado según los datos
      completada: boolean; // Agregado según los datos
      id_estado_ot?: number; // Opcional según los datos
      nom_estado_ot: string; // Opcional según los datos
    };
    VistaUltimaAdjudicacion?: {
      id_adjudicacion?: number; // Opcional, ya que no aparece en todos los casos
      fecha_adjudicacion?: Date; // Opcional según los datos
      rut_usuario?: number; // Opcional según los datos
      nom_usu?: string; // Opcional según los datos
      ap_usu?: string; // Opcional según los datos
    };
    vista_tiempos_estimados_por_ot?: {
      id_ot?: number; // Opcional, ya que no aparece en todos los casos
      tiempo_estimado_total: number;
    };
    fecha_rechazo?: Date;
    observaciones?: string;
  }
  

export interface orderEstado {
    id_ot: number;
    id_estado_ot: number;
}
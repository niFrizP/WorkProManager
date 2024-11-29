export interface Order {
    id_ot?: number;
    num_equipo: number;
    fec_creacion: Date;
    fec_entrega: Date;
    descripcion: string;
    rut_cliente: number;
}

export interface OrderMonthData {
    year: number;
    month: number;
    totalOrders: number;
  }
  
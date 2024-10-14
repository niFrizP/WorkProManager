export interface newOrder {
    id_ot?: number;
    num_equipo: number;
    costo: number;
    fecha: Date;
    descripcion: string;
    id_usuario: number;
    id_serv: number;
    id_estado: number;
    rut_cliente: number;
    cliente: {
      nombre: string;
      apellido: string;
      celular: number;
      correo: string;
      d_verificador_cliente: number;
    };
    Servicio: {
      nom_serv: string;
      precio: number;
    };
    Usuario: {
      nom_usu: string;
      ap_usu: string;
    };
    Equipo: {
      mod_equipo: string;
      tipo_equipo: string;
      fec_fabric: Date;
      id_marca: number;
    };
    EstadoOT: {
      tipo_est: string;
    };
  }
  
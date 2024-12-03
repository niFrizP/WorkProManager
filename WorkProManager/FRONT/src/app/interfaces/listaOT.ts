export interface ListasOrdenTrabajo {
  id_ot: number;              // Identificador único de la orden de trabajo
  fec_creacion: string;       // Fecha de creación de la orden
  desc_ot: string;            // Descripción de la orden de trabajo
  fec_ter: Date | string;     // Fecha de término de la orden
  det_adic: string;           // Detalles adicionales de la orden
  num_ser: string;            // Número de servicio
  id_estado: number;          // Estado de la orden
  motiv_rec: string | null;   // Motivo de la recepción (puede ser null)
  EstadoOT: {                 // Estado de la orden de trabajo
    nom_estado: string;       // Nombre del estado de la orden
  };
  Cliente?: {                  // Información del cliente
    nom_cli: string;          // Nombre del cliente
    dir_cli: string;          // Dirección del cliente
    tel_cli: number;          // Teléfono del cliente
    email_cli: string;        // Email del cliente
    ape_cli: string;          // Apellido del cliente
    rut_cli: number;          // RUT del cliente
    d_ver_cli: string;        // Fecha de verificación del cliente
  };
  Equipo: {                   // Información del equipo asociado
    tip_equ: string;          // Tipo de equipo
    mod_equ: string;          // Modelo de equipo
    id_marca: number;         // Marca del equipo
  };
  Asignacions?: {              // Asignaciones relacionadas a esta orden
    id_asig: number;          // ID de la asignación
    rut_tec: number;          // RUT del técnico
    rut_ges: number;          // RUT del gestor
    fecha_asig: string;       // Fecha de la asignación
    notas_asig: string;       // Notas de la asignación
    es_actual: boolean;       // Indica si es la asignación actual
    tecnico: {                // Información del técnico asignado
      rut_trab: number;       // RUT del técnico
      nom_trab: string;       // Nombre del técnico
      ape_trab: string;       // Apellido del técnico
      id_rol: number;         // ID del rol del técnico
      d_veri_trab: string;    // Verificación del técnico
    };
    gestor: {                 // Información del gestor asignado
      rut_trab: number;       // RUT del gestor
      nom_trab: string;       // Nombre del gestor
      ape_trab: string;       // Apellido del gestor
      id_rol: number;         // ID del rol del gestor
      d_veri_trab: string;    // Verificación del gestor
    };
  }[];
}





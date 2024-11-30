export interface Trabajador {
    rut_trab: number; // El RUT (único, clave primaria)
    nom_trab: string; // Nombre del trabajador
    ape_trab: string | null; // Apellido del trabajador (puede ser nulo)
    id_rol: number; // Id del rol asociado al trabajador
    activo: boolean; // Estado de actividad del trabajador
    clave: string; // Clave encriptada
    d_veri_trab: string | null; // Indicador de verificación del trabajador (puede ser nulo)
    TrabajadorRol: {
        nom_rol: string; // Nombre del rol
    }
  }
  
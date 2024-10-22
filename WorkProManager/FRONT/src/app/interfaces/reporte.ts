// src/interfaces/IReporte.ts
export interface Reporte {
    idreporte?: number; // ID del reporte, opcional en caso de creación
    rut_usuario: number; // ID del usuario que creó el reporte
    fecha: Date; // Fecha del reporte
    descripcion: string; // Descripción del reporte
    id_ot: number; // ID de la OT
}

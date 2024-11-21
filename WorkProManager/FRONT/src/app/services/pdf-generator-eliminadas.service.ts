import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { newOrder } from '../interfaces/newOrder';
import { DetalleOT } from '../interfaces/detalle_ot';
import { DetalleCausaRechazo } from '../interfaces/detalle_causa_rechazo';
import { Solicitud } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorRechazadasService {
  generatePDFContentEliminada(
    order: newOrder,
    detalles: DetalleOT[],
    solicitudes: Solicitud[],
    detalleCausas: DetalleCausaRechazo[],
    fileName: string
  ): void {
    try {
      const pdf = new jsPDF();
      pdf.setFont('helvetica');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;
      let currentY = margin;

      const logourl = 'https://i.imgur.com/kTQg9EM.png';
      pdf.addImage(logourl, 'PNG', 15, 10, 30, 20);

      const checkPageHeight = (increment: number) => {
        if (currentY + increment > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
      };

      // Título principal
      pdf.setFontSize(20);
      pdf.text('ORDEN DE TRABAJO ELIMINADA', 105, currentY, { align: 'center' });
      currentY += 20;

      // Información general
      pdf.setFontSize(12);
      pdf.text(`OT N°: ${order.id_ot}`, margin, currentY);
      currentY += 8;
      pdf.text(`Creada por: ${order.Usuario.nom_usu} ${order.Usuario.ap_usu}`, margin, currentY);
      currentY += 8;
      pdf.text(`Fecha de creación: ${new Date(order.fec_creacion).toLocaleDateString()}`, margin, currentY);
      currentY += 8;
      pdf.text(`Fecha de entrega: ${new Date(order.fec_entrega).toLocaleDateString()}`, margin, currentY);

      currentY += 12;

      // Datos del cliente
      pdf.setFontSize(14);
      pdf.text('DATOS DEL CLIENTE', margin, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(`RUT: ${order.rut_cliente}-${order.cliente.d_veri_cli}`, margin, currentY);
      currentY += 8;
      pdf.text(`Nombre: ${order.cliente.nom_cli} ${order.cliente.ap_cli}`, margin, currentY);
      currentY += 8;
      pdf.text(`Celular: ${order.cliente.cel_cli}`, margin, currentY);

      pdf.text(`Orden: ${order.descripcion}`, margin, currentY);


      currentY += 12;

      // Detalles de la orden
      pdf.setFontSize(14);
      pdf.text('DETALLES DE LA ORDEN', margin, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      detalles.forEach((detalle) => {
        checkPageHeight(20);
        pdf.text(`Servicio: ${detalle.Servicio?.nom_serv || 'N/A'}`, margin, currentY);
        currentY += 6;

        const descripcion = pdf.splitTextToSize(detalle.desc_detalle, usableWidth);
        pdf.text(descripcion, margin, currentY);
        currentY += descripcion.length * 6;
      });

      currentY += 12;

      // Solicitudes asociadas
      const estadoMap: { [key: number]: string } = {
        1: 'Pendiente',
        2: 'En Proceso',
        3: 'Incompleto',
        4: 'Completo',
        5: 'Finalizada',
        6: 'Rechazada',
      };

      pdf.setFontSize(14);
      pdf.text('SOLICITUDES ASOCIADAS', margin, currentY);
      currentY += 8;
      pdf.setFontSize(12);

      solicitudes.forEach((solicitud, index) => {
        checkPageHeight(30);

        // Número de solicitud
        pdf.setFontSize(12);
        pdf.text(`Solicitud N° ${index + 1}`, margin, currentY);
        currentY += 8;

        const descripcion = pdf.splitTextToSize(solicitud.desc_sol, usableWidth);
        pdf.text(`Descripción:`, margin, currentY);
        currentY += 6;
        pdf.text(descripcion, margin + 10, currentY);
        currentY += descripcion.length * 6;

        // Estado de la solicitud
        pdf.text(`Estado: ${estadoMap[solicitud.id_estado_ot] || 'Desconocido'}`, margin, currentY);
        currentY += 8;

        pdf.text(`Fecha de emisión: ${new Date(solicitud.fecha_emision ?? '').toLocaleDateString()}`, margin, currentY);
        currentY += 12;
      });

      // Causas de rechazo
      pdf.setFontSize(14);
      pdf.text('CAUSAS DE RECHAZO', margin, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      detalleCausas.forEach((detalleCausa) => {
        checkPageHeight(20);
        

        const observaciones = pdf.splitTextToSize(detalleCausa.observaciones || 'N/A', usableWidth);
        pdf.text(observaciones, margin, currentY);
        currentY += observaciones.length * 6;
      });

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}

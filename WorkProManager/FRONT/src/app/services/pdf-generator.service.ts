import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { newOrder } from '../interfaces/newOrder';
import { DetalleOT } from '../interfaces/detalle_ot';
import { Solicitud } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  generatePDFContent(order: newOrder, detalles: DetalleOT[], solicitudes: Solicitud[], fileName: string): void {
    try {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height; // Altura de la página
      const margin = 10; // Margen superior e inferior
      let currentY = 20; // Posición vertical inicial

      pdf.setFont('helvetica');

      // Agregar logo
      const logoUrl = 'https://i.imgur.com/kTQg9EM.png';
      pdf.addImage(logoUrl, 'PNG', 15, 10, 30, 20);

      // Título principal
      pdf.setFontSize(20);
      pdf.text('ORDEN DE TRABAJO', 105, currentY, { align: 'center' });
      currentY += 20;

      const addNewPage = () => {
        pdf.addPage();
        currentY = margin;
      };

      const checkPageOverflow = (increment: number) => {
        if (currentY + increment > pageHeight - margin) {
          addNewPage();
        }
      };

      // Información general
      pdf.setFontSize(12);
      checkPageOverflow(40);
      pdf.text(`OT N°: ${order.id_ot}`, 15, currentY);
      currentY += 8;
      pdf.text(`Creada por: ${order.VistaUltimaAdjudicacion?.nom_usu} ${order.VistaUltimaAdjudicacion?.ap_usu}`, 15, currentY);
      currentY += 8;
      pdf.text(`Fecha de creación: ${new Date(order.fec_creacion).toLocaleDateString()}`, 15, currentY);
      currentY += 8;
      pdf.text(`Fecha de entrega: ${new Date(order.fec_entrega).toLocaleDateString()}`, 15, currentY);

      currentY += 12;

      // Datos del cliente
      pdf.setFontSize(14);
      checkPageOverflow(20);
      pdf.text('DATOS DEL CLIENTE', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(`RUT: ${order.rut_cliente}-${order.cliente?.d_veri_cli}`, 15, currentY);
      currentY += 8;
      pdf.text(`Nombre: ${order.cliente?.nom_cli} ${order.cliente?.ap_cli}`, 15, currentY);
      currentY += 8;
      pdf.text(`Celular: ${order.cliente?.cel_cli}`, 15, currentY);

      currentY += 12;

      // Datos del equipo
      pdf.setFontSize(14);
      checkPageOverflow(20);
      pdf.text('DATOS DEL EQUIPO', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(`Modelo: ${order.Equipo?.mod_equipo}`, 15, currentY);
      currentY += 8;
      pdf.text(`N° Serie: ${order.num_equipo}`, 15, currentY);

      currentY += 12;

      // Detalles de la orden
      pdf.setFontSize(14);
      checkPageOverflow(20);
      pdf.text('DETALLES DE LA ORDEN', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);

      detalles.forEach((detalle) => {
        checkPageOverflow(16);
        pdf.text(`Servicio: ${detalle.Servicio?.nom_serv || 'N/A'}`, 15, currentY);
        currentY += 6;
        pdf.text(`Descripción: ${detalle.desc_detalle}`, 15, currentY);
        currentY += 10;
      });

      // Solicitudes asociadas
      pdf.setFontSize(14);
      checkPageOverflow(20);
      pdf.text('SOLICITUDES ASOCIADAS', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);

      solicitudes.forEach((solicitud) => {
        checkPageOverflow(36);
        pdf.text(`ID Solicitud: ${solicitud.id_sol}`, 15, currentY);
        currentY += 6;
        pdf.text(`Descripción: ${solicitud.desc_sol}`, 15, currentY);
        currentY += 6;
        pdf.text(`Estado: ${solicitud.id_estado_ot}`, 15, currentY);
        currentY += 6;
        pdf.text(`Fecha de vista: ${solicitud.fecha_vista}`, 15, currentY);
        currentY += 6;
        pdf.text(`Fecha de emisión: ${solicitud.fecha_emision}`, 15, currentY);
        currentY += 6;
        pdf.text(`Fecha de término: ${solicitud.fecha_termino}`, 15, currentY);
        currentY += 10;
      });

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}

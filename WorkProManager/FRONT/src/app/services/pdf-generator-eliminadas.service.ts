import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { newOrder } from '../interfaces/newOrder';
import { DetalleOT } from '../interfaces/detalle_ot';
import { Solicitud } from '../interfaces/solicitud';
import { DetalleCausaRechazo } from '../interfaces/detalle_causa_rechazo';
import { Adjudicacion } from '../interfaces/adjudicacion';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorEliminadasService {
  generatePDFContent(order: newOrder, detalles: DetalleOT[], solicitudes: Solicitud[], detalle_causa_rechazos: DetalleCausaRechazo[], adjudicaciones: Adjudicacion[], fileName: string): void {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;
      let currentY = 20;

      // Styles
      const primaryColor = '#0046ad';
      const secondaryColor = '#ffe600';
      const font = 'helvetica';
      pdf.setFont(font);

      const addNewPage = () => {
        pdf.addPage();
        currentY = margin;
        // Add header to new page
        pdf.setFillColor(primaryColor);
        pdf.rect(margin, margin, pageWidth - 2 * margin, 15, 'F');
        pdf.setTextColor('#FFFFFF');
        pdf.setFontSize(12);
        pdf.text('ORDEN DE TRABAJO', pageWidth / 2, margin + 14, { align: 'center' });
        pdf.setTextColor('#000000');
        currentY += 20;
      };

      const checkPageOverflow = (increment: number) => {
        if (currentY + increment > pageHeight - margin) {
          addNewPage();
        }
      };

      const drawTableHeader = (title: string) => {
        checkPageOverflow(15);
        pdf.setFillColor(primaryColor);
        pdf.rect(margin, currentY, pageWidth - 2 * margin, 10, 'F');
        pdf.setTextColor('#FFFFFF');
        pdf.setFontSize(12);
        pdf.text(title, pageWidth / 2, currentY + 9, { align: 'center' });
        pdf.setTextColor('#000000');
        currentY += 15;
      };

      const addTextRow = (label: string, value: string, x: number, maxWidth: number) => {
        pdf.setFontSize(10);
        const splitText = pdf.splitTextToSize(`${label}: ${value}`, maxWidth);
        pdf.text(splitText, x, currentY + 3);
        currentY += splitText.length * 5;
      };

      // Header
      const logoUrl = 'https://i.imgur.com/kTQg9EM.png';
      pdf.addImage(logoUrl, 'PNG', margin, margin, 40, 15);
      pdf.setFontSize(16);
      pdf.setTextColor(primaryColor);
      pdf.text('ORDEN DE TRABAJO', pageWidth / 2, 24, { align: 'center' });
      currentY += 25;

      // Información General
      drawTableHeader('INFORMACIÓN GENERAL');
      addTextRow('OT N°', order.id_ot?.toString() || 'N/A', margin, 80);
      addTextRow('Finalizada por', `${order.VistaUltimaAdjudicacion?.nom_usu || ''} ${order.VistaUltimaAdjudicacion?.ap_usu || ''}`, pageWidth / 2, 80);
      addTextRow('Fecha creación', new Date(order.fec_creacion).toLocaleDateString(), margin, 80);
      addTextRow('Fecha entrega', new Date(order.fec_entrega).toLocaleDateString(), pageWidth / 2, 80);

      // Datos del Cliente
      drawTableHeader('DATOS DEL CLIENTE');
      addTextRow('RUT', `${order.rut_cliente}-${order.cliente?.d_veri_cli}`, margin, 80);
      addTextRow('Nombre', `${order.cliente?.nom_cli} ${order.cliente?.ap_cli}`, pageWidth / 2, 80);
      addTextRow('Celular', order.cliente?.cel_cli || 'N/A', margin, 80);

      // Datos del Equipo
      drawTableHeader('DATOS DEL EQUIPO');
      addTextRow('Modelo', order.Equipo?.mod_equipo || 'N/A', margin, 80);
      addTextRow('N° Serie', order.num_equipo?.toString() || 'N/A', pageWidth / 2, 80);

      // Detalles de la Orden
      drawTableHeader('DETALLES DE LA ORDEN');
      detalles.forEach((detalle, index) => {
        checkPageOverflow(20);
        pdf.setFillColor(index % 2 === 0 ? '#f2f2f2' : '#ffffff');
        pdf.rect(margin, currentY, pageWidth - 2 * margin, 15, 'F');
        addTextRow('Servicio', detalle.Servicio?.nom_serv || 'N/A', margin + 2, 80);
        addTextRow('Descripción', detalle.desc_detalle || 'N/A', pageWidth / 2, 80);
        currentY += 5;
      });

      // Adjudicaciones
      drawTableHeader('ADJUDICACIONES');
      adjudicaciones.forEach((adjudicacion, index) => {
        checkPageOverflow(20);
        pdf.setFillColor(index % 2 === 0 ? '#f2f2f2' : '#ffffff');
        pdf.rect(margin, currentY, pageWidth - 2 * margin, 20, 'F');
        addTextRow('Rut', `${adjudicacion.rut_usuario}-${adjudicacion.Usuario?.d_veri_usu || ''}`, margin + 2, 60);
        addTextRow('Nombre', `${adjudicacion.Usuario?.nom_usu || ''} ${adjudicacion.Usuario?.ap_usu || ''}`, margin + 70, 60);
        addTextRow('Fecha', adjudicacion.fecha_adjudicacion?.toString() || 'N/A', pageWidth / 2 + 20, 60);
        currentY += 5;
      });

      // Solicitudes Asociadas
      drawTableHeader('SOLICITUDES ASOCIADAS');
      solicitudes.forEach((solicitud, index) => {
        checkPageOverflow(50);
        pdf.setFillColor(index % 2 === 0 ? '#f2f2f2' : '#ffffff');
        pdf.rect(margin, currentY, pageWidth - 2 * margin, 45, 'F');
        addTextRow('ID Solicitud', solicitud.id_sol?.toString() || 'N/A', margin + 2, 80);
        addTextRow('Descripción', solicitud.desc_sol || 'N/A', margin + 2, pageWidth - 4 * margin);
        addTextRow('Estado', solicitud.id_estado_ot?.toString() || 'N/A', margin + 2, 80);
        addTextRow('Fecha de vista', solicitud.fecha_vista?.toString() || 'N/A', pageWidth / 2, 80);
        addTextRow('Fecha de emisión', solicitud.fecha_emision?.toString() || 'N/A', margin + 2, 80);
        addTextRow('Fecha de término', solicitud.fecha_termino?.toString() || 'N/A', pageWidth / 2, 80);
        currentY += 5;
      });

      // Detalles del rechazo de la OT
      drawTableHeader('CAUSA DEL RECHAZO DE LA OT');
      detalle_causa_rechazos.forEach((detallecausa, index) => {
        checkPageOverflow(20);
        pdf.setFillColor(index % 2 === 0 ? '#f2f2f2' : '#ffffff');
        pdf.rect(margin, currentY, pageWidth - 2 * margin, 15, 'F');
        addTextRow('Causa del rechazo', detallecausa.Causa_rechazo?.nombre_rechazo || 'N/A', margin + 2, 80);
        addTextRow('Observaciones', detallecausa.observaciones || 'N/A', pageWidth / 2, 80);
        currentY += 5;
      });

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}
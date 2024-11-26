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
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;
      let currentY = 20;

      // Estilo general
      const primaryColor = '#0046ad'; // Azul
      const secondaryColor = '#ffe600'; // Amarillo
      const font = 'IBMPlexSans-Regular';

      // Fuente personalizada
      pdf.setFont('IBMPlexSans-Regular', 'normal');

      // Encabezado: Logo y título
      const logoUrl = 'https://i.imgur.com/kTQg9EM.png';
      pdf.addImage(logoUrl, 'PNG', 10, 10, 40, 15); // Ajustar proporción del logo
      pdf.setFontSize(16);
      pdf.setTextColor(primaryColor);
      pdf.text('ORDEN DE TRABAJO', 80, 20); // Alinear con el logo

      currentY += 25; // Ajustar espacio debajo del encabezado

      const addNewPage = () => {
        pdf.addPage();
        currentY = margin;
      };

      const checkPageOverflow = (increment: number) => {
        if (currentY + increment > pageHeight - margin) {
          addNewPage();
        }
      };

      // Estilo de encabezado de tabla
      const drawTableHeader = (x: number, y: number, width: number, height: number, title: string) => {
        pdf.setFillColor(primaryColor);
        pdf.rect(x, y, width, height, 'F');
        pdf.setTextColor('#FFFFFF'); // Texto blanco
        pdf.setFontSize(12);
        pdf.setFont(font, 'normal');
        pdf.text(title, x + 5, y + 7);
        pdf.setTextColor('#000000'); // Restaurar color texto
        currentY += height;
      };

      // Información General
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'INFORMACIÓN GENERAL');
      pdf.setFontSize(10);
      pdf.text(`OT N°: ${order.id_ot}`, 12, currentY + 5);
      pdf.text(`Creada por: ${order.VistaUltimaAdjudicacion?.nom_usu} ${order.VistaUltimaAdjudicacion?.ap_usu}`, 80, currentY + 5);
      pdf.text(`Fecha creación: ${new Date(order.fec_creacion).toLocaleDateString()}`, 12, currentY + 10);
      pdf.text(`Fecha entrega: ${new Date(order.fec_entrega).toLocaleDateString()}`, 80, currentY + 10);
      currentY += 15;

      // Datos del Cliente
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DATOS DEL CLIENTE');
      pdf.text(`RUT: ${order.rut_cliente}-${order.cliente?.d_veri_cli}`, 12, currentY + 5);
      pdf.text(`Nombre: ${order.cliente?.nom_cli} ${order.cliente?.ap_cli}`, 80, currentY + 5);
      pdf.text(`Celular: ${order.cliente?.cel_cli}`, 150, currentY + 5);
      currentY += 15;

      // Datos del Equipo
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DATOS DEL EQUIPO');
      pdf.text(`Modelo: ${order.Equipo?.mod_equipo}`, 12, currentY + 5);
      pdf.text(`N° Serie: ${order.num_equipo}`, 80, currentY + 5);
      currentY += 15;

      // Detalles de la Orden
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DETALLES DE LA ORDEN');
      pdf.text('Servicio', 12, currentY + 5);
      pdf.text('Descripción', 80, currentY + 5);
      currentY += 10;

      detalles.forEach((detalle) => {
        checkPageOverflow(10);
        pdf.rect(10, currentY, 190, 10);
        pdf.text(`${detalle.Servicio?.nom_serv || 'N/A'}`, 12, currentY + 7);
        pdf.text(`${detalle.desc_detalle}`, 80, currentY + 7);
        currentY += 10;
      });

      // Solicitudes Asociadas
      checkPageOverflow(25);
      drawTableHeader(10, currentY + 7, 190, 10, 'SOLICITUDES ASOCIADAS');

      solicitudes.forEach((solicitud) => {
        checkPageOverflow(36);

        // Dibujar el recuadro para una solicitud
        pdf.rect(10, currentY + 7, 190, 36); // Rectángulo principal

        // Líneas internas
        const lineYPositions = [currentY + 7, currentY + 12, currentY + 18, currentY + 24, currentY + 30];
        lineYPositions.forEach((lineY) => {
          pdf.line(10, lineY, 200, lineY); // Líneas horizontales
        });

        // Datos dentro del recuadro
        pdf.text(`ID Solicitud: ${solicitud.id_sol}`, 15, currentY + 11);
        pdf.text(`Descripción: ${solicitud.desc_sol || 'N/A'}`, 15, currentY + 17);
        pdf.text(`Estado: ${solicitud.id_estado_ot || 'N/A'}`, 15, currentY + 22);
        pdf.text(`Fecha de vista: ${solicitud.fecha_vista || 'N/A'}`, 15, currentY + 28);
        pdf.text(`Fecha de emisión: ${solicitud.fecha_emision || 'N/A'}`, 15, currentY + 35);
        pdf.text(`Fecha de término: ${solicitud.fecha_termino || 'N/A'}`, 15, currentY + 40);

        // Espaciado entre solicitudes
        currentY += 38; // Altura del recuadro más margen
      });

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}

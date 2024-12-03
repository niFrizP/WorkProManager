import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { OrdenTrabajo } from '../interfaces/ordenTrabajo';
import '../assets/fonts/IBMPlexSans-Regular-normal.js';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  generatePDFContent(order: OrdenTrabajo, fileName: string): void {
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
      pdf.addImage(logoUrl, 'PNG', 10, 10, 40, 15);
      pdf.setFontSize(16);
      pdf.setTextColor(primaryColor);
      pdf.setFillColor(secondaryColor);
      pdf.text('ORDEN DE TRABAJO', 80, 20);
      pdf.setFontSize(12);

      currentY += 25;

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
        pdf.setTextColor('#FFFFFF');
        pdf.setFontSize(12);
        pdf.setFont(font, 'normal');
        pdf.text(title, x + 5, y + 7);
        pdf.setTextColor('#000000');
        currentY += height;
      };

      // Información General
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'INFORMACIÓN GENERAL');
      pdf.setFontSize(10);
      pdf.text(`OT N°: ${order.id_ot}`, 12, currentY + 15);
      pdf.text(`Fecha creación: ${new Date(order.fec_creacion).toLocaleDateString()}`, 12, currentY + 22);
      pdf.text(`Fecha término: ${new Date(order.fec_ter).toLocaleDateString()}`, 12, currentY + 29);
      currentY += 35;

      // Datos del Equipo
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DATOS DEL EQUIPO');
      pdf.text(`Tipo: ${order.Equipo.tip_equ}`, 12, currentY + 15);
      pdf.text(`Modelo: ${order.Equipo.mod_equ}`, 12, currentY + 22);
      pdf.text(`Número de serie: ${order.num_ser}`, 12, currentY + 29);
      currentY += 35;

      // Descripción
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DESCRIPCIÓN');
      pdf.text(order.desc_ot || 'Sin descripción', 12, currentY + 15);
      currentY += 25;

      // Datos del Cliente
      checkPageOverflow(25);
      drawTableHeader(10, currentY, 190, 10, 'DATOS DEL CLIENTE');
      pdf.text(`Nombre: ${order.Cliente.nom_cli} ${order.Cliente.ape_cli}`, 12, currentY + 15);
      pdf.text(`RUT: ${order.Cliente.rut_cli}-${order.Cliente.d_ver_cli}`, 12, currentY + 22);
      pdf.text(`Dirección: ${order.Cliente.dir_cli}`, 12, currentY + 29);
      pdf.text(`Teléfono: ${order.Cliente.tel_cli}`, 12, currentY + 36);
      pdf.text(`Email: ${order.Cliente.email_cli}`, 12, currentY + 43);
      currentY += 50;

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}
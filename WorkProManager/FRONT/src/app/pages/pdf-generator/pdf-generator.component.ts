import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Error tipográfico corregido (html12canvas → html2canvas)
import { Solicitud } from '../../interfaces/solicitud';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { newOrder } from '../../interfaces/newOrder';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css'
})
export class PdfGeneratorComponent {

  generatePDFContent(
    order: newOrder,
    detalles: DetalleOT[],
    solicitudes: Solicitud[], // Nuevo parámetro para las solicitudes
    fileName: string
  ): void {
    try {
      const pdf = new jsPDF();

      pdf.setFont('helvetica');

      // Título principal
      pdf.setFontSize(20);
      pdf.text('ORDEN DE TRABAJO', 105, 20, { align: 'center' });

      // Información general
      pdf.setFontSize(12);
      let currentY = 40; // Controla la posición vertical
      pdf.text(`OT N°: ${order.id_ot || 'N/A'}`, 15, currentY);
      currentY += 8;
      pdf.text(`Creada por: ${order.VistaUltimaAsignacion?.nom_trab || 'N/A'} ${order.VistaUltimaAsignacion?.ape_trab || ''}`, 15, currentY);
      currentY += 8;
      pdf.text(`Fecha de creación: ${new Date(order.fec_creacion).toLocaleDateString()}`, 15, currentY);
      currentY += 8;
      pdf.text(`Fecha estimada de entrega: ${new Date(order.fec_ter).toLocaleDateString()}`, 15, currentY);

      // Espacio entre secciones
      currentY += 12;

      // Datos del cliente
      pdf.setFontSize(14);
      pdf.text('DATOS DEL CLIENTE', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(`RUT: ${order.rut_cliente}-${order.cliente?.d_veri_cli || ''}`, 15, currentY);
      currentY += 8;
      pdf.text(`Nombre: ${order.cliente?.nom_cli || ''} ${order.cliente?.ape_cli || ''}`, 15, currentY);
      currentY += 8;
      pdf.text(`Teléfono: ${order.cliente?.tel_cli || 'N/A'}`, 15, currentY);
      currentY += 8;
      pdf.text(`Email: ${order.cliente?.email_cli || 'N/A'}`, 15, currentY);

      // Espacio entre secciones
      currentY += 12;

      // Datos del equipo
      pdf.setFontSize(14);
      pdf.text('DATOS DEL EQUIPO', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(`Número de serie: ${order.equipo?.num_ser || 'N/A'}`, 15, currentY);
      currentY += 8;
      pdf.text(`Marca: ${order.equipo?.nom_marca || 'N/A'}`, 15, currentY);

      // Espacio entre secciones
      currentY += 12;

      // Detalles de la orden
      pdf.setFontSize(14);
      pdf.text('DETALLES DE LA ORDEN', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);

      detalles.forEach((detalle, index) => {
        const detalleStartY = currentY + index * 16; // Incremento suficiente para evitar solapamiento
        pdf.text(`Servicio: ${detalle.Servicio?.nom_serv || 'N/A'}`, 15, detalleStartY);
        pdf.text(`Descripción: ${detalle.desc_detalle}`, 15, detalleStartY + 6);
      });

      // Espacio entre secciones
      currentY += detalles.length * 16 + 12;

      // Solicitudes asociadas
      pdf.setFontSize(14);
      pdf.text('SOLICITUDES', 15, currentY);
      currentY += 8;
      pdf.setFontSize(12);

      solicitudes.forEach((solicitud, index) => {
        const solicitudStartY = currentY + index * 12;
        pdf.text(`ID Solicitud: ${solicitud.id_sol}`, 15, solicitudStartY);
        pdf.text(`Descripción: ${solicitud.desc_sol}`, 15, solicitudStartY + 6);
      });

      // Guardar archivo
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }
}
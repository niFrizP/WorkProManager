import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { newOrder } from '../interfaces/newOrder';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  generatePDFContent(order: newOrder, fileName: string, download: boolean) {
    try {
      const pdf = new jsPDF();
      
      pdf.setFont("helvetica");

      pdf.setFontSize(20);
      pdf.text("ORDEN DE TRABAJO", 105, 20, { align: "center" });
      
      pdf.setFontSize(12);
      pdf.text("WorkProManager", 15, 40);
      pdf.text("Dirección: Av. Example 123", 15, 48);
      pdf.text("Teléfono: +56 9 1234 5678", 15, 56);
      
      pdf.setFontSize(14);
      pdf.text(`OT N°: ${order.id_ot}`, 15, 76);
      pdf.text(`Fecha: ${new Date(order.fec_entrega).toLocaleDateString()}`, 15, 84);
      
      pdf.setFontSize(12);
      pdf.text("DATOS DEL CLIENTE", 15, 100);
      pdf.text(`RUT: ${order.rut_cliente}`, 15, 108);

      pdf.text("DATOS DEL EQUIPO", 15, 124);
      pdf.text(`Modelo: ${order.Equipo.mod_equipo}`, 15, 132);
      pdf.text(`N° Serie: ${order.num_equipo}`, 15, 140);
    
      pdf.text("DESCRIPCIÓN DEL SERVICIO", 15, 156);
      pdf.text(String(order.descripcion || ''), 15, 164);
      
      pdf.text("ESTADO DE LA ORDEN", 15, 180);
      pdf.text(`Estado: ${order.EstadoOT.nom_estado_ot}`, 15, 188);
      pdf.text(`Técnico: ${order.Usuario.nom_usu}`, 15, 196);

      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }

  constructor() { }
}

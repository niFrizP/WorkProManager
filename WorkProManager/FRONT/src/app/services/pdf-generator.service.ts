import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  generatePDFContent(content: string, fileName: string) {
    const pdf = new jsPDF();
    pdf.html(content, {
      callback: (doc) => {
        doc.save(fileName);
      },
      x:15,
      y: 15,
      width: 190 // Ajusta el ancho según sea necesario
    });
  }
  
  constructor() { }
}

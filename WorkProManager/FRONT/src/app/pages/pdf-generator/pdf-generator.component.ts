import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html12canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css'
})
export class PdfGeneratorComponent {

  generatePDF() {
    const data = document.getElementById('pdf-content') as HTMLElement;
    html12canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const  pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('ordenes_de_trabajo.pdf');
    });
  }
}

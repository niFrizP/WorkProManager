import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-pdfviewer',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './pdfviewer.component.html',
  styleUrl: './pdfviewer.component.css'
})
export class PdfviewerComponent {

}

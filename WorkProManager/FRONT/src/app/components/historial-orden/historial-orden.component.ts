import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialOrden } from '../../interfaces/historial-orden';


@Component({
  selector: 'app-historial-orden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-orden.component.html'
})
export class HistorialOrdenComponent {
  @Input() isOpen = false;
  @Input() idOt?: number;
  @Output() closeModal = new EventEmitter<void>();

  historial: HistorialOrden[] = [
    {
      id_hist_ot: 1,
      id_ot: 1,
      fec_cambio: new Date(),
      desc_ot_old: 'Descripción anterior',
      desc_ot_new: 'Nueva descripción',
      fec_ter_old: new Date('2024-03-20'),
      fec_ter_new: new Date('2024-03-25'),
      det_adic_old: 'Detalles anteriores',
      det_adic_new: 'Nuevos detalles',
      num_ser_old: 'SER-001',
      num_ser_new: 'SER-002',
      id_estado_old: 1,
      id_estado_new: 2,
      motiv_rec_old: 'Motivo anterior',
      motiv_rec_new: 'Nuevo motivo',
      old_rut_cli: 12345678,
      new_rut_cli: 87654321
    }
  ];

  close() {
    this.closeModal.emit();
  }
}

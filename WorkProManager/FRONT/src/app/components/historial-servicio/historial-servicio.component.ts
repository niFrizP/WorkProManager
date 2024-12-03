import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialServicio } from '../../interfaces/historial-servicio';

@Component({
  selector: 'app-historial-servicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-servicio.component.html'
})
export class HistorialServicioComponent {
  @Input() isOpen = false;
  @Input() idOt?: number;
  @Input() idServ?: number;
  @Output() closeModal = new EventEmitter<void>();

  historial: HistorialServicio[] = [
    {
      id_hist_serv: 1,
      id_ot: 1,
      id_serv: 1,
      fecha_cambio_serv: new Date(),
      new_desc_serv: 'Nueva descripción del servicio',
      old_desc_serv: 'Descripción anterior del servicio',
      new_fec_inicio_serv: new Date('2024-03-25'),
      old_fec_inicio_serv: new Date('2024-03-20'),
      new_fec_ter_serv: new Date('2024-04-01'),
      old_fec_ter_serv: new Date('2024-03-30'),
      new_activo_serv: true,
      old_activo_serv: false,
      new_completado_serv: false,
      old_completado_serv: false
    }
  ];

  close() {
    this.closeModal.emit();
  }
}

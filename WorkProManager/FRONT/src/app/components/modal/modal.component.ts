import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() id_ot: number = 0;
  @Output() closed = new EventEmitter<void>();

  solicitudes: Solicitud[] = [];
  solicitudForm: FormGroup;  // Define el FormGroup para el formulario

  constructor(
    public solicitudService: SolicitudService,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con controles vacíos
    this.solicitudForm = this.fb.group({
      id_sol: [null],
      id_ot: [null],
      desc_sol: [''],
      id_estado_ot: [null],
      fecha_vista: [null],
      fecha_emision: [null],
      fecha_termino: [null],
      fecha_plazo: [null]

    });
  }

  ngOnInit() {
    console.log('ModalComponent initialized');
    this.getot(this.id_ot);
  }

  getot(id_ot: number) {
    this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
      console.log(this.solicitudes);

      // Usa patchValue para actualizar los valores del formulario con la primera solicitud obtenida
      if (this.solicitudes.length > 0) {
        this.solicitudForm.patchValue(this.solicitudes[0]);
      }
    });
  }


 


  ngOnChanges(changes: SimpleChanges) {
    if (changes['id_ot']) {
      console.log('id_ot changed:', changes['id_ot'].currentValue);
      this.getot(changes['id_ot'].currentValue);  // Llama al método de obtención si `id_ot` cambia

      
    }
    
    
  }

  closeModal(event: MouseEvent) {
    event.preventDefault();
    this.closed.emit();
  }
}

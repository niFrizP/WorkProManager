import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-servicio-orden',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-orden.component.html'
})
export class ServicioOrdenComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();
  
  servicioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.servicioForm = this.fb.group({
      id_ot: [''],
      id_serv: [''],
      desc_serv: [''],
      fec_inicio_serv: [''],
      fec_ter_serv: [''],
      activo_serv: [false],
      completado_serv: [false]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.servicioForm.valid) {
      this.submitForm.emit(this.servicioForm.value);
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
    this.servicioForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  serviciosForm: FormGroup;
  servicios: any[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  constructor(private fb: FormBuilder) {
    this.serviciosForm = this.fb.group({
      nom_serv: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.serviciosForm.valid) {
      console.log(this.serviciosForm.value);
    }
  }

  deleteServicio(id: number) {
    // Aquí implementa la lógica para eliminar el servicio
    console.log('Eliminando servicio con ID:', id);
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
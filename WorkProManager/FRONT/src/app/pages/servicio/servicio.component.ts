import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  serviciosForm: FormGroup;
  servicios: Servicio[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService
  ) {
    this.serviciosForm = this.fb.group({
      nom_serv: ['']
    });
  }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    console.log('Cargando servicios...');
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        console.log('Servicios obtenidos:', data);
        this.servicios = data;
      },
      error: (error) => {
        console.error('Error al obtener servicios:', error);
      }
    });
  }

  onSubmit() {
    if (this.serviciosForm.valid) {
      const nuevoServicio: Servicio = this.serviciosForm.value;
      console.log('Creando nuevo servicio:', nuevoServicio);
      
      this.servicioService.createServicio(nuevoServicio).subscribe({
        next: (response) => {
          console.log('Servicio creado:', response);
          this.cargarServicios(); // Recargar la lista
          this.serviciosForm.reset(); // Limpiar el formulario
        },
        error: (error) => {
          console.error('Error al crear servicio:', error);
        }
      });
    }
  }

  deleteServicio(id: number) {
    if (confirm('¿Está seguro de eliminar este servicio?')) {
      console.log('Eliminando servicio:', id);
      this.servicioService.deleteServicio(id).subscribe({
        next: () => {
          console.log('Servicio eliminado correctamente');
          this.cargarServicios(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar servicio:', error);
        }
      });
    }
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
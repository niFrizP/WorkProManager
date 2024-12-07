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
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  showSuccessModal: boolean = false;
  servicioToDelete: number | null = null;
  showSuccessCreateModal: boolean = false;
  servicioForm: any;

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
      this.servicioForm = {...this.serviciosForm.value};
      this.showModal = true;
    }
  }

  confirmCreate() {
    this.servicioService.createServicio(this.servicioForm).subscribe({
      next: (response) => {
        this.cargarServicios();
        this.serviciosForm.reset();
        this.showModal = false;
        this.showSuccessCreateModal = true;
        setTimeout(() => {
          this.closeSuccessCreateModal();
        }, 3000);
      },
      error: (error) => {
        console.error('Error al crear servicio:', error);
      }
    });
  }

  cancelCreate() {
    this.showModal = false;
    this.servicioForm = null;
  }

  closeSuccessCreateModal() {
    this.showSuccessCreateModal = false;
  }

  deleteServicio(id: number) {
    this.servicioToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.servicioToDelete) {
      this.servicioService.deleteServicio(this.servicioToDelete).subscribe({
        next: () => {
          this.cargarServicios();
          this.showDeleteModal = false;
          this.servicioToDelete = null;
          this.showSuccessModal = true;
          setTimeout(() => {
            this.closeSuccessModal();
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar servicio:', error);
        }
      });
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.servicioToDelete = null;
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
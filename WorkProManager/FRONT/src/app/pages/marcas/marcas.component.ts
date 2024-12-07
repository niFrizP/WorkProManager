import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../interfaces/marca';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  showModal: boolean = false;
  showSuccessCreateModal: boolean = false;
  showDeleteModal: boolean = false;
  showSuccessModal: boolean = false;
  marcaForm: any;
  marcaToDelete: number | null = null;
  marcas: Marca[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService
  ) {
    this.marcaForm = this.fb.group({
      nom_marca: ['']
    });
  }

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    console.log('Cargando marcas...');
    this.marcaService.getMarcas().subscribe({
      next: (data) => {
        console.log('Marcas obtenidas:', data);
        this.marcas = data;
      },
      error: (error) => {
        console.error('Error al obtener marcas:', error);
      }
    });
  }

  onSubmit() {
    if (this.marcaForm.valid) {
      const marcaData = {...this.marcaForm.value};
      this.showModal = true;
      this.marcaForm = marcaData;
    }
  }

  confirmCreate() {
    this.marcaService.createMarca(this.marcaForm).subscribe({
      next: (response) => {
        this.cargarMarcas();
        this.marcaForm.reset();
        this.showModal = false;
        this.showSuccessCreateModal = true;
        this.marcaForm = this.fb.group({
          nom_marca: ['']
        });
        setTimeout(() => {
          this.closeSuccessCreateModal();
        }, 3000);
      },
      error: (error) => {
        console.error('Error al crear marca:', error);
      }
    });
  }

  cancelCreate() {
    this.showModal = false;
    this.marcaForm = this.fb.group({
      nom_marca: ['']
    });
  }

  closeSuccessCreateModal() {
    this.showSuccessCreateModal = false;
  }

  deleteMarca(id: number) {
    this.marcaToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.marcaToDelete) {
      this.marcaService.deleteMarca(this.marcaToDelete).subscribe({
        next: () => {
          this.cargarMarcas();
          this.showDeleteModal = false;
          this.marcaToDelete = null;
          this.showSuccessModal = true;
          setTimeout(() => {
            this.closeSuccessModal();
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar marca:', error);
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.marcaToDelete = null;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
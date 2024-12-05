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
  marcaForm: FormGroup;
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
      const nuevaMarca: Marca = this.marcaForm.value;
      console.log('Creando nueva marca:', nuevaMarca);
      
      this.marcaService.createMarca(nuevaMarca).subscribe({
        next: (response) => {
          console.log('Marca creada:', response);
          this.cargarMarcas(); // Recargar la lista
          this.marcaForm.reset(); // Limpiar el formulario
        },
        error: (error) => {
          console.error('Error al crear marca:', error);
        }
      });
    }
  }

  deleteMarca(id: number) {
    if (confirm('¿Está seguro de eliminar esta marca?')) {
      console.log('Eliminando marca:', id);
      this.marcaService.deleteMarca(id).subscribe({
        next: () => {
          console.log('Marca eliminada correctamente');
          this.cargarMarcas(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar marca:', error);
        }
      });
    }
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
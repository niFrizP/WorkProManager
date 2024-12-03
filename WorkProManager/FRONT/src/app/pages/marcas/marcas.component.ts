import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marcaForm: FormGroup;
  marcas: any[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.marcaForm = this.fb.group({
      nom_marca: ['']
    });
  }

  ngOnInit() {
    // Verificar tanto el userId como el token
    const rut_trab = localStorage.getItem('rut_trab');
    const token = localStorage.getItem('token'); // Asumiendo que guardas el token

    if (!rut_trab || !token) {
      this.router.navigate(['/login']);
      return;
    }

    // Si la autenticación es correcta, obtener las marcas
    this.getMarcas();
  }

  onPageChange(event: number) {
    this.page = event;
  }

  onSubmit() {
    if (this.marcaForm.valid) {
      console.log(this.marcaForm.value);
    }
  }

  deleteMarca(id: number) {
    this.marcaService.deleteMarca(id).subscribe({
      next: () => {
        // Actualizar la lista de marcas después de eliminar
        this.getMarcas();
      },
      error: (error: any) => {
        console.error('Error al eliminar marca:', error);
      }
    });
  }

  getMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (error) => {
        console.error('Error al obtener marcas:', error);
      }
    });
  }
}
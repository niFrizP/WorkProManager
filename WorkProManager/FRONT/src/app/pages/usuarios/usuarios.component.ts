import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrabajadorService } from '../../services/trabajador.service';
import { Trabajador } from '../../interfaces/trabajador';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
})
export class UsuariosComponent implements OnInit {
  usuarios: Trabajador[] = [];
  itemsPerPage: number = 10;
  page: number = 1;
  trabajadorForm: any;

  constructor(
    private fb: FormBuilder,
    private trabajadorService: TrabajadorService,
    private snackBar: MatSnackBar) {
    this.trabajadorForm = this.fb.group({
      rut_trab: ['', Validators.required],
      nom_trab: ['', Validators.required],
      ape_trab: ['', Validators.required],
      id_rol: ['', Validators.required],
      activo: ['', Validators.required],
      clave: ['', Validators.required],
      d_veri_trab: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarTrabajadores();
  }

  cargarTrabajadores() {
    console.log('Cargando trabajadores...');
    this.trabajadorService.getTecnicos().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar trabajadores:', error);
      }
    );
  }

  deleteUsuario(rut_trab: string) {
    // Mostrar un mensaje de confirmación antes de eliminar
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este trabajador?');

    if (confirmDelete) {
      this.trabajadorService.deleteTrabajador(rut_trab).subscribe(
        (data) => {
          this.snackBar.open('Trabajador eliminado con éxito', 'Cerrar', { duration: 3000 });
          console.log('Trabajador eliminado:', data);
          // Recargar la lista de trabajadores después de eliminar
          this.cargarTrabajadores();
        },
        (error) => {
          this.snackBar.open('Error al eliminar trabajador', 'Cerrar', { duration: 3000 });
          console.error('Error al eliminar trabajador:', error);
        }
      );
    }
  }


  onPageChange(event: number) {
    this.page = event;
  }
}
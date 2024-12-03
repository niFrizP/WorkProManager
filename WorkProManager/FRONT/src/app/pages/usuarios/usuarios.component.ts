import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrabajadorService } from '../../services/trabajador.service';
import { Trabajador } from '../../interfaces/trabajador';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
  ],
})
export class UsuariosComponent implements OnInit {
  usuarios: Trabajador[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  constructor(private trabajadorService: TrabajadorService) {}

  ngOnInit() {
    this.cargarTrabajadores();
  }

  cargarTrabajadores() {
    this.trabajadorService.getTecnicos().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar trabajadores:', error);
      }
    );
  }

  deleteUsuario(rut: number) {
    // Implementa la lógica para eliminar el usuario
    console.log('Eliminando usuario con RUT:', rut);
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
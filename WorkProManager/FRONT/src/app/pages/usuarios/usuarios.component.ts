import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: any[] = [];
  itemsPerPage: number = 10;
  page: number = 1;

  deleteUsuario(rut: string) {
    // Implementa la lógica para eliminar el usuario
    console.log('Eliminando usuario con RUT:', rut);
  }

  onPageChange(event: number) {
    this.page = event;
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Order } from '../../interfaces/order';
import { EquipoService } from '../../services/equipo.service';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../interfaces/usuario';
import { ServicioService } from '../../services/servicio.service';
import { newOrder } from '../../interfaces/newOrder';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  onFilterChange($event: Event) {
    throw new Error('Method not implemented.');
    }
    deleteOrder(arg0: number | undefined) {
    throw new Error('Method not implemented.');
    }
      usuarios: Usuario[] = [];
    
      
      
    
    
      filteredusuarios = this.usuarios;
      page = 1;
      itemsPerPage = 10;
    
      constructor(private usuarioservice: UsuarioService ,private usuarioService: UsuarioService, private equipoService: EquipoService, private clienteService: ClienteService, private servicioService: ServicioService) {}
    
      ngOnInit(): void {
        this.loadusuarios();
      }
    
      loadusuarios(): void {
        this.usuarioservice.getListUsuarios().subscribe(
          (data: Usuario[]) => {
            this.usuarios = data;
            console.log(this.usuarios.map(usuario => usuario.nom_usu));
            
          },
          (error) => {
            console.error('Error fetching usuarios', error);
          }
        );
      }
    
     
      filterusuarios(filter: string | null): void {
        if (filter === 'todas') {
          this.filteredusuarios = this.usuarios;
        } else {
        }
        this.page = 1; // Reiniciar a la primera página después del filtrado
      }
    
      onPageChange(page: number): void {
        this.page = page;
      }
    }
    

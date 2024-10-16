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
import { UsuarioEliminadoService } from '../../services/usuarioeliminado';

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
  
      usuarios: Usuario[] = [];
    
      
      
    
    
      filteredusuarios = this.usuarios;
      page = 1;
      itemsPerPage = 10;
    
      constructor(private usuarioEliminadoService:UsuarioEliminadoService,private usuarioservice: UsuarioService ,private usuarioService: UsuarioService, private equipoService: EquipoService, private clienteService: ClienteService, private servicioService: ServicioService) {}
    
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

      deleteUsuario(id_usuario: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          this.usuarioService.getUsuario(id_usuario).subscribe(
            (usuario: Usuario) => {
              this.usuarioEliminadoService.saveUsuario(usuario).subscribe(
                () => {
                  console.log('Orden registrada como eliminada', usuario);
                  this.usuarioservice.deleteUsuarios(id_usuario).subscribe(
                    () => {
                      console.log('Orden eliminada');
                      this.loadusuarios(); // Actualizar la lista de órdenes
                    },
                    (error) => {
                      console.error('Error eliminando la orden', error);
                      alert('Hubo un error al intentar eliminar la orden.');
                    }
                  );
                },
                (error) => {
                  console.error('Error registrando la orden eliminada', error);
                  alert('Hubo un error al registrar la orden eliminada.');
                }
              );
            },
            (error) => {
              console.error('Error obteniendo la orden', error);
              alert('No se pudo obtener la orden para eliminar.');
            }
          );
        }
      }
    }
    

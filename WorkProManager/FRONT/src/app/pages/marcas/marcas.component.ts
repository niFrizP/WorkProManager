/* import { Component, OnInit } from '@angular/core';
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
import { Marca } from '../../interfaces/marca';
import { MarcaService } from '../../services/marca.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, ReactiveFormsModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {

  onFilterChange($event: Event) {
    throw new Error('Method not implemented.');
    }
  
      marcas: Marca[] = [];
      marcaForm: FormGroup;
      form: FormGroup = new FormGroup({});
    
      
      
    
    
      filteredMarcas = this.marcas;
      page = 1;
      itemsPerPage = 10;
    
      constructor(private usuarioEliminadoService:UsuarioEliminadoService,private usuarioservice: UsuarioService ,private usuarioService: UsuarioService, private equipoService: EquipoService, private clienteService: ClienteService, private servicioService: ServicioService, private marcaService:MarcaService,    private fb: FormBuilder,
      ) {

        
        this.marcaForm = this.fb.group({
          rut_usuario: ['', [Validators.required]],
          d_veri_usu: ['', [Validators.required, Validators.maxLength(1)]],
          nom_usu: ['', [Validators.required]],
          ap_usu: ['', [Validators.required]],
          email_usu: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          cel_usu: ['', [Validators.required]],
          id_rol: ['', [Validators.required]]
        });
      
  
      this.marcaForm = this.fb.group({
        nom_marca: ['', [Validators.required]],
      });
      }

      ngOnInit(): void {
        this.loadmarcas();
      }

      onSubmit(): void {
        if (this.marcaForm.valid) {
          this.createOrUpdateMarca().then(
            (marca) => {
              console.log('Marca guardada', marca);
              this.loadmarcas(); // Actualiza la lista de marcas
            },
            (error) => {
              console.error('Error al guardar marca', error);
              alert('Hubo un error al guardar la marca.');
            }
          );
        } else {
          console.log('Formulario no válido');
        }
      }
      
    
      loadmarcas(): void {
        this.marcaService.getListMarcas().subscribe(
          (data: Marca[]) => {
            this.marcas = data;
            console.log(this.marcas.map(marca => marca.nom_marca));
            
          },
          (error) => {
            console.error('Error fetching usuarios', error);
          }
        );
      }

    private createOrUpdateMarca(): Promise<Marca> {
        return new Promise((resolve, reject) => {
          const marca: Marca = {
            nom_marca: this.marcaForm.value.nom_marca,
          };
          
          
            this.marcaService.saveMarca(marca).subscribe(
              (marca) => {
                resolve(marca);
              },
              (error) => {
                reject(error);
              }
            );
          
        });
      }
     
      filtermarcas(filter: string | null): void {
        if (filter === 'todas') {
          this.filteredMarcas = this.marcas;
        } else {
        }
        this.page = 1; // Reiniciar a la primera página después del filtrado
      }
    
      onPageChange(page: number): void {
        this.page = page;
      }

      deleteMarca(marca: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          this.marcaService.getMarca(marca).subscribe(
            (marcas: Marca) => {
              this.marcaService.saveMarca(marcas).subscribe(
                () => {
                  console.log('Orden registrada como eliminada', );
                  this.marcaService.deleteMarcas(marca).subscribe(
                    () => {
                      console.log('Orden eliminada');
                      this.loadmarcas(); // Actualizar la lista de órdenes
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
    
 */
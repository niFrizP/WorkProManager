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
import { CausaRechazo } from '../../interfaces/causa_rechazo';
import { CausaRechazoService } from '../../services/causa_rechazo.service';
import { Marca } from '../../interfaces/marca';
import { DetalleCausaRechazo } from '../../interfaces/detalle_causa_rechazo';
import { DetalleCausaRechazoService } from '../../services/detalle_causa_rechazo.service';
import { MarcaService } from '../../services/marca.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-causa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './causa.component.html',
  styleUrl: './causa.component.css'
})


export class CausaComponent {

  totalRechazos: number = 0;  // Para almacenar el conteo de rechazos
  detalleCausaRechazo: DetalleCausaRechazo[] = [];
  onFilterChange($event: Event) {
    throw new Error('Method not implemented.');
    }
  
      causas: CausaRechazo[] = [];
      causaForm: FormGroup;
      form: FormGroup = new FormGroup({});
    
      
      
    
    
      filteredMarcas = this.causas;
      page = 1;
      itemsPerPage = 10;
    
      constructor(private causaservice: CausaRechazoService ,private detalleCausaRechazoService:DetalleCausaRechazoService,private usuarioservice: UsuarioService ,private usuarioService: UsuarioService, private equipoService: EquipoService, private clienteService: ClienteService, private servicioService: ServicioService, private marcaService:MarcaService,    private fb: FormBuilder,
      ) {

        
        this.causaForm = this.fb.group({
          rut_usuario: ['', [Validators.required]],

        });
      
  
      this.causaForm = this.fb.group({
        nombre_rechazo: ['', [Validators.required]],
      });
      }

      ngOnInit(): void {
        this.loadcausas();
      }

      onSubmit(): void {
        if (this.causaForm.valid) {
          this.createOrUpdateCausa().then(
            (causa) => {
              console.log('Marca guardada', causa);
              this.loadcausas(); // Actualiza la lista de marcas
              this.getCountForCausa(causa);
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
      
    
      loadcausas(): void {
        this.causaservice.getListCausaRechazo().subscribe(
          (data: CausaRechazo[]) => {
            this.causas = data;
    
            // Por cada causa, obtenemos el count de detalle_causa_rechazo
            this.causas.forEach(causa => {
              if (causa.id_rechazo) {
                this.getCountDetalles(causa.id_rechazo);

              }
            });
    
            console.log(this.causas);
          },
          (error) => {
            console.error('Error fetching causas', error);
          }
        );
      }

    private createOrUpdateCausa(): Promise<CausaRechazo> {
        return new Promise((resolve, reject) => {
          const causa: CausaRechazo = {
            nombre_rechazo: this.causaForm.value.nombre_rechazo,
          };
          
          
            this.causaservice.savecausaRechazo(causa).subscribe(
              (causa) => {
                resolve(causa);
              },
              (error) => {
                reject(error);
              }
            );
          
        });
      }
     
      filtermarcas(filter: string | null): void {
        if (filter === 'todas') {
          this.filteredMarcas = this.causas;
        } else {
        }
        this.page = 1; // Reiniciar a la primera página después del filtrado
      }
    
      onPageChange(page: number): void {
        this.page = page;
      }

      deleteCausa(causa: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          this.causaservice.getCausaRechazo(causa).subscribe(
            (causas: CausaRechazo) => {
              this.causaservice.savecausaRechazo(causas).subscribe(
                () => {
                  console.log('Orden registrada como eliminada', );
                  this.causaservice.deletecausaRechazo(causa).subscribe(
                    () => {
                      console.log('Orden eliminada');
                      this.loadcausas(); // Actualizar la lista de órdenes
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


      getCountForCausa(causa: CausaRechazo): void {
        this.detalleCausaRechazoService.countRechazos(causa.id_rechazo!).subscribe(
            (count: number) => {
                causa.count = count;
            },
            (error) => {
                console.error(`Error fetching count for id_rechazo ${causa.id_rechazo}`, error);
            }
        );
    }
    
    getCountDetalles(id_rechazo: number): void {
      this.detalleCausaRechazoService.countRechazos(id_rechazo).subscribe(
        (count) => {
          const causa = this.causas.find(c => c.id_rechazo === id_rechazo);
          if (causa) {
            causa.count = count;  // Asigna el count de detalles
          }
        },
        (error) => {
          console.error('Error al obtener el conteo de detalles', error);
        }
      );
    }
      
      
    }
    


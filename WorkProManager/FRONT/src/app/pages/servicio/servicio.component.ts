import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servicio } from '../../interfaces/servicio';
import { ServicioService } from '../../services/servicio.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [ReactiveFormsModule, NgxPaginationModule, RouterModule, CommonModule],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css'
})
export class ServicioComponent {

  
    onFilterChange($event: Event) {
      throw new Error('Method not implemented.');
      }
    
        servicios: Servicio[] = [];
        serviciosForm: FormGroup;
        form: FormGroup = new FormGroup({});
      
        
        
      
      
        filteredServicios= this.servicios;
        page = 1;
        itemsPerPage = 10;
      
        constructor(  private servicioService: ServicioService,  private fb: FormBuilder
        ) {
  
          
          this.serviciosForm = this.fb.group({
            nom_serv: ['', [Validators.required]],
          });
        
    
       
        }
  
        ngOnInit(): void {
          this.loadservicios();
        }
  
        onSubmit(): void {
          if (this.serviciosForm.valid) {
            this.createOrUpdateServicio().then(
              (Servicio) => {
                console.log('Servicio guardada', Servicio);
                this.loadservicios(); // Actualiza la lista de marcas
              },
              (error) => {
                console.error('Error al guardar Servicio', error);
                alert('Hubo un error al guardar la Servicio.');
              }
            );
          } else {
            console.log('Formulario no válido');
          }
        }
        
      
        loadservicios(): void {
          this.servicioService.getListServicios().subscribe(
            (data: Servicio[]) => {
              this.servicios = data;
              console.log(this.servicios.map(Servicio => Servicio.id_serv));
              
            },
            (error) => {
              console.error('Error fetching usuarios', error);
            }
          );
        }
  
      private createOrUpdateServicio(): Promise<Servicio> {
          return new Promise((resolve, reject) => {
            const Servicio: Servicio = {
              nom_serv: this.serviciosForm.value.nom_serv,
            };
            
            
              this.servicioService.saveServicio(Servicio).subscribe(
                (Servicio) => {
                  resolve(Servicio);
                },
                (error) => {
                  reject(error);
                }
              );
            
          });
        }
       
        filterservicios(filter: string | null): void {
          if (filter === 'todas') {
            this.filteredServicios = this.servicios;
          } else {
          }
          this.page = 1; // Reiniciar a la primera página después del filtrado
        }
      
        onPageChange(page: number): void {
          this.page = page;
        }
  
        deleteServicio(Servicio: number): void {
          this.servicioService.deleteServicios(Servicio).subscribe(
            () => {
              console.log('Servicio borrada', Servicio);
              this.loadservicios(); // Actualiza la lista de marcas
            },
            (error) => {
              console.error('Error al borrar Servicio', error);
              alert('Hubo un error al borrar la Servicio.');
            }
          );
        }
      }



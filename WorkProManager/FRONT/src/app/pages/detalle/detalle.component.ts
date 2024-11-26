import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { firstValueFrom } from 'rxjs';

// Interfaces
import { Order } from '../../interfaces/order';
import { Servicio } from '../../interfaces/servicio';
import { Usuario } from '../../interfaces/usuario';
import { Marca } from '../../interfaces/marca';
import { Equipo } from '../../interfaces/equipo';
import { Cliente } from '../../interfaces/cliente';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { newOrder } from '../../interfaces/newOrder';
import { Solicitud } from '../../interfaces/solicitud';
import { orderEstado } from '../../interfaces/newOrder';

// Services
import { OrderService } from '../../services/order.service';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { MarcaService } from '../../services/marca.service';
import { ClienteService } from '../../services/cliente.service';
import { EquipoService } from '../../services/equipo.service';
import { SolicitudService } from '../../services/solicitud.service';
import { AuthService } from '../../services/auth.service';

// Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { error } from 'console';
import { EstadoOT } from '../../interfaces/estadoot';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent, FormsModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  onServiceChange($event: Event){
    throw new Error('Method not implemented.');
  }
  mostrarSelectServicio: boolean = false; 
  servicios: Servicio[] = []; // Inicialización como array vacío
  serviciosArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
  serviciosSeleccionados: any = []; // Cambia 'any' por el tipo adecuado
  servicioSeleccionado: number | null = null;
  selectedServicioNombre: string | null = null;
  selectedEstadoName: string | null = null;
  selectedEstadoID: number | null = null;
  selectedServicioID: number | null = null;
  usuarios: Usuario[] = [];
  marcas: Marca[] = [];
  newSolicitudId: number | null = null;
  newOrders: newOrder[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  public isMenuOpen: number | undefined = undefined; // Inicializado como 'undefined'
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;  // Add this line
  form: FormGroup;
  formDesc: FormGroup;
  estados: EstadoOT[] = [];
  loading: boolean = false;
  newDetalleOTId: number | null = null;
  d_estado: number = 0;
  isModalOpen = false;
  public id_ot: number ;
  solicitudes : Solicitud[] = [];
  public id_serv: number;
  nuevoServicio: string = ''; // Variable para almacenar el nuevo servicio
  operacion: string = 'Agregar ';
  isSubmitting: boolean = false;
  orderId: number | undefined;
  newOrderId: number | null = null; // Variable para almacenar el ID de la nueva orden
  orderDetails: newOrder | null = null;
  detalleOT: DetalleOT[] = [];
  division: number = 0;
  orderEstados: orderEstado[] = [];
  isloading: boolean = false;
  datatotal: number = 0
  datatotal2: number = 0
  resta: number = 0;



  constructor(
    private fb: FormBuilder,
    private _orderService:OrderService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private detalleOTService:DetalleOTService,
    private servicioService:ServicioService,
    private usuarioService:UsuarioService,
    private marcaService:MarcaService,
    private equipoService:EquipoService,
    private clienteService:ClienteService,
    private solicitudService:SolicitudService,
    public authService: AuthService
    
  ) {
    this.form = this.fb.group({
      id_ot: [null, Validators.required],
      id_serv: [null, Validators.required],
      nom_serv: [null, Validators.required],
      fecha_detalle: [null, Validators.required],
      desc_detalle: [null, Validators.required],
      rut_usuario: [null, Validators.required],
      
    });

    this.formDesc = this.fb.group({
      desc_sol: [null, Validators.required],
    });
    
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));
  }

  ngOnInit(): void {

    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));
    this.isMenuOpen = this.id_ot;
    this.loadServicios();

    this.loadUsuarios();
    this.loadDetalleServicio(this.id_ot, this.id_serv);
      
    this.obtenerCountTotal();
    this.obtenerCountXEstado();
    this.divisionCount();
    this.resta = this.datatotal2 - this.datatotal;
    console.log(this.resta);
    console.log(this.datatotal2);

    console.log(this.id_ot);
    console.log(this.id_serv);
    this.isloading = false;


    

    if (this.id_ot !== 0) {
      this.operacion = 'Editar ';
      
    }
  }
  
  private log(){
    console.log(this.id_ot);
  }

  loadUsuarios(){
    this.usuarioService.getListUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  loadServicios(){
    this.servicioService.getListServicios().subscribe((servicios: Servicio[]) => {
      this.servicios = servicios;
    });
  }


  loadDetalleServicio(id_ot: number, id_serv: number){
    if (this.id_serv === 0){
      this.loadDetalleByIDOT(this.id_ot);
      console.log("loadDetalleByIDOT");
    }
    else{
      this.loadDetalle(this.id_ot, this.id_serv);
      console.log("loadDetalle");
    }
  }

  
  loadDetalle(id: number, id_serv: number): Promise<DetalleOT[]> {
    return new Promise((resolve, reject) => {
      this.detalleOTService.getDetalleOt(id, id_serv).subscribe(
        (data: DetalleOT) => {
          this.form.patchValue({
            id_serv: data.id_serv,
            fecha_detalle: data.fecha_detalle,
            nom_serv: data.Servicio?.nom_serv || '',
            desc_detalle: data.desc_detalle,
            rut_usuario: data.rut_usuario,
          });
          console.log(data);
        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject(error); // Rechazando la promesa en caso de error
        }
      );
    });
  }

  loadDetalleByIDOT(id: number): Promise<DetalleOT[]> {
    return new Promise((resolve, reject) => {
      this.detalleOTService.getListDetalleOTByOTId(id).subscribe(
        (data: DetalleOT[]) => {
          this.form.patchValue({
            fecha_detalle: data[0].fecha_detalle,
            desc_detalle: data[0].desc_detalle,
            rut_usuario: data[0].rut_usuario,
          });
        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject(error); // Rechazando la promesa en caso de error
        }
      );
    });
  }
  
  
  private async createOrUpdateDetalle(): Promise<DetalleOT> {
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));

    const detalleData: DetalleOT = {
      id_ot: this.id_ot,
      id_serv: this.id_serv !== 0 ? this.id_serv : this.form.get('id_serv')?.value,
      fecha_detalle: this.form.get('fecha_detalle')?.value,
      desc_detalle: this.form.get('desc_detalle')?.value,
      rut_usuario: this.form.get('rut_usuario')?.value,
      d_estado: 1
    };

    console.log(detalleData);

    try {
      const existingDetalleOT = await this.detalleOTService.getDetalleOt(detalleData.id_ot!, detalleData.id_serv!).toPromise().catch((error) => {
        if (error.status === 404) {
          return null; // No order found, proceed to create
        }
        throw error; // Rethrow other errors
      });

      if (existingDetalleOT) {
        // Update existing order
        const updateDetalleOT = await this.detalleOTService.updateDetalleOT(detalleData.id_ot!, detalleData.id_serv!, detalleData).toPromise();
        if (!updateDetalleOT) throw new Error('Failed to update detalle');
        return updateDetalleOT;
      } else {
        // Create a new order
        const newDetalleOT = await this.detalleOTService.saveDetalleOT(detalleData).toPromise();
        if (!newDetalleOT) {
          throw new Error('Failed to create detalle');
        }
        return newDetalleOT as DetalleOT;
      
  
      }
    } catch (error) {
      console.error('Error creating or updating the detalle:', error);
      throw error;
    }
  }
  
  async editProduct(): Promise<void> {
    this.loading = true;

    if (this.isSubmitting) return; // Si ya se está enviando, no hacer nada
    this.isSubmitting = true; // Desactivar el botón
    try {

      const detalleOT = await this.createOrUpdateDetalle();



      // Log the JSON representation of the order

      const id = this.form.get('id_ot')?.value; // Asegúrate de obtener el ID de la orden de trabajo (ot)

      // Utiliza updateOrder en lugar de saveOrder

      this.loading = false;
    } catch (error) {
      console.error('Error creating order:', error);
      this.loading = false;
      // Handle error (e.g., show error message to user)
    }

    setTimeout(() => {
      // Lógica de éxito o error aquí
      console.log(this.orderDetails);
      console.log("Orden de trabajo guardada");
      this.isSubmitting = false; // Rehabilitar el botón después de completar
    }, 2000); // Simulación de un retraso de 2 segundos

  }

  public cancelUpdate(): void {
    this.closeModal();  // Solo cierra el modal sin hacer nada más
    
  
  }

  toggleMenu(id_ot: number | undefined): void {
    console.log("ID de la orden:", id_ot);
    if (id_ot === undefined) {
      console.log("No existe una orden con un id válido.");
      return;
    }
    
    // Si `isMenuOpen` ya es el `id_ot` actual, ciérralo; de lo contrario, ábrelo
    this.isMenuOpen = this.isMenuOpen === id_ot ? undefined : id_ot;
    console.log("Estado de isMenuOpen:", this.isMenuOpen);
  }


  onServicioChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedServicio = this.servicios.find(servicio => servicio.id_serv?.toString() === selectedId);
    if (selectedServicio) {
      this.selectedServicioNombre = selectedServicio.nom_serv;
      this.selectedServicioID = selectedServicio.id_serv ?? null;
      this.form.patchValue({ id_serv: this.selectedServicioID });
    }else{
      this.selectedServicioNombre = null;
      this.selectedServicioID = null;
      this.form.patchValue({ id_serv: null });
    }
  }
  
  public openModal(id_ot:number): void {
    
    this.id_ot = id_ot; // Asigna el `id_ot` a la propiedad `id_ot`
    this.isModalOpen = true;

    

  }


  public onUserChange(event: Event, id_ot: number): void {

    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEstado = this.estados.find(estado => estado.id_estado_ot?.toString() === selectedId);
    
    if (selectedEstado) {
      this.selectedEstadoName = selectedEstado.nom_estado_ot;
      this.selectedEstadoID = selectedEstado.id_estado_ot ?? null;
      console.log(this.selectedEstadoID);
      
      // Actualiza el valor en el formulario
      this.form.patchValue({ id_estado_ot: this.selectedEstadoID });
      console.log(this.form.value);
      
      // Emitir el evento al componente padre

      this.openModal(id_ot);


      // Cerrar el menú
    }


  }


  

  async anotherAction() {

    
    
    try {
      // Datos que se envían para la actualización, cambiando d_estado a 1
      const detalleData: DetalleOT = {
        id_ot: this.id_ot,
        id_serv: this.id_serv,
        fecha_detalle: this.form.get('fecha_detalle')?.value,
        desc_detalle: this.form.get('desc_detalle')?.value,
        rut_usuario: this.form.get('rut_usuario')?.value,
        d_estado: 1
      };
  
      
  
      this.d_estado = 1;

      // Actualiza el detalle
      await this.detalleOTService.updateDetalleOT(this.id_ot, this.id_serv, detalleData).toPromise();
      console.log('Detalle actualizado exitosamente.');
  
      // Usa Promise.all para obtener los resultados antes de cargar datos adicionales
      const [divisionResult, countXEstadoResult] = await Promise.all([
        this.divisionCount(),
        this.obtenerCountXEstado()
      ]);
  
      // Ahora tienes los resultados resueltos y puedes usarlos
      console.log('Resultado de divisionCount:', divisionResult);
      console.log('Resultado de obtenerCountXEstado:', countXEstadoResult);
  
      // Carga datos y verifica condiciones después de obtener los resultados
      this.cargarDatosYVerificarCondiciones();
    } catch (error) {
      console.error('Error durante anotherAction:', error);
    }
  }
  
  
// Función para cargar datos y verificar condiciones
cargarDatosYVerificarCondiciones() {
  Promise.all([this.divisionCount(), this.obtenerCountXEstado()])
    .then(() => {
      if (this.division === 100 && this.datatotal !== 0) {
        console.log(this.divisionCount());
        console.log(this.obtenerCountXEstado());
        this.openModal(this.id_ot);
        this.detalleOTService.updateDetalleOTByDigito(this.id_ot, this.id_serv, 1).subscribe({
          next: () => {
            console.log('Detalle updated successfully');
          },
        });

      
      } else if (this.division !== 100 && this.datatotal !== 0) {
        console.log("Orden de trabajo en proceso");
        
        Swal.fire({
          title: '¡Tarea Completada!',
          html: `<p>Has completado un <strong>${this.datatotal}</strong> de <strong>${this.datatotal2}</strong> órdenes de trabajo.</p>`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          background: '#f9f9f9',
          color: '#333',
          confirmButtonColor: '#3085d6'
        });
      }
    })
    .catch(error => {
      console.error("Error al cargar datos:", error);
    });
}


public async createorupdateSolicitud(id_ot:number | null, id_estado_ot:number| null): Promise<Solicitud> {




  const solicitudData: Solicitud = {
    id_ot: id_ot ?? 0, // Ensure id_ot is not null
    id_estado_ot: 4, // Ensure id_estado_ot is not null
    desc_sol: this.formDesc.get('desc_sol')?.value,
    isView: false,
    fecha_emision: new Date(),
    fecha_termino: null, 
    completada: false,
    fecha_plazo: new Date(Date.now() + 60 * 60 * 1000), // Fecha actual + 1 hora
    

  };

  
  
  console.log('Solicitud data:')
  console.log()
  console.log(JSON.stringify(solicitudData, null, 2));

  
      return new Promise((resolve, reject) => {
        this.solicitudService.saveSolicitud(solicitudData).subscribe({
          next: (response: any) => {
            console.log('Response from server:', response);

            // Asegúrate de que la respuesta tiene la estructura esperada
            const newSolicitud = response?.solicitud; // Accede al objeto 'solicitud'

            if (newSolicitud) {
              this.newSolicitudId = newSolicitud?.id_sol; // Accede a la propiedad 'id_sol'

              if (this.newSolicitudId) {
                console.log('New solicitud ID:', this.newSolicitudId);
              } else {
                console.warn('No solicitud ID found in response');
              }

              resolve(newSolicitud); // Devuelve la solicitud creada
            } else {
              console.warn('Solicitud object not found in response');
              reject(new Error('Solicitud object not found in response'));
            }
          },
          error: (error) => {
            console.error('Error creating solicitud:', error);
            reject(error);
          }
        });
      });
    }

 estadoUpdated(id_ot: number | null ,estadoId: number | null) {
    // Lógica para manejar la actualización del estado en el componente padre
    this._orderService.updateOrderState(id_ot ?? 0, estadoId ?? 0).subscribe(
      () => {
        console.log('Estado actualizado');

      },
      (error) => {
        console.error('Error actualizando el estado', error);
      }
    );
    
  }


  updateSolicitudOnLoadWhileCreate(id_ot: number): void {

    this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      
  
   this.solicitudService.updateSolicitudByFechaEmision(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },
    });   
  })
  
  }


  updateSolicitudOnCreated(id_ot: number): void {

    this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      
  
    this.solicitudService.updateSolicitudByFechaTermino(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },
    });
  
    this.solicitudService.updateSolicitudByCompletada(this.solicitudes[0].id_sol!, true).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },  
    });
  
  })  }

public confirmUpdate(id_ot: number): void {
  // Realiza la actualización solo si el usuario confirma
this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));
  console.log(this.division);
  this.detalleOTService.updateDetalleOTByDigito(id_ot, this.id_serv, 1).subscribe({
    next: () => {
      console.log('Detalle updated successfully');
    },
  });

  this.updateSolicitudOnCreated(id_ot);
  this.createorupdateSolicitud(id_ot, 4);
  console.log("Orden de trabajo completada");


  Swal.fire({
    title: '¡Orden de trabajo completada!',
    html: `<p>Has completado un <strong>${this.datatotal}</strong> de <strong>${this.datatotal2}</strong> órdenes de trabajo.</p>`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    background: '#f9f9f9',
    color: '#333',
    confirmButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirigir a la página anterior
      window.history.back();
    }
  });
  
   
}

public closeModal(): void {
  this.isModalOpen = false;
}

  obtenerCountXEstado(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.detalleOTService.getCountDetalleOTByEstado(this.id_ot, 1).subscribe(
        (datatotal) => {
          console.log("count");
          console.log(datatotal);
          this.datatotal = datatotal;
          resolve(datatotal);

        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject(0);
        }
      );
    });
  }
  
obtenerCountTotal(): Promise<number> {

return new Promise<number>((resolve, reject) => {

    this.detalleOTService.getCountDetalleOT(this.id_ot).subscribe(
    (datatotal2) => {
      console.log("count total")
      console.log(datatotal2);
      this.datatotal2 = datatotal2;
    },
    (error) => {
      console.error('Error al cargar los detalles:', error);
    }
  );
});
}

updateOrder(): Promise<void> {
  return new Promise<void>((resolve, reject) => {

    

    
  });
}

updateSolicitudOnLoad(id_ot: number): void {

  this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
    this.solicitudes = data.reverse();
    console.log(this.solicitudes);
    

 this.solicitudService.updateSolicitudByView(this.solicitudes[0].id_sol!, true).subscribe({
    next: () => {
      console.log('Solicitud updated successfully');
    },
  });   


  this.solicitudService.updateSolicitudByFecha(this.solicitudes[0].id_sol!, new Date).subscribe({
    next: () => {
      console.log('Solicitud updated successfully');
    },
  });   
  
  

})



}


divisionCount(): number {
  console.log(this.datatotal2);
  console.log(this.datatotal);
  this.division = this.datatotal / this.datatotal2 * 100;
  console.log(this.division);
  console.log(typeof(this.datatotal));
  return this.division;


}


  
  getOrderIdFromUrl(): number {
    const urlSegments = window.location.pathname.split('/');
    return Number(urlSegments[urlSegments.length - 1]); // Asegúrate de que este índice sea correcto
  }



  

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent, FormsModule],
  templateUrl: './detalle.component.html',
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
  selectedServicioID: number | null = null;
  usuarios: Usuario[] = [];
  marcas: Marca[] = [];
  newOrders: newOrder[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;  // Add this line
  form: FormGroup;
  loading: boolean = false;
  newDetalleOTId: number | null = null;
  d_estado: number = 0;
  id_ot: number ;
  solicitudes : Solicitud[] = [];
  id_serv: number;
  nuevoServicio: string = ''; // Variable para almacenar el nuevo servicio
  operacion: string = 'Agregar ';
  isSubmitting: boolean = false;
  orderId: number | undefined;
  newOrderId: number | null = null; // Variable para almacenar el ID de la nueva orden
  orderDetails: newOrder | null = null;
  detalleOT: DetalleOT[] = [];
  division: number = 0;
  orderEstados: orderEstado[] = [];

  datatotal: number = 0
  datatotal2: number = 0



  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
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
    
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));
  }

  ngOnInit(): void {
    this.loadServicios();

    this.loadUsuarios();
    this.loadDetalleServicio(this.id_ot, this.id_serv);


    console.log(this.id_ot);
    console.log(this.id_serv);


    

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
      d_estado: 0
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
      this.router.navigate(['/']);
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


  // ... (resto del código sin cambios)


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
  



  onUserChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedUser = this.usuarios.find(usuario => usuario.rut_usuario?.toString() === selectedId);
    
    if (selectedUser) {
      this.selectedUsuarioName = selectedUser.nom_usu;
      this.selectedUsuarioSurname = selectedUser.ap_usu;
      this.selectedUsuarioID = selectedUser.rut_usuario ?? null;
      this.form.patchValue({ rut_usuario: this.selectedUsuarioID });
    } else {
      this.selectedUsuarioName = null;
      this.selectedUsuarioSurname = null;
      this.selectedUsuarioID = null;
      this.form.patchValue({ rut_usuario: null });
    }
  }

  anotherAction() {
    // Datos que se envían para la actualización, cambiando d_estado a 1
    const detalleData: DetalleOT = {
      id_ot: this.id_ot,
      id_serv: this.id_serv,
      fecha_detalle: this.form.get('fecha_detalle')?.value,
      desc_detalle: this.form.get('desc_detalle')?.value,
      rut_usuario: this.form.get('rut_usuario')?.value,
      d_estado: 1
    };

    this.detalleOTService.updateDetalleOT(this.id_ot, this.id_serv, detalleData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar los detalles:', error);
      }
    );

    this.d_estado = 1;

    this.obtenerCountTotal();
    this.obtenerCountXEstado();

console.log(typeof(this.datatotal));
console.log(typeof(this.datatotal2));

this.divisionCount();

if (this.division == 100){

  this.updateOrder();
  this.router.navigate(['/']);
  console.log("Orden de trabajo completada");

}else{
  console.log("Orden de trabajo en proceso");
}

    
  }
  

  obtenerCountXEstado(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.detalleOTService.getCountDetalleOTByEstado(this.id_ot, this.d_estado).subscribe(
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

    this._orderService.updateOrderState(this.id_ot, 4).subscribe(
      (data) => {
        console.log("updateOrder");
        console.log(data);
        resolve();
      },
      (error) => {
        console.error('Error al cargar los detalles:', error);
        reject();
      }
    );

    this.updateSolicitudOnLoad(this.id_ot)
    
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
  
  this.solicitudService.updateSolicitudByFechaTermino(this.solicitudes[1].id_sol!, new Date).subscribe({
    next: () => {
      console.log('Solicitud updated successfully');
      console.log(this.solicitudes[1].id_sol);
    },
    error: (error) => {
      console.error('Error al cargar los detalles:', error);
      console.log(this.solicitudes[1].id_sol);

    }
  });  

})

}


divisionCount(): number {
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

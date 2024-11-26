import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrderService } from '../../services/order.service';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { ClienteService } from '../../services/cliente.service';
import { ServicioService } from '../../services/servicio.service';  
import { Order } from '../../interfaces/order';
import { newOrder } from '../../interfaces/newOrder';
import { Usuario } from '../../interfaces/usuario';
import { Cliente } from '../../interfaces/cliente';
import { DetalleCausaRechazo } from '../../interfaces/detalle_causa_rechazo';
import { DetalleCausaRechazoService } from '../../services/detalle_causa_rechazo.service';
import { Servicio } from '../../interfaces/servicio';
import { Equipo } from '../../interfaces/equipo';
import { OrdereliminadaService } from '../../services/ordereliminada.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud';
import { CausaRechazo } from '../../interfaces/causa_rechazo';
import { EstadoOT } from '../../interfaces/estadoot';
import { EstadoOTService } from '../../services/estado_ot.service';
import { CausaRechazoService } from '../../services/causa_rechazo.service';
import { Adjudicacion } from '../../interfaces/adjudicacion';
import { MatIconAnchor } from '@angular/material/button';
import { AdjudicacionService } from '../../services/adjudicacion.service';
import { MatIcon } from '@angular/material/icon';
import { PdfGeneratorEliminadasService } from '../../services/pdf-generator-eliminadas.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatIcon ,NgxPaginationModule,CronometroComponent, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('slideInOut',[
      state('true', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('false', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('true <=> false', animate('300ms ease-in-out'))
    ])
  ],
})
export class OrdersComponent implements OnInit {

  rejectionForm: FormGroup;
  isRejectionModalOpen = false;
  isFiltrosOpen = false;
  isEstadoOpen = false;
  isModalCambioEstadoOpen = false;
  isUsuarioOpen = false;
  isServicioOpen = false;
  isFechaOpen = false;
  solicitudForm: FormGroup;
  isModalOpenFinalizado: boolean = false; // Muestra el modal
  isClienteOpen = false;
  isEquipoOpen = false;
  showFilters = false; // Set to false by default



  menuAbierto: { [key: string]: boolean } = {
    filtrosGenerales: false,
    filtroEstado: false,
    filtroUsuario: false,
    filtroServicio: false,
    filtroFecha: false,
    filtrosCliente: false,
    filtroEquipo: false
  };

  

  toggleMenu(menu: string): void{
    this.menuAbierto[menu] = !this.menuAbierto[menu];
    console.log(this.menuAbierto);
  }

  numericError: string = '';  // Variable para almacenar el mensaje de error


  

  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];

  orders: Order[] = [];
  newOrders: newOrder[] = [];
  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  solicitudes: Solicitud[] = [];
  adjuducaciones: Adjudicacion[] = [];
  estados: EstadoOT[] = [];
  causasRechazo: CausaRechazo[] = [];
  adjudicacionData: Adjudicacion[] = []
  adjudicacion: Adjudicacion[] = []
  id_ot: number | null = null;
  selectedMonth: number = 0;
  selectedYear: number = 0;
  selectedEquipo: string = '';
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  initialUsuarioID: number | null = null;
  equipo: Equipo = {};
  form: FormGroup;
  formFin: FormGroup;
  formUser: FormGroup;
  selectedUsuarioName = '';
  selectedUsuarioSurname = '';
  selectedUsuarioID: number | null = null;
  selectedEstadoName = '';
  searchRutCliente: string = '';
  newSolicitudId: number | null = null;
  selectedOtId: number | null = null;
  searchEquipo: string = '';
  searchUsuario: string = '';
  rut_usuario_filtro: number = 0;
  searchServicio: string = '';
  isEstadoModalOpen = false;
  previousUsuarioID: number | null = null;
  searchRut: string = '';
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  filteredServicios: Servicio[] = [];
  newOrderId: number | null = null;
  page = 1;
  rut_usuario: number = 0;
  itemsPerPage = 10;
  public isModalOpen: boolean = false
  public fechaHoy: string = '';
  rol_id: number = 0;

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles
  selectedEstadoID: number | null = null;
  selectedRejection: number | null = null;


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private equipoService: EquipoService,
    private queryService:QueryService,
    private clienteService: ClienteService,
    private detalleOTService: DetalleOTService,
    private servicioService: ServicioService,
    public authService: AuthService,
    private solicitud: SolicitudService,
    private pdfGeneratorService: PdfGeneratorService,
    private fb: FormBuilder,
    private solictudService: SolicitudService,
    private detalleCausaRechazoService: DetalleCausaRechazoService,
    private causaRechazoService: CausaRechazoService,
    private estadoOTService:EstadoOTService,
    private adjudicacionService: AdjudicacionService,
    private pdfGeneratorEliminadasService:PdfGeneratorEliminadasService

  ) {

    this.form = this.fb.group({
      id_estado_ot: [null],
      rut_usuario: [null],
      desc_sol: [''],
      fecha_plazo: [null],
  
    });

    this.solicitudForm = this.fb.group({
      id_sol: [null],
      id_ot: [null],
      desc_sol: [''],
      id_estado_ot: [null],
      fecha_plazo: [null],
    });
  

    this.rejectionForm = this.fb.group({
      id_rechazo: ['', Validators.required],
      observaciones: [''],
      fecha_rechazo: [new Date()],
    });

    this.formFin = this.fb.group({
      id_estado_ot: 5,
      rut_receptor: [null],
      desc_sol: [''],
      fecha_plazo: [null],
  
    });


    this.formUser = this.fb.group({
      rut_usuario: [null],
    });
  }

  ngOnInit(): void {

    this.rol_id = this.authService.getRolId() ?? 0; // Obtén el `rol_id` desde `authService`
    this.rut_usuario = this.authService.getUserId() ?? 0; // Obtén el `rut_usuario` desde `authService`
    this.previousUsuarioID = this.form.get('rut_usuario')?.value;
    console.log(this.rut_usuario)
    console.log(this.rol_id)
    this.loadEstados();
    this.loadOrders();
    this.initialUsuarioID = this.form.get('rut_usuario')?.value;



    this.loadUsers();
    this.loadServicios();
    this.loadCausaRechazo();   
  }

  onUsuarioChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedUser = this.usuarios.find(usuario => usuario.rut_usuario?.toString() === selectedId);
  
    if (selectedUser) {
      this.selectedUsuarioName = selectedUser.nom_usu;
      this.selectedUsuarioSurname = selectedUser.ap_usu;
      this.selectedUsuarioID = selectedUser.rut_usuario ?? null;
    }
  }
  

  private async createAdjudicacion(otId: number): Promise<void> {

  

    const adjudicacionData: Adjudicacion = {
      id_ot: otId,  // Usamos el otId que se pasa como parámetro
      rut_usuario: this.formUser.get('rut_usuario')?.value,
      fecha_adjudicacion: new Date(),
    };
  
    // Llamada al servicio para guardar la adjudicación
    try {
      const response = await this.adjudicacionService.saveAdjudicaciones(adjudicacionData).toPromise();
      console.log('Adjudicación creada con éxito:', response);
      // Aquí puedes manejar la respuesta o actualizar el estado del componente
    } catch (error) {
      console.error('Error al crear adjudicación:', error);
    }
  }

  loadEstados(): void {
    this.estadoOTService.getListEstadosOT().subscribe(
      (data: EstadoOT[]) => {
        this.estados = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadCausaRechazo(): void {
    this.causaRechazoService.getListCausaRechazo().subscribe(
      (data: CausaRechazo[]) => {
        this.causasRechazo = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  filterOrdersByServicio(servicio: string) {
    this.selectedServicio = servicio;
    this.filterOrders();
  }

 

  filterOrdersByStatus(status: string) {
    this.selectedStatus = status;
    this.filterOrders();
  }
  filterOrdersByUsuario(usuario: string) {
    this.selectedUsuario = usuario;
    this.filterOrders();
  }

  
  filterOrdersByMonthYear(month: number, year: number) {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterOrders();
  }

  

  


  showSolicitudModal(orderId: number) {
    this.newOrderId = orderId; // Asigna el id de la orden
    this.isModalOpenFinalizado = true; // Muestra el modal
  }
  
  closeModalFinalizado() {
    this.isModalOpenFinalizado = false; // Muestra el modal
  }

  closeEstadoAdjudicacion() {
    this.isModalCambioEstadoOpen = false;
  }

  updateSolicitudOnLoad(id_ot: number): void {

    this.solictudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      

      if(this.solicitudes[0].isView == false && this.solicitudes[0].id_estado_ot == 2 || this.solicitudes[0].id_estado_ot == 4 || this.solicitudes[0].id_estado_ot == 5){

   this.solictudService.updateSolicitudByView(this.solicitudes[0].id_sol!, true).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },
    });   


    this.solictudService.updateSolicitudByFecha(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      },
    });   
  }else;
    

  })
  
}

parsearValoresRut(rut_usuario: number): void {
  this.formUser.patchValue({ rut_usuario: rut_usuario });
}

parsearValoresEstado(id_estado_ot: number): void {
  this.form.patchValue({ id_estado_ot: id_estado_ot });
}


  openEstadoModal (otId: number, rut_usuario: number, id_estado_ot:number): void {
    this.updateSolicitudOnLoad(otId)
    this.parsearValoresEstado(id_estado_ot)


    
   
    
    this.isEstadoModalOpen = true;
    this.selectedOtId = otId;
  }

  openEstadoModalCambio (otId: number, rut_usuario: number, id_estado_ot:number): void {
    this.parsearValoresRut(rut_usuario);
    this.isModalCambioEstadoOpen = true;
    this.selectedOtId = otId;
  }

  

  closeEstadoModal () {
    this.isEstadoModalOpen = false;
    this.selectedOtId = null;
  }

  confirmChangeEstado(otId: number): void {
    if (this.selectedEstadoID) {
      // Actualizamos el estado, sin importar el usuario

      this.estadoUpdated(otId, this.selectedEstadoID);
      
      // Comparamos si el valor actual de 'rut_usuario' es distinto del valor inicial (patchValue)
      // Cerramos el modal de estado
      this.closeEstadoModal();
    }
  }
  

  confirmAdjudicacion(otId: number): void {
    if (this.selectedUsuarioID) {
      // Actualizamos el estado, sin importar el usuario
      this.createAdjudicacion(otId);
      
      // Comparamos si el valor actual de 'rut_usuario' es distinto del valor inicial (patchValue)
      // Cerramos el modal de estado
      this.closeEstadoAdjudicacion();
    }
  }


async Finalizar(orderId: number) {
  this.closeModalFinalizado(); // Cierra el modal antes de ejecutar la lógica
  const confirmar = window.confirm('¿Está seguro de finalizar esta acción?');
  if (confirmar) {
    try {
      await this.estadoupdateao(orderId); // Llama al método para actualizar el estado
      await this.createorupdateSolicitudFinalizada(orderId); // Crea la nueva solicitud
      await this.refreshOrder(orderId); // Refresca la orden específica

      alert('Acción finalizada correctamente.');
    } catch (error) {
      console.error('Error al finalizar la acción:', error);
      alert('Hubo un error al finalizar la acción. Intente nuevamente.');
    }
  }
}

refreshOrder(orderId: number) {
  this.orderService.getOrder(orderId).subscribe({
    next: (updatedOrder) => {
      const index = this.orders.findIndex((order) => order.id_ot === orderId);
      if (index !== -1) {
        this.orders[index] = updatedOrder; // Actualiza la orden en la lista
      }
    },
    error: (err) =>
      console.error('Error al refrescar la orden específica:', err),
  });
}

  estadoupdateao(id_ot: number | null) {
    this.solictudService.getSolByOt(id_ot ?? 0).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      

        this.solictudService.updateSolicitudByFechaTermino(this.solicitudes[0].id_sol!, new Date).subscribe({
          next: () => {
            console.log('Solicitud updated successfully');
            console.log(this.solicitudes[0].id_sol);
          },
          error: (error) => {
            console.error('Error al cargar los detalles:', error);
            console.log(this.solicitudes[0].id_sol);
          }
        });
         this.solictudService.updateSolicitudByCompletada(this.solicitudes[0].id_sol!, true).subscribe({
          next: () => {
            console.log('Solicitud updated successfully');
            console.log(this.solicitudes[0].id_sol);
          },
          error: (error) => {
            console.error('Error al cargar los detalles:', error);
            console.log(this.solicitudes[0].id_sol);
          }
        });

  }
  )}

  
  estadoUpdated(id_ot: number | null ,estadoId: number | null) {
    // Lógica para manejar la actualización del estado en el componente padre
    this.solictudService.updateSolicitudByFechaTermino(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
        console.log(this.solicitudes[0].id_sol);
      },
      error: (error) => {
        console.error('Error al cargar los detalles:', error);
        console.log(this.solicitudes[0].id_sol);
      }
    });  


    this.createorupdateSolicitud(id_ot, estadoId).then((solicitud: Solicitud) => {
      console.log('Solicitud actualizada:', solicitud);
      this.loadOrders();
    }).catch((error) => {
      console.error('Error actualizando la solicitud:', error);
    });
  }

  public async createorupdateSolicitudFinalizada(id_ot:number | null): Promise<Solicitud> {


    console.log('id_ot:', id_ot);



    const solicitudData: Solicitud = {
      id_ot: id_ot ?? 0, // Ensure id_ot is not null
      desc_sol: this.formFin.get('desc_sol')?.value,
      id_estado_ot: 5,
      isView: false,
      fecha_emision: new Date(),
      fecha_plazo: this.formFin.get('fecha_plazo')?.value,
      completada: false,
      rut_usuario: this.formFin.get('rut_receptor')?.value,

    };
    
    console.log('Solicitud data:')
    console.log()
    console.log(JSON.stringify(solicitudData, null, 2));
  
    
        return new Promise((resolve, reject) => {
          this.solictudService.saveSolicitud(solicitudData).subscribe({
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

  public async createorupdateSolicitud(id_ot:number | null, id_estado_ot:number| null): Promise<Solicitud> {


    console.log('id_ot:', id_ot);
    console.log('id_estado_ot:', id_estado_ot);



    const solicitudData: Solicitud = {
      id_ot: id_ot ?? 0, // Ensure id_ot is not null
      desc_sol: this.form.get('desc_sol')?.value,
      id_estado_ot: this.form.get('id_estado_ot')?.value,
      isView: false,
      fecha_emision: new Date(),
      fecha_plazo: this.form.get('fecha_plazo')?.value,
      completada: false,
      rut_usuario: this.form.get('rut_receptor')?.value,

    };
    
    console.log('Solicitud data:')
    console.log()
    console.log(JSON.stringify(solicitudData, null, 2));
  
    
        return new Promise((resolve, reject) => {
          this.solictudService.saveSolicitud(solicitudData).subscribe({
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
  


  loadUsers(): void {
    this.usuarioService.getListUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadServicios(): void {
    this.servicioService.getListServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }
  
  loadOrders(): void {
    console.log(this.rut_usuario_filtro)

    if(this.rol_id == 2){

     this.orderService.getOrdersListByTecnico(this.rut_usuario).subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.form.patchValue({ rut_usuario: this.rut_usuario });
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud?.nom_estado_ot));
        this.sortOrders(this.newOrders);

      },
      (error) => {
        console.error('Error fetching orders', error);
      }

    );
    } else {
    
    this.orderService.getListOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud?.nom_estado_ot));
        this.sortOrders(this.newOrders);

      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
}

sortOrders(newOrders: any[]): any[] {
  console.log("hola")
  console.log(newOrders);

  return newOrders.sort((a, b) => {
    // Primero, las órdenes cuyo isview es true
    if (a.VistaSolicitud.isview && !b.VistaSolicitud.isview) {
      return 1;
    }
    if (!a.VistaSolicitud.isview && b.VistaSolicitud.isview) {
      return -1;
    }
    return 0;  // Si ambos tienen el mismo valor en isview, no cambiamos el orden
  });
}

public onUserChange(event: Event, id_ot: number): void {

  const selectedId = (event.target as HTMLSelectElement).value;
  const selectedEstado = this.estados.find(estado => estado.id_estado_ot?.toString() === selectedId);
  
  if (selectedEstado) {
    this.selectedEstadoName = selectedEstado.nom_estado_ot;
    this.selectedEstadoID = selectedEstado.id_estado_ot ?? 0;
    console.log(this.selectedEstadoID);
    
    // Actualiza el valor en el formulario
    console.log(this.form.value);
    
    // Emitir el evento al componente padre

    this.openModal(id_ot);


    // Cerrar el menú
  }


}


filterOrders() {
  this.filteredOrders = this.newOrders
    .filter(newOrder => 
      this.selectedStatus === 'todas' || 
      (newOrder.VistaSolicitud?.nom_estado_ot?.toLowerCase() === this.selectedStatus.toLowerCase())
    )
    .filter(newOrder => 
      this.selectedMonth === 0 || 
      (newOrder.fec_entrega && new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
    )
    .filter(newOrder => 
      this.selectedYear === 0 || 
      (newOrder.fec_entrega && new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
    )
    .filter(newOrder => 
      !this.searchRutCliente || 
      (newOrder.rut_cliente && newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
    )
    .filter(newOrder => 
      !this.selectedDate || 
      (newOrder.fec_entrega && new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
    )
    .filter(newOrder => 
      !this.searchEquipo || 
      (newOrder.Equipo?.mod_equipo && newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toLowerCase()))
    )
    .filter(newOrder => 
      !this.searchUsuario || 
      (newOrder.VistaUltimaAdjudicacion?.rut_usuario && newOrder.VistaUltimaAdjudicacion?.rut_usuario.toString().toLowerCase().includes(this.searchUsuario.toLowerCase()))
    )
    .filter(newOrder => 
      this.selectedServicio === 'todos' || 
      (newOrder.VistaSolicitud?.nom_estado_ot?.toLowerCase() === this.selectedServicio.toLowerCase())
    );
  this.filteredOrders = this.sortOrders(this.filteredOrders);
}

sortOrdersByDueDate(): void {
  this.filteredOrders.sort((a, b) => {
    const dateA = new Date(a.VistaSolicitud?.fecha_plazo ?? '').getTime();
    const dateB = new Date(b.VistaSolicitud?.fecha_plazo ?? '').getTime();
    return dateA - dateB;
  });
}


  filterUsers() {
    this.filteredUsers = this.usuarios
      .filter(usuario => this.selectedUsuario === 'todos' || usuario.nom_usu.toLowerCase() === this.selectedUsuario)
  }

  filterServicios() {
    this.filteredServicios = this.servicios
      .filter(servicio => this.selectedServicio === 'todos' || servicio.nom_serv.toLowerCase() === this.selectedServicio)
  } 

  deleting(id_ot: number): void {
    this.deleteDetalleOTByOtId(id_ot);
    this.deleteOrder(id_ot);
  }



  deleteDetalleOTByOtId(id_ot: number): void {
    this.detalleOTService.deleteDetalleOTByOtId(id_ot).subscribe(
      () => {
        console.log('Detalle OT eliminado');
        this.loadOrders();
      },
      (error) => {
        console.error('Error eliminando el detalle OT', error);
      }
    );
  }

  

  filterUsersByRut(): any[] {
    const userRut = this.authService.getUserId(); // Obtén el `rut_usuario` desde `authService`
    return this.usuarios.filter(usuario => usuario.rut_usuario === userRut);
  }

  deleteOrder(id_ot: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.orderService.getNewOrder(id_ot).subscribe(
        (order: newOrder) => {
          this.orderService.saveOrder(order).subscribe(
            () => {
              console.log('Orden registrada como eliminada', order);
              this.orderService.deleteOrders(id_ot).subscribe(
                () => {
                  console.log('Orden eliminada');
                  this.loadOrders(); // Actualizar la lista de órdenes
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

  generatePDF(order: newOrder): void {
    try {
      if (!order || !order.Equipo?.mod_equipo) {
        throw new Error('Datos de orden incompletos');
      }
  
      // Obtén los detalles de la orden y las solicitudes asociadas
      this.detalleOTService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
        next: (detalles: DetalleOT[]) => {
          this.solicitud.getSolByOt(order.id_ot ?? 0).subscribe({
            next: (solicitudes: Solicitud[]) => {
              const fileName = `OT_${order.id_ot}.pdf`;
              // Genera el PDF con todos los datos
              this.pdfGeneratorService.generatePDFContent(order, detalles, solicitudes, fileName);
            },
            error: (error) => {
              console.error('Error al obtener solicitudes asociadas a la orden:');
            },
          });
        },
        error: (err) => {
          console.error('Error al obtener detalles de la orden:', err);
        },
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  }

  generatePDFDeleted(order: newOrder): void {
    try {
      if (!order || !order.Equipo?.mod_equipo) {
        throw new Error('Datos de orden incompletos');
      }
  
      // Obtén los detalles de la orden y las solicitudes asociadas
      this.detalleOTService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
        next: (detalles: DetalleOT[]) => {
          this.solicitud.getSolByOt(order.id_ot ?? 0).subscribe({
            next: (solicitudes: Solicitud[]) => {
              this.detalleCausaRechazoService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
                next: (detalleCausaRechazo: DetalleCausaRechazo[]) => {
                  this.adjudicacionService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
                    next: (adjudicaciones: Adjudicacion[]) => {

                  


              const fileName = `OT_${order.id_ot}.pdf`;
              // Genera el PDF con todos los datos
              this.pdfGeneratorEliminadasService.generatePDFContent(order, detalles, solicitudes,detalleCausaRechazo, adjudicaciones, fileName);
            },
            error: (error) => {
              console.error('Error al obtener adjudicaciones asociadas a la orden:');
            },
          });
        },
            error: (error) => {
              console.error('Error al obtener los detalles eliminados asociadas a la orden:');
            },
          });
        },

            error: (error) => {
              console.error('Error al obtener solicitudes asociadas a la orden:');
            },
          });
        },
        error: (err) => {
          console.error('Error al obtener detalles de la orden:', err);
        },
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  }


  public openModal(id_ot:number): void {
    this.updateSolicitudOnLoad(id_ot)
    this.id_ot = id_ot; // Asigna el `id_ot` a la propiedad `id_ot`
    this.isModalOpen = true;
    const today = new Date();
    this.fechaHoy = today.toISOString().split('T')[0];  // Obtiene solo la fecha sin la parte de la hora
    
  }
  

  openRejectionModal(otId: number): void {
    console.log("abriendo...")
    this.isRejectionModalOpen = true;
    this.selectedOtId = otId;
    console.log(this.isRejectionModalOpen);
  }

  closeRejectionModal(): void {
    this.isRejectionModalOpen = false;
    this.rejectionForm.reset();
  }

  createorupdateDetalleCausaRechazo(otId: number, selectedRejection: number): void {
    const detalleCausaRechazo: DetalleCausaRechazo = {
      id_ot: otId,
      id_rechazo: selectedRejection,
      observaciones: this.rejectionForm.value.observaciones,
      fecha_rechazo: new Date(),

    };

    this.detalleCausaRechazoService.saveDetalleOT(detalleCausaRechazo).subscribe({
      next: (response: any) => {
        console.log('Response from server:', response);
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error creating detalle causa rechazo:', error);
      }
    });
  }


  public onCausaChange(event: Event, id_ot: number): void {

    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEstado = this.causasRechazo.find(causa => causa.id_rechazo?.toString() === selectedId);
    
    if (selectedEstado) {
      this.selectedEstadoName = selectedEstado.nombre_rechazo;
      this.selectedEstadoID = selectedEstado.id_rechazo ?? 0;
      console.log(this.selectedEstadoID);
      
      // Actualiza el valor en el formulario
      console.log(this.form.value);
      
      // Emitir el evento al componente padre

      this.openModal(id_ot);


      // Cerrar el menú
    }


  }

  public async createorupdateSolicitudEliminada(id_ot:number | null, id_estado_ot:number| null): Promise<Solicitud> {


    console.log('id_ot:', id_ot);
    console.log('id_estado_ot:', id_estado_ot);
  
  
  
    const solicitudData: Solicitud = {
      id_ot: id_ot ?? 0, // Ensure id_ot is not null
      desc_sol: this.form.get('desc_sol')?.value,
      id_estado_ot: id_estado_ot ?? 0,
      isView: false,
      fecha_emision: new Date(),
      fecha_plazo: null,
      completada: false,
      rut_usuario: null
    };
    
    console.log('Solicitud data:')
    console.log()
    console.log(JSON.stringify(solicitudData, null, 2));
  
    
        return new Promise((resolve, reject) => {
          this.solictudService.saveSolicitud(solicitudData).subscribe({
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


      

  confirmRejection(otId: number): void {
    if (this.rejectionForm.valid) {
      const selectedRejection = this.rejectionForm.value.id_rechazo;
      console.log(`Orden de trabajo ${otId} rechazada con causa ${selectedRejection}`);
      this.createorupdateDetalleCausaRechazo(otId, selectedRejection);
      // Aquí puedes agregar la lógica para enviar los datos al backend
      this.createorupdateSolicitudEliminada(otId, 6);
      this.closeRejectionModal();
    } else {
      alert('Por favor, selecciona una causa de rechazo.');
    }
  }

  onPageChange(page: number): void {
    this.page = page;
  }

  filterOrdersByState(state: string) {
    this.selectedStatus = state;
    this.filterOrders();
  }
  
  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
    this.filterOrdersByState(selectedState);
  }

  onUserChangeFilter(event: Event): void {
    const searchUsuario = (event.target as HTMLSelectElement).value;
    this.filterOrdersByRutUsuario(searchUsuario);
  }
  
  onMonthChange(event: Event): void {
    const selectedMonth = parseInt((event.target as HTMLSelectElement).value, 10);
    this.filterOrdersByMonthYear(selectedMonth, this.selectedYear);
  }

  onYearChange(event: Event): void {
    const selectedYear = parseInt((event.target as HTMLSelectElement).value, 10);
    this.filterOrdersByMonthYear(this.selectedMonth, selectedYear);
  }

  filterOrdersByRutCliente(searchRutCliente: string) {
    this.searchRutCliente = searchRutCliente;
    this.filterOrders();
  }



  onClientChange(event: Event): void {
    const searchRutCliente = (event.target as HTMLInputElement).value;
    this.filterOrdersByRutCliente(searchRutCliente);
  }

  onEquipmentChange(event: Event): void {
    const searchEquipo = (event.target as HTMLInputElement).value;
    this.filterOrdersByEquipo(searchEquipo);
  }

  filterOrdersByRutUsuario(searchRutUsuario: string) {
    this.searchUsuario = searchRutUsuario;
    this.filterOrders();
  }

  filterOrdersByEquipo(searchEquipo: string) {
    this.searchEquipo = searchEquipo;
    this.filterOrders();
  }

  onRutUsuarioChange(event: Event): void {
    const searchRutUsuario = (event.target as HTMLInputElement).value;
    this.filterOrdersByRutUsuario(searchRutUsuario);
  }

  onEquipmentSerialChange(event: Event): void {
    const searchEquipo = (event.target as HTMLInputElement).value;
    this.filterOrdersByEquipo(searchEquipo);
  }
  
}

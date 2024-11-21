import { Component, NgModule, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { Equipo } from '../../interfaces/equipo';
import { Cliente } from '../../interfaces/cliente';
import { Servicio } from '../../interfaces/servicio';
import { ServicioService } from '../../services/servicio.service';
import { OrdereliminadaService } from '../../services/ordereliminada.service';
import { newOrder } from '../../interfaces/newOrder';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { EstadoOT } from '../../interfaces/estadoot';
import { EstadoOTService } from '../../services/estado_ot.service';
import { AuthService } from '../../services/auth.service';
import { SolicitudService } from '../../services/solicitud.service';
import { DetalleCausaRechazo } from '../../interfaces/detalle_causa_rechazo';
import { CausaRechazo } from '../../interfaces/causa_rechazo';
import { TimerService } from '../../services/timer.service';
import { Solicitud } from '../../interfaces/solicitud';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';
import { QueryService } from '../../services/query';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DetalleCausaRechazoService } from '../../services/detalle_causa_rechazo.service';
import { CausaRechazoService } from '../../services/causa_rechazo.service';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { PdfGeneratorRechazadasService } from '../../services/pdf-generator-eliminadas.service';


@Component({
  selector: 'app-eliminadas',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, RouterModule, CronometroComponent],
  templateUrl: './eliminadas.component.html',
  styleUrls: ['./eliminadas.component.css'],
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
export class EliminadasComponent implements OnInit {
  causasRechazoMap: { [key: number]: string } = {};

  isFiltrosOpen = false;
  isEstadoOpen = false;
  isUsuarioOpen = false;
  isServicioOpen = false;
  isFechaOpen = false;
  isClienteOpen = false;
  isEquipoOpen = false;

  numericError: string = '';  // Variable para almacenar el mensaje de error
  isSubmenuOpen: number | null = null; // Controla la visibilidad del submenú

  selectedEstadoID: number | null = null;

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
  public isMenuOpen: number | undefined = undefined; // Inicializado como 'undefined'
  servicios: Servicio[] = [];
  selectedMonth: number = 0;
  selectedEstadoName = '';
  selectedFechaPlazo: Date | null = null;
  selectedYear: number = 0;
  selectedEquipo: string = '';
  tiempoRestante: string = '';
  private intervalo: any;
  id_estado_ot: number = 0;
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  equipo: Equipo = {};
  solicitudes: Solicitud[] = [];
  searchRutCliente: string = '';
  searchEquipo: string = '';
  conseguirUsuarioReceptor: number = 0;
  conseguirUsuarioRemisor: number = 0;
  solicitudesInvertidas: Solicitud[] = [];
  searchUsuario: string = '';
  searchServicio: string = '';
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  estadosOT: EstadoOT[] = [];
  solicitudForm: FormGroup;
  filteredServicios: Servicio[] = [];
  page = 1;
  form: FormGroup;
  estados: EstadoOT[] = [];
  itemsPerPage = 10;
  newSolicitudId: number | null = null;
  soli: number  | null = null;
  rut_receptor: number = 0;

  
  id_ot: number = 0; // Declare the id_ot property
  public isModalOpen: boolean = false
  rut_usuario: number = 0;
  idRol: number | null = 0;

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles


  constructor(
    private ordereliminadaService: OrdereliminadaService,
    private _orderService: OrderService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private equipoService: EquipoService,
    private clienteService: ClienteService,
    private detalleOTService: DetalleOTService,
    public router: Router,
    private servicioService: ServicioService,
    private aRouter: ActivatedRoute,
    private estadoOTService: EstadoOTService,
    public authService: AuthService,
    private pdfGeneratorService: PdfGeneratorService,
    private pdfGeneratorRechazadasService:PdfGeneratorRechazadasService,
    private solicitud: SolicitudService,
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private timerService: TimerService,
    private queryService: QueryService,
    private detalleCausaRechazoService: DetalleCausaRechazoService,
    private causaRechazoService:CausaRechazoService
    

  )

  
  {  this.form = this.fb.group({
    id_estado_ot: [null],
    rut_receptor: [null],
    rut_remitente: this.rut_receptor,
    desc_sol: [''],
    fecha_plazo: [null],

  });

  this.solicitudForm = this.fb.group({
    id_sol: [null],
    id_ot: [null],
    desc_sol: [''],
    rut_receptor: [null],
    id_estado_ot: [null],
    fecha_plazo: [null],
  });


}

  

  ngOnInit(): void {
    this.rut_usuario = this.authService.getUserId() ?? 0
    this.idRol = this.authService.getRolId() ?? 0
    this.loadOrders();
    this.loadEstados();
    this.loadUsers();
    this.loadServicios();
    this.actualizarTiempoRestante();
    this.filterOrders();
    this.loadOrdersWithRejections();


    
  

  }


  loadOrdersWithRejections(): void {
    // Este es el código que recorrerá las órdenes y obtendrá la causa de rechazo
    this.newOrders.forEach((order) => {
      const id = order.id_rechazo; // Variable temporal

      // Verificamos si el id está definido y si no hemos cargado previamente el nombre de rechazo
      if (id !== undefined && !this.causasRechazoMap[id]) {
        // Llamamos al servicio para obtener la causa de rechazo
        this.causaRechazoService.getCausaRechazo(id).subscribe({
          next: (causa: CausaRechazo) => {
            // Asignamos el nombre de rechazo al mapa
            this.causasRechazoMap[id] = causa.nombre_rechazo;
          },
          error: (err) => console.error('Error al cargar nombre de rechazo:', err),
        });
      }
    });
  }
  

  iniciarCronometro() {
    this.actualizarTiempoRestante(); // Muestra el tiempo inicial inmediatamente
    this.intervalo = setInterval(() => this.actualizarTiempoRestante(), 1000);
  }

  actualizarTiempoRestante() {
    const ahora = new Date().getTime();
    const diferencia = this.newOrders[0].VistaSolicitud.fecha_plazo.getTime() - ahora;

    if (diferencia > 0) {
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      this.tiempoRestante = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    } else {
      this.tiempoRestante = '¡Tiempo terminado!';
      clearInterval(this.intervalo); // Detiene el cronómetro cuando llega a cero
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalo); // Limpia el intervalo si el componente se destruye
  }


  filterOrdersByServicio(servicio: string) {
    this.selectedServicio = servicio;
    this.filterOrders();
  }

  filterOrdersByRutCliente() {
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

  filterOrdersByDate(date: Date | null) {
    this.selectedFechaPlazo = date;
    this.filterOrders();
  }

  // Actualiza el formulario cuando cambia la selección
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
  
  filterOrdersByMonthYear(month: number, year: number) {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterOrders();
  }

  public refreshPage(): void {
    // Vuelve a navegar a la misma ruta para refrescar
    this.router.navigateByUrl('/reportes', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });

    console.log("me estoy refrescando")
  }
  

  filterOrdersByEquipo() {
    this.filterOrders();
  }


  public openModal(id_ot:number): void {
    this.updateSolicitudOnLoad(id_ot)
    this.id_ot = id_ot; // Asigna el `id_ot` a la propiedad `id_ot`
    this.isModalOpen = true;
  }
  
  // Método para cerrar el modal
  public closeModal(): void {
    this.isModalOpen = false;
  }
  

  filterUsersByRut(): any[] {
    const userRut = this.authService.getUserId(); // Obtén el `rut_usuario` desde `authService`
    return this.usuarios.filter(usuario => usuario.rut_usuario === userRut);
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

  updateSolicitudOnLoad(id_ot: number): void {

    this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data.reverse();
      console.log(this.solicitudes);
      

      if(this.solicitudes[0].isView == false && this.solicitudes[0].id_estado_ot == 2 || this.solicitudes[0].id_estado_ot == 4 || this.solicitudes[0].id_estado_ot == 5){

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
  }else;
    

  })
  
}

updateSolicitudOnCreated(id_ot: number): void {

  this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
    this.solicitudes = data.reverse();
    console.log(this.solicitudes);
    

  this.solicitudService.updateSolicitudByFechaTermino(this.solicitudes[1].id_sol!, new Date).subscribe({
    next: () => {
      console.log('Solicitud updated successfully');
    },
  }); })  }

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

  public confirmUpdate(id_ot: number): void {
    // Realiza la actualización solo si el usuario confirma


    
    this.estadoUpdated(id_ot, this.selectedEstadoID ?? 0);
    this.updateSolicitudOnLoadWhileCreate(id_ot)
    this.updateSolicitudOnCreated(id_ot)
    this.closeModal();  // Cierra el modal después de actualizar
     
  }
  
  // Método para cancelar la acción
  public cancelUpdate(): void {
    this.isMenuOpen = undefined;
    this.closeModal();  // Solo cierra el modal sin hacer nada más
    
  
  }

  generatePDFEliminada(order: newOrder): void {
    try {
      if (!order || !order.Equipo.mod_equipo) {
        throw new Error('Datos de orden incompletos');
      }
  
      // Obtener detalles de la orden
      this.detalleOTService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
        next: (detalles: DetalleOT[]) => {
          // Obtener solicitudes asociadas
          this.solicitud.getSolByOt(order.id_ot ?? 0).subscribe({
            next: (solicitudes: Solicitud[]) => {
              // Obtener causas de rechazo asociadas
              this.detalleCausaRechazoService.getListDetalleOTByOTId(order.id_ot ?? 0).subscribe({
                next: (detalleCausas: DetalleCausaRechazo[]) => {
                  // Define el nombre del archivo
                  const fileName = `OT_Eliminada_${order.id_ot}.pdf`;
  
                  // Genera el PDF con todos los datos
                  this.pdfGeneratorRechazadasService.generatePDFContentEliminada(
                    order,
                    detalles,
                    solicitudes,
                    detalleCausas,
                    fileName
                  );
  
                  console.log(`PDF generado correctamente: ${fileName}`);
                },
                error: (error) => {
                  console.error('Error al obtener causas de rechazo asociadas:', error);
                },
              });
            },
            error: (error) => {
              console.error('Error al obtener solicitudes asociadas a la orden:', error);
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

  loadEstados() {
    this.estadoOTService.getListEstadosOT().subscribe(data => {
      this.estados = data;
    });
  }

  toggleSubmenu(id_ot: number ) {
    // Alterna el submenú solo para el registro seleccionado
    this.isSubmenuOpen = this.isSubmenuOpen === id_ot ? null : id_ot;
  }
  
  loadOrders(): void {

    if(this.idRol == 2){

      this.queryService.getOrdersByUsuarioProgreso(this.rut_usuario).subscribe(
        (data: newOrder[]) => {
          this.newOrders = data;

          this.filteredOrders = this.newOrders; // Inicializar filteredOrders
          this.sortOrders(this.newOrders);
          console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud.nom_estado_ot));

          
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );

    }else{
    
      this.orderService.getListEliminadas().subscribe(
        (data: newOrder[]) => {
          this.newOrders = data;
          this.filteredOrders = this.newOrders; // Inicializar filteredOrders
          console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud.nom_estado_ot));
      
          this.sortOrders(this.newOrders);
      
          // Vincular id_ot al método para obtener el id_rechazo
          this.newOrders.forEach((order) => {
            if (order.id_ot) {
              // Llama al servicio para obtener los detalles de rechazo por id_ot
              this.detalleCausaRechazoService.getListDetalleOTByOTId(order.id_ot).subscribe(
                (detalles: DetalleCausaRechazo[]) => {
                  // Encuentra el rechazo relacionado
                  const rechazo = detalles.find(detalle => detalle.id_rechazo);
      
                  if (rechazo) {
                    console.log(`Order ID: ${order.id_ot}, ID Rechazo: ${rechazo.id_rechazo}`);
                    
                    // Agrega la información del rechazo a la orden
                    order.id_rechazo = rechazo.id_rechazo;
                    order.fecha_rechazo = rechazo.fecha_rechazo; // Mapear fecha del rechazo
                    order.observaciones = rechazo.observaciones; // Mapear observaciones
      
                    // Llama al servicio para obtener el nombre de la causa de rechazo basado en id_rechazo
                    this.causaRechazoService.getCausaRechazo(rechazo.id_rechazo).subscribe(
                      (causa: CausaRechazo) => {
                        // Asigna el nombre del rechazo a la orden
                        order.nombre_rechazo = causa.nombre_rechazo; // Asume que "nombre" es el campo del nombre de la causa
                        console.log(`Nombre del rechazo para el ID ${rechazo.id_rechazo}: ${order.nombre_rechazo}`);
                      },
                      (error) => {
                        console.error(`Error fetching rejection name for ID: ${rechazo.id_rechazo}`, error);
                      }
                    );
                  }
                },
                (error) => {
                  console.error(`Error fetching rejection details for order ID: ${order.id_ot}`, error);
                }
              );
            }
          });
      
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
      
      

  }
}

  sortOrders(newOrders: any[]): any[] {
    return newOrders.sort((a, b) => {
      // Primero, las órdenes cuyo isview es true
      if (a.VistaSolicitud.isview && !b.VistaSolicitud.isview) {
        return -1;
      }
      if (!a.VistaSolicitud.isview && b.VistaSolicitud.isview) {
        return 1;
      }
      return 0;  // Si ambos tienen el mismo valor en isview, no cambiamos el orden
    });
  }
  

  filterOrders() {
    this.filteredOrders = this.newOrders
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.VistaSolicitud.nom_estado_ot.toLowerCase() === this.selectedStatus)
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
      .filter(newOrder => this.selectedUsuario === 'todos' || newOrder.Usuario.nom_usu.toLowerCase() === this.selectedUsuario.toLowerCase())// Filtro de usuario
      .filter(newOrder => !this.selectedFechaPlazo || new Date(newOrder.VistaSolicitud.fecha_plazo).toDateString() === this.selectedFechaPlazo?.toDateString())
      .sort((a, b) => new Date(b.VistaSolicitud.fecha_plazo).getTime() - new Date(a.VistaSolicitud.fecha_plazo).getTime());
      this.filteredOrders = this.sortOrders(this.filteredOrders);

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

 
  


  onPageChange(page: number): void {
    this.page = page;
  }

  isEstadoModalOpen: boolean = false;
  selectedOtId: number | null = null;

  getSolicitud(otId: number): Promise<Solicitud> {
    return new Promise((resolve, reject) => {
      this.solicitudService.getSolByOt(otId).subscribe(
        (data: Solicitud[]) => {
          this.solicitudes = data;
          console.log(this.rut_receptor);

          this.form.patchValue({
            rut_receptor : this.rut_receptor,
            rut_remitente: this.rut_usuario,
          });

        },
        (error) => {
          console.error('Error fetching orders', error);
          reject(error);
        }
      );
    });
  }

  openEstadoModal (otId: number) {
    this.updateSolicitudOnLoad(otId)
    this.getSolicitud(otId);

    

    
    this.isEstadoModalOpen = true;
    this.selectedOtId = otId;
  }

  closeEstadoModal () {
    this.isEstadoModalOpen = false;
    this.selectedOtId = null;
  }

  confirmChangeEstado(otId: number) {
    if (this.selectedEstadoID) {
      this.estadoUpdated(otId, this.selectedEstadoID);
      this.closeEstadoModal();
    }
  }


  
 

  estadoUpdated(id_ot: number | null ,estadoId: number | null) {
    // Lógica para manejar la actualización del estado en el componente padre
    this.solicitudService.updateSolicitudByFechaTermino(this.solicitudes[0].id_sol!, new Date).subscribe({
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

  

  conseguirRolRemitente(rut_remitente: number): number | undefined {
    let rol: number | undefined;
    this.usuarioService.getUsuario(rut_remitente).subscribe((data: Usuario) => {
      console.log(data);
      rol = data.id_rol;
    });
    return rol;
  }




  updateeee() {
 
    this.solicitudService.getSolByOt(this.id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data
      this.solicitudesInvertidas = data.reverse();
      console.log(this.solicitudes);}

      
    )



    

  


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
      completada: false,
      fecha_plazo: this.form.get('fecha_plazo')?.value,
      rut_usuario: this.form.get('rut_receptor')?.value,

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
  
}

import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,CronometroComponent, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule],
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
  selectedMonth: number = 0;
  selectedYear: number = 0;
  selectedEquipo: string = '';
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  equipo: Equipo = {};
  form: FormGroup;
  searchRutCliente: string = '';
  newSolicitudId: number | null = null;
  selectedOtId: number = 0;
  searchEquipo: string = '';
  searchUsuario: string = '';
  searchServicio: string = '';
  searchRut: string = '';
  filteredOrders: newOrder[] = []; // Cambiado a newOrder[]
  filteredUsers: Usuario[] = [];
  filteredServicios: Servicio[] = [];
  page = 1;
  rut_usuario: number = 0;
  itemsPerPage = 10;
  rol_id: number = 0;

  years = [2024, 2023, 2022]; // Asegúrate de rellenar con los años disponibles


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

  ) {

    this.form = this.fb.group({
      id_estado_ot: [null],
      rut_receptor: [null],
      desc_sol: [''],
      fecha_plazo: [null],
  
    });

    this.rejectionForm = this.fb.group({
      id_rechazo: ['', Validators.required],
      observaciones: [''],
      fecha_rechazo: [new Date()],
    });

  }

  ngOnInit(): void {

    this.rut_usuario = this.authService.getUserId() ?? 0; // Obtén el `rut_usuario` desde
    this.rol_id = this.authService.getRolId() ?? 0; // Obtén el `rol_id` desde `authService`
    console.log(this.rut_usuario)
    console.log(this.rol_id)
    this.loadOrders();

    this.loadUsers();
    this.loadServicios();
    

   
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

  
  filterOrdersByMonthYear(month: number, year: number) {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterOrders();
  }

  

  filterOrdersByEquipo() {
    this.filterOrders();
  }

  
  filterOrdersByRutUsuario() {
    this.filterOrders();
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
    console.log(this.rut_usuario)

    if(this.rol_id == 2){

     this.orderService.getOrdersListByTecnico(this.rut_usuario).subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud.nom_estado_ot));
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
        console.log(this.newOrders.map(newOrder => newOrder.VistaSolicitud.nom_estado_ot));
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


  filterOrders() {
    this.filteredOrders = this.newOrders
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.VistaSolicitud.nom_estado_ot.toLowerCase() === this.selectedStatus.toLowerCase())
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
      .filter(newOrder => !this.searchUsuario || newOrder.rut_usuario.toString().toLowerCase().includes(this.searchUsuario.toLowerCase()))
      .filter(newOrder => this.selectedUsuario === 'todos' || newOrder.Usuario.nom_usu.toLowerCase() === this.selectedUsuario.toLowerCase())// Filtro de usuario

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
      if (!order || !order.Equipo.mod_equipo) {
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
}

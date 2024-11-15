import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
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
import { Solicitud } from '../../interfaces/solicitud';
import { trigger } from '@angular/animations';
import { animate, state, style, transition } from '@angular/animations';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
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
export class ReportesComponent implements OnInit {

  menuAbierto: { [key: string]: boolean } = {
    filtrosGenerales: false,
    filtroEstado: false,
    filtroUsuario: false,
    filtroServicio: false,
    filtroFecha: false,
    filtrosCliente: false,
    filtroEquipo: false
  };


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
  selectedYear: number = 0;
  selectedEquipo: string = '';
  id_estado_ot: number = 0;
  selectedStatus: string = 'todas';
  selectedUsuario: string = 'todos';
  selectedDate: Date | null = null;
  selectedServicio: string = 'todos';
  equipo: Equipo = {};
  solicitudes: Solicitud[] = [];
  searchRutCliente: string = '';
  searchEquipo: string = '';
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
  id_ot: number = 0; // Declare the id_ot property
  public isModalOpen: boolean = false


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
    private fb: FormBuilder,
    private solicitudService: SolicitudService,


  )

  
  {  this.form = this.fb.group({
    id_estado_ot: this.selectedEstadoID,
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


}

  

  ngOnInit(): void {
    this.loadOrders();
    this.loadEstados();
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

  

  // Actualiza el formulario cuando cambia la selección
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
    this.orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        this.filteredOrders = this.newOrders; // Inicializar filteredOrders
        console.log(this.newOrders.map(newOrder => newOrder.EstadoOT.nom_estado_ot));
        this.sortOrders(this.newOrders);

      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
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
      .filter(newOrder => this.selectedStatus === 'todas' || newOrder.EstadoOT.nom_estado_ot.toLowerCase() === this.selectedStatus)
      .filter(newOrder => this.selectedMonth === 0 || new Date(newOrder.fec_entrega).getMonth() + 1 === this.selectedMonth)
      .filter(newOrder => this.selectedYear === 0 || new Date(newOrder.fec_entrega).getFullYear() === this.selectedYear)
      .filter(newOrder => !this.searchRutCliente || newOrder.rut_cliente.toString().toLowerCase().includes(this.searchRutCliente.toLowerCase()))
      .filter(newOrder => !this.selectedDate || new Date(newOrder.fec_entrega).toDateString() === this.selectedDate?.toDateString())
      .filter(newOrder => !this.searchEquipo || newOrder.Equipo.mod_equipo.toString().toLowerCase().includes(this.searchEquipo.toString().toLowerCase()))
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

  updateOrder(id_ot:number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._orderService.updateOrderState(id_ot, 3).subscribe(
        
        (data) => {
          console.log(id_ot);
          console.log("updateOrder");
          console.log(data);
          resolve();
        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject();
        }
      );
      
    });
  }
  
  confirmOrderCompletion(id_ot: number): void| undefined {
      this.updateOrder(id_ot)
  
}

  onPageChange(page: number): void {
    this.page = page;
  }

 

  estadoUpdated(id_ot: number | null ,estadoId: number | null) {
    // Lógica para manejar la actualización del estado en el componente padre
    this.createorupdateSolicitud(id_ot , estadoId);
    this.orderService.updateOrderState(id_ot ?? 0, estadoId ?? 0).subscribe(
      () => {
        console.log('Estado actualizado');
        this.loadOrders();

      },
      (error) => {
        console.error('Error actualizando el estado', error);
      }
    );
    this.router.navigate(['/reportes']).then(() => {
      window.location.reload();  // Recarga la página
    });
  }


  public async createorupdateSolicitud(id_ot:number | null, id_estado_ot:number| null): Promise<Solicitud> {




    const solicitudData: Solicitud = {
      id_ot: id_ot ?? 0, // Ensure id_ot is not null
      desc_sol: this.form.get('desc_sol')?.value,
      id_estado_ot: id_estado_ot ?? 0, // Ensure id_estado_ot is not null
      isView: false,
      fecha_emision: new Date(),
      fecha_plazo: this.form.get('fecha_plazo')?.value,

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

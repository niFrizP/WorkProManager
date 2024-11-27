import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';


// Interfaces
import { Order } from '../../interfaces/order';
import { Servicio } from '../../interfaces/servicio';
import { Usuario } from '../../interfaces/usuario';
import { Marca } from '../../interfaces/marca';
import { Equipo } from '../../interfaces/equipo';
import { Tipo } from '../../interfaces/tipo';
import { Cliente } from '../../interfaces/cliente';
import { Adjudicacion } from '../../interfaces/adjudicacion';
import { DetalleOT } from '../../interfaces/detalle_ot';
import { Solicitud } from '../../interfaces/solicitud';

// Services  
import { OrderService } from '../../services/order.service';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { MarcaService } from '../../services/marca.service';
import { ClienteService } from '../../services/cliente.service';
import { AdjudicacionService } from '../../services/adjudicacion.service';
import { EquipoService } from '../../services/equipo.service';
import { TipoService } from '../../services/tipo';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { AuthService } from '../../services/auth.service';
import { SolicitudService } from '../../services/solicitud.service';

// Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../components/modal/modal.component';
import Swal from 'sweetalert2';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [RouterLink,MatSnackBarModule, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent, FormsModule, ModalComponent],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent {
  isLoading = true; // Cambia el estado de carga cuando termine
  fechaHoy: string = ''; // Variable para almacenar la fecha actual
  ordenCreada: boolean = false; // Add this line


  [x: string]: any;
  onServiceChange($event: Event) {
  throw new Error('Method not implemented.');
  }
    mostrarSelectServicio: boolean = false; 
    servicios: Servicio[] = []; // Inicialización como array vacío
    serviciosArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
    usuarios: Usuario[] = [];
    marcas: Marca[] = [];
    tipos: Tipo[] = [];
    orders: Order[] = [];
    detalleOTs: DetalleOT[] = [];
    selectedUsuarioName: string | null = null;
    selectedUsuarioSurname: string | null = null;
    selectedServicioNombre: string | null = null;
    selectedMarcaNombre: string | null = null;
    serviciosSeleccionados: any = []; // Cambia 'any' por el tipo adecuado
    servicioSeleccionado: number | null = null;
    selectedTipoNombre: string | null = null;
    selectedServiceID: number | null = null;
    adjudicacionData: Adjudicacion[] = [];
    selectedUsuarioID: number | null = null;  // Add this line
    form: FormGroup;
    solicitudData: Solicitud[] = []
    loading: boolean = false;
    id_ot: number = 0;
    newSolicitudId: number | null = null;
    nuevoServicio: string = ''; // Variable para almacenar el nuevo servicio
    operacion: string = 'Agregar ';
    newOrderId: number | null = null; // Variable para almacenar el ID de la nueva orden
  selectedServicePrecio: any;
  rut_remitente: number | null = 0;
  rut_receptor: number | null = 0;
  alertVisible: boolean = false;
  servicioAEliminar: any = null;
  
  
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
      private tipoService:TipoService,
      private solicitudService:SolicitudService, 
      private authService: AuthService, 
      private adjudicacionService: AdjudicacionService
      
    ) {
      this.form = this.fb.group({
        //fecha entrega
        fecha: [null, Validators.required],
        // descripcion de orden de trabajo
        descripcion: ['', [Validators.required, Validators.minLength(10)]],
        //detalle cliente
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+$')]],
        apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+$')]],
        rut_cliente: [null, [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
        d_veri_cli: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9kK]$')]],
        correo: ['', [Validators.required, Validators.email]],
        celular: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        //detalle equipo
        mod_equipo: ['', Validators.required],
        id_marca: [null, Validators.required],
        tipo_equipo: ['', Validators.required],
        num_equipo: [null, Validators.required],
        fec_fabric: ['', Validators.required],
        //servicio
        servicios: this.fb.array([this.fb.group({id_serv: [null, Validators.required],})]),
        //usuario
        rut_usuario: [null, [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
        //descripción tecnico
        desc_sol: ['', [Validators.required, Validators.minLength(10)]],

        id_tipo: [null, Validators.required],
        id_estado: [1, Validators.required],
        rut_receptor: [null, Validators.required],
        rut_remitente: [null, Validators.required],
        isSubmitting: [false] // Add this line
      });
      this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));
    }
  
    ngOnInit(): void {
        // Redirige a la página de cotización después de 2 segundos


        // Carga de datos iniciales
        this.cargarTipoEquipo();
        this.cargarServicios();
        this.cargarUsuarios();
        this.cargarMarcas();

        // Configuración de datos del usuario
        this.rut_remitente = this.authService.getIdLocal();
        console.log('User ID:', this['userId']);

        // Establece la fecha actual
        const today = new Date();
        this.fechaHoy = today.toISOString().split('.')[0]; // Include time part

        // Verificación del token de usuario
        this.authService.verificarToken().subscribe({
            next: (data) => {
                // Guarda los datos de usuario
                this.authService.saveUserData(data.rut_usuario, data.id_rol);
                console.log('Usuario verificado:', data);
            },
            error: (err) => {
                console.error('Error al verificar el token:', err);
            },
        });

        // Cambia el estado de carga cuando termine
        this.isLoading = false;

        // Configura la operación según el ID de la orden de trabajo
        if (this.id_ot !== 0) {
            this.operacion = 'Editar ';
        }
    }
  
    async addProduct(): Promise<void> {
      this.loading = true;
    
      try {
        // Lógica para crear cliente, equipo, orden, etc.
        const cliente = await this.createOrUpdateCliente();
        const equipo = await this.createOrUpdateEquipo();
        const order = await this.createOrUpdateOrder();
        const detalleOT = await this.createOrUpdateDetalleOT();
        const solicitud = await this.createorupdateSolicitud();
        const adjudicacion = await this.cretaorupdateadjudicacion();
    
        console.log('New order ID:', this.newOrderId);
    
        // Mostrar SweetAlert2 al finalizar exitosamente
        Swal.fire({
          title: '¡Orden de trabajo creada!',
          text: `Orden de trabajo con número ${this.newOrderId} fue creada con éxito.`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6'
        });
    
        this.loading = false;
        this.ordenCreada = true;
    
        // Redirigir después de aceptar el mensaje
        Swal.fire({
          title: '¡Orden de trabajo creada!',
          text: `Orden de trabajo con número ${this.newOrderId} fue creada con éxito.`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/orders']); // Redirige a la página principal
          }
        });
      } catch (error) {
        console.error('Error creating order:', error);
        this.loading = false;
    
        // Manejar error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear la orden. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#d33'
        });
      }
    }
  
    cretaorupdateadjudicacion(): Promise<void> {
      const adjudicacionData: Adjudicacion = {
        id_ot: this.newOrderId!,
        rut_usuario: this.form.get('rut_usuario')?.value,
        fecha_adjudicacion: new Date()
      };
      return new Promise((resolve, reject) => {
        this.adjudicacionService.saveAdjudicaciones(adjudicacionData).subscribe({
          next: (response: any) => {
            console.log('Response from server:', response);
  
            // Asegúrate de que la respuesta tiene la estructura esperada
            const newAdjudicacion = response?.adjudicacion; // Accede al objeto 'adjudicacion'
  
            if (newAdjudicacion) {
              console.log('New adjudicacion created:', newAdjudicacion);
              resolve(); // Devuelve la adjudicación creada
            } else {
              console.warn('Adjudicacion object not found in response');
              reject(new Error('Adjudicacion object not found in response'));
            }
          },
          error: (error) => {
            console.error('Error creating adjudicacion:', error);
            reject(error);
          }
        });
      });
    }
  
    onServicioChange(event: any) {
      const servicioId = event.target.value;
      this.servicioSeleccionado = servicioId ? parseInt(servicioId) : null;
    }
  
    agregarServicio(event: Event) {
      event.preventDefault();
      if (this.servicioSeleccionado) {
        // Encontrar el servicio completo según el ID
        const servicio = this.servicios.find(serv => serv.id_serv === this.servicioSeleccionado);
        // Verificar si ya ha sido agregado
        if (servicio && !this.serviciosSeleccionados.includes(servicio)) {
          this.serviciosSeleccionados.push(servicio);
        }
        // Limpiar la selección para permitir agregar otro servicio
        this.servicioSeleccionado = null;
      }
    }
  
  
  
    eliminarServicio(servicio: any) {
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s: any) => s !== servicio);
    }
  
    private async createorupdateSolicitud(): Promise<Solicitud> {
      const solicitudData: Solicitud = {
        id_ot: this.newOrderId!,
        desc_sol: this.form.get('desc_sol')?.value,
        id_estado_ot: 1,
        isView: false,
        completada: false,
        fecha_emision: new Date(),
        fecha_plazo: new Date(Date.now() + 24 * 60 * 60 * 1000), // Fecha actual + 1 día
      };
      
      console.log('Solicitud data:')
      console.log(JSON.stringify(solicitudData, null, 1));
    
      
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
        
    

        
  
    private async createOrUpdateCliente(): Promise<Cliente> {
      const clienteData: Cliente = {
          rut_cliente: this.form.get('rut_cliente')?.value,
          d_veri_cli: this.form.get('d_veri_cli')?.value,
          ap_cli: this.form.get('apellido')?.value,
          nom_cli: this.form.get('nombre')?.value,
          email_cli: this.form.get('correo')?.value,
          cel_cli: this.form.get('celular')?.value
      };
  
      console.log('Cliente data:', JSON.stringify(clienteData, null, 2));
  
      try {
          // Attempt to get the existing client
          const existingCliente = await this.clienteService.getCliente(clienteData.rut_cliente!).toPromise().catch((error) => {
              if (error.status === 404) {
                  return null; // No client found, proceed to create
              }
              throw error; // Rethrow other errors
          });
  
          if (existingCliente) {
              // Update existing client
              const updatedCliente = await this.clienteService.updateCliente(clienteData.rut_cliente!, clienteData).toPromise();
              if (!updatedCliente) throw new Error('Failed to update cliente');
              return updatedCliente;
          } else {
              // Create a new client
              console.log('Attempting to create new client:', clienteData);
              return new Promise((resolve, reject) => {
                  this.clienteService.saveCliente(clienteData).subscribe({
                      next: (newCliente) => {
                          console.log('New client created:', newCliente);
                          resolve(newCliente);
                      },
                      error: (error) => {
                          console.error('Error creating client:', error);
                          reject(error);
                      }
                  });
              });
          }
      } catch (error) {
          console.error('Error al crear o actualizar el cliente:', error);
          throw error;
      }
  }

    private async createOrUpdateEquipo(): Promise<Equipo> {
      const equipoData: Equipo = {
        num_equipo: this.form.get('num_equipo')?.value,
        id_marca: this.form.get('id_marca')?.value,
        id_tipo: this.form.get('id_tipo')?.value,
        fecha_fab: this.form.get('fec_fabric')?.value,
        mod_equipo: this.form.get('mod_equipo')?.value,
      };
    
      console.log('Equipo data:', JSON.stringify(equipoData, null, 2));

      try {
        // Attempt to get the existing client
        const existingEquipo = await this.equipoService.getEquipo(equipoData.num_equipo!).toPromise().catch((error) => {
            if (error.status === 404) {
                return null; // No client found, proceed to create
            }
            throw error; // Rethrow other errors
        });
  
        if (existingEquipo) {
            // Update existing client
            const updateEquipo = await this.equipoService.updateEquipo(equipoData.num_equipo!, equipoData).toPromise();
            if (!updateEquipo) throw new Error('Failed to update equipo');
            return updateEquipo;
        } else {
            // Create a new client
            console.log('Attempting to create new device:', equipoData);
            return new Promise((resolve, reject) => {
                this.equipoService.saveEquipo(equipoData).subscribe({
                    next: (newEquipo) => {
                        console.log('New device created:', newEquipo);
                        resolve(newEquipo);
                    },
                    error: (error) => {
                        console.error('Error creating device :', error);
                        reject(error);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error al crear o actualizar el equipo:', error);
        throw error;
    }
  }
  
    private async createOrUpdateOrder(): Promise<Order> {
      
      const orderData: Order = {
          num_equipo: this.form.get('num_equipo')?.value,
          fec_creacion: new Date(),
          fec_entrega: this.form.get('fecha')?.value,
          descripcion: this.form.get('descripcion')?.value,
          rut_cliente: this.form.get('rut_cliente')?.value,
      };
  
      try {
          const existingOrder = await this._orderService.getOrder(orderData.id_ot!).toPromise().catch((error) => {
              if (error.status === 404) {
                  return null; // No order found, proceed to create
              }
              throw error; // Rethrow other errors
          });
  
          if (existingOrder) {
              // Update existing order
              const updateOrder = await this._orderService.updateOrder(orderData.id_ot!, orderData).toPromise();
              if (!updateOrder) throw new Error('Failed to update order');
              return updateOrder;
          } else {
              // Create a new order
              return new Promise((resolve, reject) => {
                this._orderService.saveOrder(orderData).subscribe({
                    next: (response: any) => {  // Usamos 'any' para acceder a la respuesta completa
                        console.log('Response from server:', response);
            
                        // Asegúrate de que la respuesta tiene la estructura esperada
                        const newOrder = response?.order; // Accede al objeto 'order'
            
                        if (newOrder) {
                            this.newOrderId = newOrder?.id_ot; // Accede a la propiedad 'id_ot'
            
                            if (this.newOrderId) {
                                console.log('New order ID:', this.newOrderId);
                            } else {
                                console.warn('No order ID found in response');
                            }
            
                            resolve(newOrder); // Devuelve la orden creada
                        } else {
                            console.warn('Order object not found in response');
                            reject(new Error('Order object not found in response'));
                        }
                    },
                    error: (error) => {
                        console.error('Error creating order:', error);
                        reject(error);
                    }
                });
            });
            
          }
      } catch (error) {
          console.error('Error creating or updating the order:', error);
          throw error;
      }
  }
  
  private async createOrUpdateDetalleOT(): Promise<DetalleOT[]> {
    // Crea un array de detalles OT a partir de servicios seleccionados
    const detalleOTData: DetalleOT[] = this.serviciosSeleccionados.map((servicio: Servicio) => ({
      id_ot: this.newOrderId!, // Asegúrate de que newOrderId esté definido
      id_serv: servicio.id_serv!,
      fecha_detalle: new Date(),
      desc_detalle: servicio.nom_serv!,
      d_estado: 0,
    }));
  
    console.log('DetalleOT data:', JSON.stringify(detalleOTData, null, 2));
  
    const detalleOTResponses: DetalleOT[] = []; // Almacenará las respuestas de detalleOT
  
    try {
      // Itera sobre cada detalle OT
      for (const detalle of detalleOTData) {
        const existingDetalleOT = await this.detalleOTService
          .getListDetalleOTByOT(detalle.id_ot!, detalle.id_serv!)
          .toPromise()
          .catch((error) => {
            if (error.status === 404) {
              return null; // No detalleOT found, proceed to create
            }
            throw error; // Rethrow other errors
          });
  
        if (existingDetalleOT) {
          // Update existing detalleOT
          const updateDetalleOT = await this.detalleOTService
            .updateDetalleOT(detalle.id_ot!, detalle.id_serv!, detalle)
            .toPromise();
  
          if (!updateDetalleOT) throw new Error('Failed to update detalleOT');
          detalleOTResponses.push(updateDetalleOT); // Agregar a las respuestas
        } else {
          // Create a new detalleOT
          const newDetalleOT = await this.detalleOTService.saveDetalleOT(detalle).toPromise();
  
          if (!newDetalleOT) throw new Error('Failed to create detalleOT');
          console.log('New detalleOT created:', newDetalleOT);
          detalleOTResponses.push(newDetalleOT); // Agregar a las respuestas
        }
      }
  
      return detalleOTResponses; // Devuelve todas las respuestas de detalleOT
    } catch (error) {
      console.error('Error creating or updating the detalleOT:', error);
      throw error;
    }
  }
  
    cargarServicios() {
      this.servicioService.getListServicios().subscribe({
        next: (data: Servicio[]) => {
          this.servicios = data; // Asigna la respuesta a la variable
        },
        error: (error) => {
          console.error('Error al cargar servicios:', error); // Manejo de errores
        },
        complete: () => {
          console.log('Carga de servicios completada'); // (Opcional) Mensaje de finalización
        }
      });
    }
  
    serviceID(event: Event) {
      const selectedId = (event.target as HTMLSelectElement).value;
      const selectedService = this.servicios.find(servicio => servicio.id_serv?.toString() === selectedId);
      
      // Comprobar si el servicio seleccionado existe antes de acceder a su precio
      if (selectedService) {
        this.selectedServiceID = selectedService.id_serv ?? null;
      } else {
        this.selectedServiceID = null;
      }
    }
  
    cargarUsuarios() {
      this.usuarioService.getListUsuarios().subscribe({
        next: (data: Usuario[]) => {
          this.usuarios = data; // Asigna la respuesta a la variable
        },
        error: (error) => {
          console.error('Error al cargar usuarios:', error); // Manejo de errores
        },
        complete: () => {
          console.log('Carga de usuarios completada'); // (Opcional) Mensaje de finalización
        }
      });
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
    
    cargarMarcas() {
      this.marcaService.getListMarcas().subscribe({
        next: (data: Marca[]) => {
          this.marcas = data; // Asigna la respuesta a la variable
        },
        error: (error) => {
          console.error('Error al cargar marcas:', error); // Manejo de errores
        },
        complete: () => {
          console.log('Carga de marcas completada'); // (Opcional) Mensaje de finalización
        }
      });
    }
  
    cargarTipoEquipo() {
      this.tipoService.getListTipos().subscribe({
        next: (data: Tipo[]) => {
          this.tipos = data; // Asigna la respuesta a la variable
        },
        error: (error) => {
          console.error('Error al cargar tipos:', error); // Manejo de errores
        },
        complete: () => {
          console.log('Carga de tipos completada'); // (Opcional) Mensaje de finalización
        }
      });
    }
  
    onTipoChange(event: Event) {
      const selectedId = (event.target as HTMLSelectElement).value;
      const selectedUser = this.tipos.find(tipo => tipo.id_tipo?.toString() === selectedId);
      
      // Comprobar si el usuario seleccionado existe antes de acceder a su precio
      if (selectedUser) {
        this.selectedTipoNombre = selectedUser.nom_tipo // Usa la propiedad precio o lo que necesites
       
      } else {
        this.selectedTipoNombre = null// Usa la propiedad precio o lo que necesites
  
  
      }
    }
    
    onMarcaChange(event: Event) {
      const selectedId = (event.target as HTMLSelectElement).value;
      const selectedUser = this.marcas.find(marca => marca.id_marca?.toString() === selectedId);
      
      // Comprobar si el usuario seleccionado existe antes de acceder a su precio
      if (selectedUser) {
        this.selectedMarcaNombre = selectedUser.nom_marca // Usa la propiedad precio o lo que necesites
       
      } else {
        this.selectedMarcaNombre = null// Usa la propiedad precio o lo que necesites
  
  
      }
    }
     // Nueva función para mostrar/ocultar el select de servicios
     toggleSelectServicio(): void {
      this.mostrarSelectServicio = !this.mostrarSelectServicio;
    }
  
    mostrarAlertaEliminarServicio(servicio: any) {
      this.servicioAEliminar = servicio;
      this.alertVisible = true;
    }
  
    confirmarEliminarServicio() {
      this.eliminarServicio(this.servicioAEliminar);
      this.alertVisible = false;
      this.servicioAEliminar = null;
    }
  
    cancelarEliminarServicio() {
      this.alertVisible = false;
      this.servicioAEliminar = null;
    }
  
    validateDateTime(event: any): void {
      const selectedDateTime = new Date(event.target.value);
      const day = selectedDateTime.getUTCDay();
      const hours = selectedDateTime.getUTCHours();
  
      // Check if the selected day is Saturday (6) or Sunday (0)
      if (day === 6 || day === 0) {
          alert('No se permiten fechas en sábado o domingo.');
          event.target.value = '';
          return;
      }
  
      // Check if the selected time is outside 9 AM to 5 PM
      if (hours < 9 && hours >= 17) {
          alert('La hora debe estar entre las 9:00 y las 17:00.');
          event.target.value = '';
          return;
      }
  
      // Check if the selected date and time is in the past
      const now = new Date();
      if (selectedDateTime < now) {
          alert('No se permiten fechas y horas anteriores a la actual.');
          event.target.value = '';
      }
  }
  
  }




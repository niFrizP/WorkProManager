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
import { AuthService } from '../../services/auth.service';

// Services
import { OrderService } from '../../services/order.service';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { MarcaService } from '../../services/marca.service';
import { ClienteService } from '../../services/cliente.service';
import { EquipoService } from '../../services/equipo.service';
import { SolicitudService } from '../../services/solicitud.service';

// Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { error } from 'console';
import { Solicitud } from '../../interfaces/solicitud';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent, FormsModule, ModalComponent],
  templateUrl: './edit-order.component.html',
  // styleUrls: ['./new-ot.component.css']
})
export class EditOrderComponent implements OnInit {
  mostrarSelectServicio: boolean = false; 
    solicitudForm: FormGroup;  // Define el FormGroup para el formulario

  solicitudes: Solicitud[] = [];
  solicitudesInvertidas: Solicitud[] = [];
  servicios: Servicio[] = []; // Inicialización como array vacío
  serviciosArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
  serviciosSeleccionados: any = []; // Cambia 'any' por el tipo adecuado
  servicioSeleccionado: number | null = null;
  usuarios: Usuario[] = [];
  newSolicitudId: number | null = null;
  marcas: Marca[] = [];
  newOrders: newOrder[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;  // Add this line
  form: FormGroup;
  formDetalleOT: FormGroup;
  loading: boolean = false;
  id_ot: number ;
  conseguirUsuarioReceptor: number | null = 0;
  conseguirUsuarioRemisor: number | null = 0;
  nuevoServicio: string = ''; // Variable para almacenar el nuevo servicio
  operacion: string = 'Agregar ';
  isSubmitting: boolean = false;
  orderId: number | undefined;
  newOrderId: number | null = null; // Variable para almacenar el ID de la nueva orden
  orderDetails: newOrder | null = null;
  detalleOT: DetalleOT[] = [];
  isModalOpen = true;
  cargando = true;
  rut_remitente: number | null = 0;
  rut_receptorActual: number | null = 0;
  rut_receptor: number | null = 0;
  soli : number | null = 0;



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
    private authService: AuthService
    
  ) {

    this.solicitudForm = this.fb.group({
      id_sol: [null],
      id_ot: [null],
      desc_sol: [''],
      id_estado_ot: [null]
    });

    const orden_id = this.aRouter.snapshot.paramMap.get('id_ot');


    this.form = this.fb.group({
      id_ot: [null, Validators.required],
      num_equipo: [null, Validators.required],
      id_estado: [2, Validators.required],
      costo: [null, Validators.required],
      fecha: [null, Validators.required],
      descripcion: ['', Validators.required],
      rut_cliente: [null, Validators.required],
      servicios: this.fb.array([this.fb.group({
        id_serv: [null, Validators.required],
      })]),
      rut_usuario: [null, Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: [null, Validators.required],
      correo: ['', Validators.required],
      tipo_equipo: ['', Validators.required],
      mod_equipo: ['', Validators.required],
      fec_fabric: ['', Validators.required],
      id_marca: [null, Validators.required],
      d_veri_cli: ['', Validators.required],
      desc_sol: ['', Validators.required],
      rut_receptor: [null, Validators.required],
      rut_remitente: [null, Validators.required],
      
    });
    
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));


    this.formDetalleOT = this.fb.group({
      servicios: this.fb.array([this.fb.group({
        id_serv: [null, Validators.required],
      })]),
    });
  }

  ngOnInit(): void {
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.serviciosSeleccionados = [];
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));
    this.updateSolicitudOnLoad()
    this.loadOrder(this.id_ot);
    this.loadDetalle(this.id_ot);
    console.log(this.id_ot);
    this.form.patchValue({ rut_usuario: this.form.get('rut_usuario')?.value });
    this.cargarServicios();
    this.cargarUsuarios();
    this.cargarMarcas();
    this.getot(this.id_ot);
    this.rut_remitente = this.authService.getIdLocal()
    console.log(this.rut_remitente);
    this.rut_receptorActual = this.authService.getIdLocal()
    console.log(this.updateeee() );
    this.soli = this.updateeee() || 0;
    console.log(this.soli);
    

    if (this.id_ot !== 0) {
      this.operacion = 'Editar ';
      
    }
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


  this.conseguirUsuarioReceptor = this.conseguirRolRemitente(this.solicitudesInvertidas[0].rut_receptor ?? 0) ?? 0;

  this.conseguirUsuarioRemisor = this.conseguirRolRemitente(this.solicitudesInvertidas[0].rut_remitente ?? 0) ?? 0;
  
  if(this.authService.getRolId() != this.conseguirUsuarioRemisor){
    return this.solicitudesInvertidas[0].rut_receptor ?? 0;}
    else{
      return this.solicitudesInvertidas[0].rut_remitente ?? 0;
    }
    

  


}

  private log(){
    console.log(this.id_ot);
  }

  loadOrder(id: number): void {
    this._orderService.getNewOrder(id).subscribe(
      (data: newOrder) => {
        // Asumiendo que 'data' tiene la estructura necesaria
        this.form.patchValue({
          id_ot: data.id_ot,
          fecha_creacion: data.fec_creacion,
          fecha: data.fec_entrega,
          descripcion: data.descripcion,
          apellido: data.cliente.ap_cli,
          tipo_equipo: data.Equipo.mod_equipo,
          celular: data.cliente.cel_cli,
          correo: data.cliente.nom_cli,
          d_veri_cli: data.cliente.d_veri_cli,
          ap_usu: data.Usuario.ap_usu,
          nom_usu: data.Usuario.nom_usu, // Cambia esto si el nombre no está directamente en 'Usuario'
          rut_cliente: data.rut_cliente,
          nombre: data.cliente.nom_cli,
          mod_equipo: data.Equipo.mod_equipo, // Asegúrate de que esta propiedad exista
          num_equipo: data.num_equipo, // Asegúrate de que esta propiedad exista
          fec_fabric: data.Equipo.fecha_fab,
          id_marca: data.Equipo.id_marca,
          rut_usuario: data.rut_usuario,// Cambia esto si el ID de usuario no está directamente en 'Usuario'
          servicios: this.fb.array([this.fb.group({
            id_serv: [null, Validators.required],
          })])
          

        });
        console.log("Datos cargados desde la API:");
        console.log(data); // Para verificar los datos cargados
      },
      (error) => {
        console.error('Error fetching order', error);
      }
    );
  }

  loadDetalle(id: number): Promise<DetalleOT[]> {
    return new Promise((resolve, reject) => {
      this.detalleOTService.getListDetalleOTByOTId(id).subscribe(
        (data: DetalleOT[]) => {
          console.log(data);
          resolve(data);  // Resolviendo la promesa con los datos recibidos
          console.log('DetalleOT Data:', data);
  
          // Filtrar y extraer los servicios a partir de los datos obtenidos
          this.serviciosSeleccionados = data.map((detalle: DetalleOT) => ({
            id_serv: detalle.id_serv,
            nom_serv: detalle.desc_detalle, // Asegúrate de que esta propiedad exista o ajústala según tu API
            fecha_detalle: detalle.fecha_detalle
          }));
  
          console.log('Servicios seleccionados:', this.serviciosSeleccionados);
  
          resolve(data); // Resolviendo la promesa con los datos recibidos
        },
        (error) => {
          reject(error);  // Rechazando la promesa en caso de error
          console.error('Error al cargar los detalles:', error);
          reject(error); // Rechazando la promesa en caso de error
        }
      );
    });
  }
  
  getot(id_ot: number) {
    this.solicitudService.getSolByOt(id_ot).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
      console.log(this.solicitudes);

      // Usa patchValue para actualizar los valores del formulario con la primera solicitud obtenida
      if (this.solicitudes.length > 0) {
        this.solicitudForm.patchValue(this.solicitudes[0]);
      }
    });
  }

  openModal(event:Event) {

    event.preventDefault(); // Esto evita que el botón haga submit del formulario
    this.isModalOpen = true;
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));
    console.log('Abriendo modal con id_ot:', this.id_ot);  // Verifica que el id_ot se pasa al abrir el modal

  }

  closeModal() {
    this.isModalOpen = false;
  }

  private async createorupdateSolicitud(): Promise<Solicitud> {

    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));

    
    this.soli = this.updateeee() || 0;

    const solicitudData: Solicitud = {
      id_ot: this.id_ot,
      desc_sol: this.form.get('desc_sol')?.value,
      id_estado_ot: this.form.get('id_estado')?.value,
      isView: false,
      fecha_emision: new Date(),
      rut_remitente: this.rut_receptorActual,
      rut_receptor: this.soli
    };
    
    console.log('Solicitud data:')
    console.log(JSON.stringify(solicitudData, null, 2));

    this.solicitudService.updateSolicitudByFechaTermino(this.solicitudes[0].id_sol!, new Date).subscribe({
      next: () => {
        console.log('Solicitud updated successfully');
      }
    });
    
  
    
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


      updateSolicitudOnLoad() {

        

        this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));


          

        this.solicitudService.getSolByOt(this.id_ot).subscribe((data: Solicitud[]) => {
          this.solicitudes = data;
          this.solicitudesInvertidas = data.reverse();
          console.log(this.solicitudes[0].isView);

        
    if(this.solicitudes[0].isView == false) {
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
 
  
      }else(this.authService.getRolId() != 2   && this.solicitudesInvertidas[0].id_estado_ot == 2 && this.solicitudesInvertidas[0].isView == false);
       {
        this.solicitudService.updateSolicitudByView(this.solicitudesInvertidas[0].id_sol!, true).subscribe({
          next: () => {
            console.log('Solicitud updated successfully');
          },
        });   


        this.solicitudService.updateSolicitudByFecha(this.solicitudesInvertidas[0].id_sol!, new Date).subscribe({
          next: () => {
            console.log('Solicitud updated successfully');
          },
        });   
      }

      });
      
    }
    
    
  
  async editProduct(): Promise<void> {
    this.loading = true;

    if (this.isSubmitting) return; // Si ya se está enviando, no hacer nada
    this.isSubmitting = true; // Desactivar el botón

    try {
      // 1. Create or update cliente
      const cliente = await this.createOrUpdateCliente();

      // 2. Create or update equipo
      const equipo = await this.createOrUpdateEquipo();

      const order = await this.createOrUpdateOrder();


      const detalleOT = await this.createOrUpdateDetalleOT();

      const solicitud = await this.createorupdateSolicitud();


      console.log(order);

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

  private async createOrUpdateCliente(): Promise<Cliente> {
    const clienteData: Cliente = {
        rut_cliente: this.form.get('rut_cliente')?.value,
        d_veri_cli: this.form.get('d_veri_cli')?.value,
        apellido: this.form.get('apellido')?.value,
        ap_cli: this.form.get('apellido')?.value,
        nom_cli: this.form.get('nombre')?.value,
        cel_cli: this.form.get('celular')?.value,
        email_cli: this.form.get('correo')?.value,
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
      mod_equipo: this.form.get('mod_equipo')?.value,
      id_marca: this.form.get('id_marca')?.value
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
  // ... (resto del código sin cambios)

  private async createOrUpdateOrder(): Promise<Order> {
    // Usar this.id_ot en lugar de obtenerlo del formulario
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));


    const orderData: Order = {
        id_ot: this.id_ot,
        num_equipo: this.form.get('num_equipo')?.value,
        id_estado_ot: this.form.get('id_estado')?.value,
        fec_creacion: new Date(),
        fec_entrega: this.form.get('fecha')?.value,
        descripcion: this.form.get('descripcion')?.value,
        rut_usuario: this.form.get('rut_usuario')?.value,
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
          console.log("No existe la orden");
          console.log(orderData);
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
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));

    // Crea un array de detalles OT a partir de servicios seleccionados
    const detalleOTData: DetalleOT[] = this.serviciosSeleccionados.map((servicio: Servicio) => ({
      id_ot: this.id_ot, // Asegúrate de que newOrderId esté definido
      id_serv: servicio.id_serv!,
      fecha_detalle: new Date(),
      desc_detalle: servicio.nom_serv!,
      rut_usuario: this.form.get('rut_usuario')?.value,
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
  
 
  onServicioChange(event: any) {
    event.preventDefault();
    const servicioId = event.target.value;
    this.servicioSeleccionado = servicioId ? parseInt(servicioId) : null;
  }

  agregarServicio(event:Event) {
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

  eliminarServicio(event: Event, servicio: any) {
    console.log(servicio);
    this.deleteDetalleOT(this.id_ot, servicio.id_serv);

    this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s: { id_serv: any }) => s.id_serv !== servicio.id_serv);
    }

  deleteDetalleOT(id_ot: number, id_serv: number) {
    this.detalleOTService.deleteDetalleOT(id_ot, id_serv).subscribe({
      next: () => {
        console.log('DetalleOT deleted successfully');
      },
    });
  }

  serviceID(event: Event) {
    event.preventDefault();
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

  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;

    // Simula un proceso de guardado (esto puede ser una llamada a tu servicio)
    setTimeout(() => {
      this.isSubmitting = false;
      this.editProduct()
      // Aquí puedes agregar lógica para manejar la respuesta de tu API
    }, 2000);
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

  loadOrders(id: number): void {
    this._orderService.getlistnewOrders().subscribe(
      (data: newOrder[]) => {
        this.newOrders = data;
        console.log(this.newOrders.map(newOrder => ({
          id: newOrder.id_ot,      // Asegúrate de que 'id' esté disponible en newOrder
          Equipo: newOrder.Equipo
        })));
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
  
  getOrderIdFromUrl(): number {
    const urlSegments = window.location.pathname.split('/');
    return Number(urlSegments[urlSegments.length - 1]); // Asegúrate de que este índice sea correcto
  }
  
  toggleSelectServicio(): void {
    this.mostrarSelectServicio = !this.mostrarSelectServicio;
  }
}

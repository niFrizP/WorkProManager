import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

// Services
import { OrderService } from '../../services/order.service';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { MarcaService } from '../../services/marca.service';
import { ClienteService } from '../../services/cliente.service';
import { EquipoService } from '../../services/equipo.service';

// Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-new-ot',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent],
  templateUrl: './new-ot.component.html',
  // styleUrls: ['./new-ot.component.css']
})
export class NewOtComponent implements OnInit {
  servicios: Servicio[] = []; // Inicialización como array vacío
  usuarios: Usuario[] = [];
  marcas: Marca[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;  // Add this line
  form: FormGroup;
  loading: boolean = false;
  id_ot: number = 0;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private servicioService:ServicioService,
    private usuarioService:UsuarioService,
    private marcaService:MarcaService,
    private equipoService:EquipoService,
    private clienteService:ClienteService
    
  ) {
    this.form = this.fb.group({
      num_equipo: [null, Validators.required],
      id_estado: [1, Validators.required],
      costo: [null, Validators.required],
      fecha: [null, Validators.required],
      descripcion: ['', Validators.required],
      rut_cliente: [null, Validators.required],
      id_serv: [null, Validators.required],
      id_usuario: [null, Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: [null, Validators.required],
      correo: ['', Validators.required],
      tipo_equipo: ['', Validators.required],
      mod_equipo: ['', Validators.required],
      fec_fabric: ['', Validators.required],
      id_marca: [null, Validators.required],
      d_verificador_cliente: ['', Validators.required]
      
    });
    
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));
  }

  ngOnInit(): void {

    this.cargarServicios();
    this.cargarUsuarios();
    this.cargarMarcas();


    

    if (this.id_ot !== 0) {
      this.operacion = 'Editar ';
      
    }
  }

  async addProduct(): Promise<void> {
    this.loading = true;

    try {
      // 1. Create or update cliente
      const cliente = await this.createOrUpdateCliente();

      // 2. Create or update equipo
      const equipo = await this.createOrUpdateEquipo();



      // 3. Create order
      const order: Order = {
        num_equipo: this.form.get('num_equipo')?.value,
        costo: this.selectedServicePrecio ?? 0,
        fecha: this.form.value.fecha,
        descripcion: this.form.value.descripcion,
        id_estado: this.form.value.id_estado,
        rut_cliente: this.form.get('rut_cliente')?.value,
        id_serv: this.form.get('id_serv')?.value,
        id_usuario: this.form.get('id_usuario')?.value,
        equipo: equipo, // Assuming equipo is the result from createOrUpdateEquipo
        estado: this.form.get('id_estado')?.value // Assuming estado is the same as id_estado
      };

      // Log the JSON representation of the order
      console.log('Order JSON:', JSON.stringify(order, null, 2));

      await this._orderService.saveOrder(order).toPromise();

      this.loading = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error creating order:', error);
      this.loading = false;
      // Handle error (e.g., show error message to user)
    }
  }

  private async createOrUpdateCliente(): Promise<Cliente> {
    const clienteData: Cliente = {
        rut_cliente: this.form.get('rut_cliente')?.value,
        d_verificador_cliente: this.form.get('d_verificador_cliente')?.value,
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        correo: this.form.get('correo')?.value,
        celular: this.form.get('celular')?.value
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
      tipo_equipo: this.form.get('tipo_equipo')?.value,
      mod_equipo: this.form.get('mod_equipo')?.value,
      fec_fabric: this.form.get('fec_fabric')?.value,
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
  
 
  onServiceChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedService = this.servicios.find(servicio => servicio.id_serv?.toString() === selectedId);
    
    if (selectedService) {
      this.selectedServicePrecio = selectedService.precio;
      this.selectedServiceID = selectedService.id_serv ?? null;
      this.form.patchValue({ id_serv: this.selectedServiceID });
    } else {
      this.selectedServicePrecio = null;
      this.selectedServiceID = null;
      this.form.patchValue({ id_serv: null });
    }
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
    const selectedUser = this.usuarios.find(usuario => usuario.id_usuario?.toString() === selectedId);
    
    if (selectedUser) {
      this.selectedUsuarioName = selectedUser.nom_usu;
      this.selectedUsuarioSurname = selectedUser.ap_usu;
      this.selectedUsuarioID = selectedUser.id_usuario ?? null;
      this.form.patchValue({ id_usuario: this.selectedUsuarioID });
    } else {
      this.selectedUsuarioName = null;
      this.selectedUsuarioSurname = null;
      this.selectedUsuarioID = null;
      this.form.patchValue({ id_usuario: null });
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
      this.selectedMarcaNombre = selectedUser.nombre_marca // Usa la propiedad precio o lo que necesites
     
    } else {
      this.selectedMarcaNombre = null// Usa la propiedad precio o lo que necesites


    }
  }

}
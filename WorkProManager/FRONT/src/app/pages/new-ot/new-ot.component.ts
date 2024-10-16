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
})
export class NewOtComponent implements OnInit {
  servicios: Servicio[] = [];
  usuarios: Usuario[] = [];
  marcas: Marca[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;
  form: FormGroup;
  loading: boolean = false;
  id_ot: number = 0;
  operacion: string = 'Agregar ';
  isSubmitting: boolean = false;
  formSubmitAttempt: boolean = false; // Para manejar el intento de envío del formulario

  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private servicioService: ServicioService,
    private usuarioService: UsuarioService,
    private marcaService: MarcaService,
    private equipoService: EquipoService,
    private clienteService: ClienteService
  ) {
    this.form = this.fb.group({
      num_equipo: [null, Validators.required],
      id_estado: [1, Validators.required],
      costo: [null, [Validators.required, Validators.min(0)]],  // Asegura que el costo sea positivo
      fecha: [null, Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],  // Descripción debe tener al menos 10 caracteres
      rut_cliente: [null, Validators.required],
      id_serv: [null, Validators.required],
      id_usuario: [null, Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: [null, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],  // Número de teléfono de 9 dígitos
      correo: [null, [Validators.required, Validators.email]],  // Asegura un formato de correo válido
      tipo_equipo: ['', Validators.required],
      mod_equipo: ['', Validators.required],
      fec_fabric: ['', Validators.required],
      id_marca: [null, Validators.required],
      d_verificador_cliente: ['', Validators.required],
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
    this.formSubmitAttempt = true;  // Activar mensajes de validación

    if (this.form.invalid) {
      this.handleFormErrors();
      return;  // Prevenir el envío si el formulario es inválido
    }

    this.loading = true;
    try {
      const cliente = await this.createOrUpdateCliente();
      const equipo = await this.createOrUpdateEquipo();

      const order: Order = {
        num_equipo: this.form.get('num_equipo')?.value,
        costo: this.selectedServicePrecio ?? 0,
        fecha: this.form.value.fecha,
        descripcion: this.form.value.descripcion,
        id_estado: this.form.value.id_estado,
        rut_cliente: this.form.get('rut_cliente')?.value,
        id_serv: this.form.get('id_serv')?.value,
        id_usuario: this.form.get('id_usuario')?.value,
        equipo: equipo,
        estado: this.form.get('id_estado')?.value
      };

      await this._orderService.saveOrder(order).toPromise();
      this.loading = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error creando orden:', error);
      this.loading = false;
      alert('Hubo un error al crear la orden. Por favor, inténtalo de nuevo.');
    }

    setTimeout(() => {
      console.log("Orden de trabajo guardada");
      this.isSubmitting = false; // Rehabilitar el botón después de completar
    }, 2000);
  }

  // Mostrar mensajes de error para campos inválidos
  handleFormErrors() {
    alert('Por favor, revisa los errores en el formulario.');
  }

  // Función auxiliar para verificar si un control de formulario es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return (control?.invalid ?? false) && (control?.dirty || control?.touched || this.formSubmitAttempt);
  }

  async createOrUpdateCliente(): Promise<Cliente> {
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
      const existingCliente = await this.clienteService.getCliente(clienteData.rut_cliente!).toPromise().catch((error) => {
        if (error.status === 404) {
          return null; // No client found, proceed to create
        }
        throw error; // Rethrow other errors
      });

      if (existingCliente) {
        const updatedCliente = await this.clienteService.updateCliente(clienteData.rut_cliente!, clienteData).toPromise();
        if (!updatedCliente) throw new Error('Failed to update cliente');
        return updatedCliente;
      } else {
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

  async createOrUpdateEquipo(): Promise<Equipo> {
    const equipoData: Equipo = {
      num_equipo: this.form.get('num_equipo')?.value,
      tipo_equipo: this.form.get('tipo_equipo')?.value,
      mod_equipo: this.form.get('mod_equipo')?.value,
      fec_fabric: this.form.get('fec_fabric')?.value,
      id_marca: this.form.get('id_marca')?.value
    };

    console.log('Equipo data:', JSON.stringify(equipoData, null, 2));

    try {
      const existingEquipo = await this.equipoService.getEquipo(equipoData.num_equipo!).toPromise().catch((error) => {
        if (error.status === 404) {
          return null; // No client found, proceed to create
        }
        throw error; // Rethrow other errors
      });

      if (existingEquipo) {
        const updateEquipo = await this.equipoService.updateEquipo(equipoData.num_equipo!, equipoData).toPromise();
        if (!updateEquipo) throw new Error('Failed to update equipo');
        return updateEquipo;
      } else {
        console.log('Attempting to create new device:', equipoData);
        return new Promise((resolve, reject) => {
          this.equipoService.saveEquipo(equipoData).subscribe({
            next: (newEquipo) => {
              console.log('New device created:', newEquipo);
              resolve(newEquipo);
            },
            error: (error) => {
              console.error('Error creating device:', error);
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

  onMarcaChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedMarca = this.marcas.find(marca => marca.id_marca?.toString() === selectedId);
    
    if (selectedMarca) {
      this.selectedMarcaNombre = selectedMarca.nombre_marca;
    } else {
      this.selectedMarcaNombre = null;
    }
  }
}

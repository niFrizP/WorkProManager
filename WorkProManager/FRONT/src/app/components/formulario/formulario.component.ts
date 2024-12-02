import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CotizacionService } from '../../services/cotizacion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { vistaOrden } from '../../interfaces/vistaOrden';
import { Trabajador } from '../../interfaces/trabajador';
import { Marca } from '../../interfaces/marca';
import { MarcaService } from '../../services/marca.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { Servicio } from '../../interfaces/servicio';
import { ServicioService } from '../../services/servicio.service';
import { EstadoOTService } from '../../services/estado-ot.service';
import { EstadoOT } from '../../interfaces/estadoot';
import { ServicioOrdenService } from '../../services/insertarServicio.service';
import { vistaServicio } from '../../interfaces/vistaServicio';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {

  servicios: Servicio[] = [];
  tecnicos: Trabajador[] = [];
  marcas: Marca[] = [];
  estados: EstadoOT[] = [];

  vistaServicio:vistaServicio[] = [];
  vistaOrden: vistaOrden[] = [];
  cotizacionForm!: FormGroup;
  asignacionForm!: FormGroup;


  // Array para los servicios añadidos con id_serv y nom_serv
  selectedServiceID: number | null = null;
  serviciosArray: FormArray;
  serviciosSeleccionados: any[] = []; // Store selected services
  servicioSeleccionado: number | null = null; // Store selected service ID
  alertVisible: boolean = false; // Flag to control alert visibility
  servicioAEliminar: any = null; // Store service to delete
  confirmModalVisible: boolean = false; // Flag to control modal visibility
  

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router,
    private trabajadorService: TrabajadorService,
    private marcaService: MarcaService,
    private servicioService: ServicioService,
    private estadoService: EstadoOTService,
    private servicioOrdenService: ServicioOrdenService
  ) {
    // Inicializa el formulario con un array de servicios
    this.cotizacionForm = this.fb.group({
      serviciosArray: this.fb.array([]) // Form array for selected services
    });
    this.serviciosArray = this.cotizacionForm.get('serviciosArray') as FormArray;
    
  }

  ngOnInit() {
    // Cargar datos iniciales
    this.cargarTecnicos();
    this.cargarMarcas();
    this.cargarServicios();
    this.cargarEstados();

    // Inicializa el formulario de cotización con validaciones
    this.cotizacionForm = this.fb.group({
      nom_cli: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dir_cli: ['', Validators.required],
      tel_cli: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email_cli: ['', [Validators.required, Validators.email]],
      ape_cli: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      rut_cli: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      d_ver_cli: ['', [Validators.required, Validators.pattern('^[0-9kK]$')]],
      desc_ot: ['', Validators.required],
      fec_ter: [null, Validators.required],
      det_adic: [''],
      num_ser: [null, Validators.required],
      id_marca: [null, Validators.required],
      tip_equ: [null, Validators.required],
      mod_equ: [''],
      desc_serv: ['']
    });

    // Inicializa el formulario de asignación con validaciones
    this.asignacionForm = this.fb.group({
      rut_ges: [78901234],
      rut_tec: [null, Validators.required],
      notas_asig: [''],
      id_estado: [null, Validators.required]
    });

    // Actualiza el servicio seleccionado cuando cambia el valor
    this.cotizacionForm.get('id_serv')?.valueChanges.subscribe(value => {
      this.servicioSeleccionado = value;
    });
  }

  // Cargar la lista de técnicos
  cargarTecnicos(): void {
    this.trabajadorService.getTecnicos().subscribe({
      next: (data) => {
        this.tecnicos = data;
        console.log('Técnicos obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener técnicos:', err);
      }
    });
  }

  // Cargar la lista de marcas
  cargarMarcas(): void {
    this.marcaService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
        console.log('Marcas obtenidas:', data);
      },
      error: (err) => {
        console.error('Error al obtener marcas:', err);
      }
    });
  }


  //Cargar lista de estado de OTS

  cargarEstados(): void {
    this.estadoService.getEstadoOTs().subscribe({
      next: (data) => {
        this.estados = data;
        console.log('Estados obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener estados:', err);
      }
    });
  }

  // Cargar la lista de servicios
  cargarServicios(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener servicios:', err);
      }
    });
  }

  // Manejar cambio de servicio seleccionado
  serviceID(event: Event) {
    event.preventDefault();
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedService = this.servicios?.find(servicio => servicio.id_serv?.toString() === selectedId);
    
    // Comprobar si el servicio seleccionado existe antes de acceder a su precio
    if (selectedService) {
      this.selectedServiceID = selectedService.id_serv ?? null;
    } else {
      this.selectedServiceID = null;
    }
  }

  // Manejar cambio de servicio en el formulario
  onServicioChange(event: any) {
    event.preventDefault();
    const servicioId = event.target.value;
    this.servicioSeleccionado = servicioId ? parseInt(servicioId) : null;
  }

  // Agregar servicio seleccionado a la lista
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
      this.cotizacionForm.get('id_serv')?.setValue(null); // Restablecer el valor del selector
    }
  }

  // Eliminar servicio de la lista
  eliminarServicio(event: Event, servicio: any) {
    event.preventDefault();
    console.log(servicio);
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s: { id_serv: any }) => s.id_serv !== servicio.id_serv);
    this.servicios.push(servicio); // Reincorporar el servicio eliminado a la lista de servicios disponibles
    this.cotizacionForm.get('id_serv')?.setValue(null); // Restablecer el valor del selector
  }

  // Mostrar alerta para confirmar eliminación de servicio
  mostrarAlertaEliminarServicio(servicio: any) {
    this.servicioAEliminar = servicio;
    this.alertVisible = true;
  }

  // Confirmar eliminación de servicio
  confirmarEliminarServicio() {
    this.eliminarServicio(new Event('click'), this.servicioAEliminar);
    this.alertVisible = false;
    this.servicioAEliminar = null;
  }

  // Cancelar eliminación de servicio
  cancelarEliminarServicio() {
    this.alertVisible = false;
    this.servicioAEliminar = null;
  }

  // Mostrar modal de confirmación
  mostrarConfirmacion() {
    this.confirmModalVisible = true;
  }

  // Confirmar creación de la orden de trabajo
  confirmarCreacion() {
    if (this.asignacionForm.valid) {
      this.confirmModalVisible = false;
      this.onSubmit();
    } else {
      console.error('Formulario de asignación no válido');
      this.logFormErrors();
    }
  }

  // Cancelar creación de la orden de trabajo
  cancelarCreacion() {
    this.confirmModalVisible = false;
  }

  // Enviar el formulario
  onSubmit() {
    if (this.cotizacionForm.valid && this.asignacionForm.valid) {
      const formValues: vistaOrden = {
        ...this.cotizacionForm.value,
        ...this.asignacionForm.value
      };
      console.log('Datos del formulario:', formValues);

      this.cotizacionService.insertarCotizacion(formValues).toPromise()
        .then(response => {
          console.log('Cotización enviada exitosamente:', response);
          const id_ot = response?.id_ot; // Obtener el ID de la orden de trabajo creada

          // Insertar los servicios seleccionados
          const promises = this.serviciosSeleccionados.map(servicio => {
            return new Promise((resolve, reject) => {
              const servicioData = {
                id_ot: id_ot,
                id_serv: servicio.id_serv,
                desc_serv: null,
                fec_inicio_serv: null,
                fec_ter_serv: null
              };
              this.servicioOrdenService.insertarServicioOrden(servicioData).toPromise()
                .then((res: unknown) => {
                  console.log('Servicio insertado exitosamente:', res);
                  resolve(res);
                })
                .catch((err: any) => {
                  console.error('Error al insertar servicio:', err);
                  reject(err);
                });
            });
          });

          return Promise.all(promises);
        })
        .then(() => {
          console.log('Todos los servicios fueron insertados exitosamente');
          this.router.navigate(['/success']);
        })
        .catch(error => {
          console.error('Error al enviar cotización o insertar servicios:', error);
        });
    } else {
      console.error('Formulario no válido');
      this.logFormErrors();
    }
  }

  // Función para depurar errores de validación del formulario
  logFormErrors() {
    Object.keys(this.cotizacionForm.controls).forEach(key => {
      const controlErrors = this.cotizacionForm.get(key)?.errors;
      if (controlErrors) {
        console.error(`Error en el campo ${key}:`, controlErrors);
      }
    });
    console.log('Datos esperados en el formulario:', {
      nom_cli: 'Nombre del cliente',
      dir_cli: 'Dirección del cliente',
      tel_cli: 'Teléfono del cliente',
      email_cli: 'Email del cliente',
      ape_cli: 'Apellido del cliente',
      rut_cli: 'Rut del cliente',
      d_ver_cli: 'Dígito verificador',
      desc_ot: 'Descripción de la orden de trabajo',
      fec_ter: 'Fecha de término',
      det_adic: 'Detalles adicionales',
      num_ser: 'Número de serie',
      id_estado: 'ID del estado',
      id_marca: 'ID de la marca',
      tip_equ: 'Tipo de equipo',
      mod_equ: 'Modelo de equipo',
      rut_tec: 'RUT del técnico',
      notas_asig: 'Notas de asignación',
      id_serv: 'ID del servicio',
      desc_serv: 'Descripción del servicio'
    });
  }
}

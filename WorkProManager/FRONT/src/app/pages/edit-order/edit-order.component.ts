import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CotizacionService } from '../../services/cotizacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { vistaOrden } from '../../interfaces/vistaOrden';
import { Trabajador } from '../../interfaces/trabajador';
import { Marca } from '../../interfaces/marca';
import { Servicio } from '../../interfaces/servicio';
import { EstadoOT } from '../../interfaces/estadoot';
import { vistaServicio } from '../../interfaces/vistaServicio';
import { ListasOrdenTrabajo } from '../../interfaces/listaOT';
import { vistaServicioResponse } from '../../interfaces/vistaServicio';


import { MarcaService } from '../../services/marca.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { ServicioService } from '../../services/servicio.service';
import { EstadoOTService } from '../../services/estado-ot.service';
import { ServicioOrdenService } from '../../services/insertarServicio.service';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {

  servicios: Servicio[] = [];
  tecnicos: Trabajador[] = [];
  marcas: Marca[] = [];
  estados: EstadoOT[] = [];
  listasOT: ListasOrdenTrabajo[] = [];
  listasServicios: vistaServicioResponse[] = [];

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
  

  //Sacar ID de la OT desde la URL
  id_ot: number | null = 0;
  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router,
    private route: ActivatedRoute,
    private trabajadorService: TrabajadorService,
    private marcaService: MarcaService,
    private servicioService: ServicioService,
    private estadoService: EstadoOTService,
  
    private servicioOrdenService: ServicioOrdenService,
    private ordenTrabajoService: OrdenTrabajoService,
  ) {
    // Inicializa el formulario con un array de servicios
    this.cotizacionForm = this.fb.group({
      serviciosArray: this.fb.array([]) // Form array for selected services
    });
    this.serviciosArray = this.cotizacionForm.get('serviciosArray') as FormArray;
    
  }

  ngOnInit() {
     this.id_ot = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    
    // Cargar datos iniciales
    this.cargarTecnicos();
    this.cargarMarcas();
    this.cargarServiciosAsociados(this.id_ot); // Cargar servicios seleccionados primero
    this.cargarServicios(); // Luego cargar servicios disponibles
    this.cargarEstados();
    this.cargarOrdenTrabajo(this.id_ot);

    // Inicializa el formulario de cotización con validaciones
    this.cotizacionForm = this.fb.group({
      nom_cli: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]], // Permitir tildes y ñ
      dir_cli: ['', Validators.required],
      tel_cli: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email_cli: ['', [Validators.required, Validators.email]],
      ape_cli: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]], // Permitir tildes y ñ
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
        this.servicios = data.filter(servicio => !this.serviciosSeleccionados.some(s => s.id_serv === servicio.id_serv)).sort((a, b) => a.nom_serv.localeCompare(b.nom_serv));
        console.log('Servicios obtenidos:', this.servicios);
      },
      error: (err) => {
        console.error('Error al obtener servicios:', err);
      }
    });
  }

  cargarOrdenTrabajo(id_ot: number | null): void {
    if (id_ot) {
      this.ordenTrabajoService.getOrdenById(id_ot).subscribe({
        next: (data) => {
          this.listasOT = [data];
          console.log('Datos de la orden de trabajo:', this.listasOT); // Verifica los datos recibidos

          // Convertir la fecha al formato yyyy-MM-dd
          const formattedDate = this.listasOT[0]?.fec_ter ? new Date(this.listasOT[0]?.fec_ter).toISOString().split('T')[0] : null;

          this.cotizacionForm.patchValue({
            nom_cli: this.listasOT[0]?.Cliente.nom_cli,
            dir_cli: this.listasOT[0]?.Cliente.dir_cli,
            tel_cli: this.listasOT[0]?.Cliente.tel_cli,
            email_cli: this.listasOT[0]?.Cliente.email_cli,
            ape_cli: this.listasOT[0]?.Cliente.ape_cli,
            rut_cli: this.listasOT[0]?.Cliente.rut_cli,
            d_ver_cli: this.listasOT[0]?.Cliente.d_ver_cli,
            desc_ot: this.listasOT[0]?.desc_ot,
            fec_ter: formattedDate,
            det_adic: this.listasOT[0]?.det_adic,
            num_ser: this.listasOT[0]?.num_ser,
            id_marca: this.listasOT[0]?.Equipo.id_marca,
            tip_equ: this.listasOT[0]?.Equipo.tip_equ,
            mod_equ: this.listasOT[0]?.Equipo.mod_equ,
            rut_tec: this.listasOT[0]?.Asignacions[0].rut_tec,
            notas_asig: this.listasOT[0]?.Asignacions[0].notas_asig,
            id_estado: this.listasOT[0]?.id_estado
          });
          this.asignacionForm.patchValue({
            rut_ges: 78901234,
            rut_tec: this.listasOT[0]?.Asignacions[0].rut_tec,
            notas_asig: this.listasOT[0]?.Asignacions[0].notas_asig,
            id_estado: this.listasOT[0]?.id_estado
          });
        },
        error: (err) => {
          console.error('Error al obtener la orden de trabajo:', err);
        }
      });
    }
  }

  // Cargar los servicios asociados a la orden de trabajo
  cargarServiciosAsociados(id_ot: number | null): void {
    if (id_ot) {
      this.servicioOrdenService.getServiciosOrden(id_ot).subscribe({
        next: (data: vistaServicioResponse[]) => {
          this.listasServicios = data;
          console.log('Servicios asociados obtenidos:', this.listasServicios);

          // Incluir los servicios asociados en el array de servicios seleccionados
          this.serviciosSeleccionados = this.listasServicios.map(servicio => ({
            id_serv: servicio.id_serv,
            nom_serv: servicio.Servicio.nom_serv
          }));
        },
        error: (err: any) => {
          console.error('Error al obtener servicios asociados:', err);
        }
      });
    }
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
        this.servicios = this.servicios.filter(s => s.id_serv !== servicio.id_serv);
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
    
    // Llamar al servicio para eliminar el servicio de la orden de trabajo
    if (this.id_ot && servicio.id_serv) {
      this.servicioOrdenService.eliminarServicioOrden(this.id_ot, servicio.id_serv).subscribe({
        next: () => {
          console.log('Servicio eliminado exitosamente');
          this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s: { id_serv: any }) => s.id_serv !== servicio.id_serv);
          this.servicios.push(servicio); // Reincorporar el servicio eliminado a la lista de servicios disponibles
          this.servicios.sort((a, b) => a.nom_serv.localeCompare(b.nom_serv)); // Ordenar alfabéticamente
          this.cotizacionForm.get('id_serv')?.setValue(null); // Restablecer el valor del selector
        },
        error: (err) => {
          console.error('Error al eliminar el servicio:', err);
        }
      });
    }
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

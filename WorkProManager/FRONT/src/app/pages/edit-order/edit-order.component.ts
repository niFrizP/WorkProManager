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
import { SocketService } from '../../services/socketIO.service'; // Asegúrate de la ruta correcta


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

  serviciosSugeridos: vistaServicioResponse[] = [];

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
  alertVisibleLocal: boolean = false;
  confirmModalVisible: boolean = false; // Flag to control modal visibility
  deshabilitados: any[] = []; // Array para los servicios deshabilitados
  alertVisibleDeshabilitado: boolean = false; // Flag para controlar la visibilidad de la alerta
  isServicioSugerido: boolean = false; // Añadir esta bandera
  

  //Sacar ID de la OT desde la URL
  id_ot: number | null = 0;
  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private servicioOrdenService: ServicioOrdenService, // Asegúrate de inyectar el servicio
    private router: Router,
    private route: ActivatedRoute,
    private trabajadorService: TrabajadorService,
    private marcaService: MarcaService,
    private servicioService: ServicioService,
    private estadoService: EstadoOTService,
    private ordenTrabajoService: OrdenTrabajoService,
    private socketService: SocketService, // Inyectar SocketService
  ) {
    // Inicializa el formulario con un array de servicios
    this.cotizacionForm = this.fb.group({
      serviciosArray: this.fb.array([]) // Form array for selected services
    });
    this.serviciosArray = this.cotizacionForm.get('serviciosArray') as FormArray;
    
  }

  ngOnInit() {
    // Eliminar la asignación inicial usando snapshot
    // this.id_ot = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    // console.log('id_ot inicial en ngOnInit:', this.id_ot); // Log para verificar id_ot

    // Suscribirse a los cambios de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id_ot = idParam ? parseInt(idParam, 10) : null;
      console.log('id_ot actualizado en suscripción:', this.id_ot);
      
      if (this.id_ot) {
        this.cargarOrdenTrabajo(this.id_ot);
      } else {
        console.warn('id_ot es null o undefined en suscripción.');
      }
    });

    // Cargar datos iniciales
    this.cargarTecnicos();
    this.cargarMarcas();
    this.cargarServicios(); // Luego cargar servicios disponibles
    this.cargarEstados();

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
        this.servicios = data.filter(servicio => 
          !this.serviciosSeleccionados.some(s => s.id_serv === servicio.id_serv) &&
          !this.serviciosSugeridos.some(s => s.id_serv === servicio.id_serv)
        ).sort((a, b) => a.nom_serv.localeCompare(b.nom_serv));
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
            nom_cli: this.listasOT[0]?.Cliente?.nom_cli,
            dir_cli: this.listasOT[0]?.Cliente?.dir_cli,
            tel_cli: this.listasOT[0]?.Cliente?.tel_cli,
            email_cli: this.listasOT[0]?.Cliente?.email_cli,
            ape_cli: this.listasOT[0]?.Cliente?.ape_cli,
            rut_cli: this.listasOT[0]?.Cliente?.rut_cli,
            d_ver_cli: this.listasOT[0]?.Cliente?.d_ver_cli,
            desc_ot: this.listasOT[0]?.desc_ot,
            fec_ter: formattedDate,
            det_adic: this.listasOT[0]?.det_adic,
            num_ser: this.listasOT[0]?.num_ser,
            id_marca: this.listasOT[0]?.Equipo.id_marca,
            tip_equ: this.listasOT[0]?.Equipo.tip_equ,
            mod_equ: this.listasOT[0]?.Equipo.mod_equ,
            rut_tec: this.listasOT[0]?.Asignacions?.[0]?.rut_tec ?? null,
            notas_asig: this.listasOT[0]?.Asignacions?.[0]?.notas_asig ?? '',
            id_estado: this.listasOT[0]?.id_estado
          });

          // Log de los valores patchados
          console.log('Valores patchados en cotizacionForm:', this.cotizacionForm.value);

          // Mover los valores eliminados a la lista de deshabilitados
          this.deshabilitados.push({
            nom_cli: this.listasOT[0]?.Cliente?.nom_cli,
            dir_cli: this.listasOT[0]?.Cliente?.dir_cli,
            tel_cli: this.listasOT[0]?.Cliente?.tel_cli,
            email_cli: this.listasOT[0]?.Cliente?.email_cli,
            ape_cli: this.listasOT[0]?.Cliente?.ape_cli,
            rut_cli: this.listasOT[0]?.Cliente?.rut_cli,
            d_ver_cli: this.listasOT[0]?.Cliente?.d_ver_cli,
            desc_ot: this.listasOT[0]?.desc_ot,
            fec_ter: formattedDate,
            det_adic: this.listasOT[0]?.det_adic,
            num_ser: this.listasOT[0]?.num_ser,
            id_marca: this.listasOT[0]?.Equipo.id_marca,
            tip_equ: this.listasOT[0]?.Equipo.tip_equ,
            mod_equ: this.listasOT[0]?.Equipo.mod_equ,
            rut_tec: this.listasOT[0]?.Asignacions?.[0]?.rut_tec ?? null,
            notas_asig: this.listasOT[0]?.Asignacions?.[0]?.notas_asig ?? '',
            id_estado: this.listasOT[0]?.id_estado
          });

          console.log('Servicios deshabilitados actualizados:', this.deshabilitados);
        },
        error: (err) => {
          console.error('Error al obtener la orden de trabajo:', err);
        }
      });
    } else {
      console.warn('id_ot es null o undefined en cargarOrdenTrabajo.');
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

  confirmarEliminarServicioLocal() {
    this.eliminarServicioLocal(new Event('click'), this.servicioAEliminar);
    this.servicioAEliminar = false;
  }

  eliminarServicioLocal(event: Event, servicio: any) {
    event.preventDefault();
    console.log('Eliminando servicio local:', servicio);
    if (servicio && servicio.id_serv) { // Verificación adicional
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s: { id_serv: any }) => s.id_serv !== servicio.id_serv);
      // Reintegrar el servicio eliminado a la lista de servicios disponibles
      this.servicios.push(servicio);
      this.servicios.sort((a, b) => a.nom_serv.localeCompare(b.nom_serv)); // Ordenar alfabéticamente
      // Restablecer el valor del selector
      this.cotizacionForm.get('id_serv')?.setValue(null);
    } else {
      console.error('Servicio a eliminar es inválido:', servicio);
    }
  }

  eliminarServicio(event: Event, servicio: any) {
    event.preventDefault();
    console.log(servicio);
    
    // Llamar al servicio para eliminar el servicio de la orden de trabajo
    if (this.id_ot && servicio.id_serv) {
      this.servicioOrdenService.desactivarServicioOrden(this.id_ot, servicio.id_serv).subscribe({
        next: () => {
          console.log('Servicio eliminado exitosamente');

          // Actualizar la lista de servicios sugeridos
          this.serviciosSugeridos = this.serviciosSugeridos.filter((s: { id_serv: any }) => s.id_serv !== servicio.id_serv);

          // Actualizar el formulario al eliminar el servicio
          this.cotizacionForm.get('id_serv')?.setValue(null);
          // Mover el servicio eliminado a la lista de deshabilitados
          this.deshabilitados.push(servicio);

          // Restablecer el valor del selector
          this.cotizacionForm.get('id_serv')?.setValue(null);
        },
        error: (err) => {
          console.error('Error al eliminar el servicio:', err);
        }
      });
    }
  }



  // Mostrar alerta para confirmar eliminación de servicio
  mostrarAlertaEliminarServicio(servicio: any, event: Event) {
    event.preventDefault();
    this.servicioAEliminar = servicio;
    this.isServicioSugerido = false; // Es un servicio añadido localmente
    this.alertVisible = true;
  }

   // Mostrar alerta para confirmar eliminación de servicio
   mostrarAlertaEliminarServicioLocal(servicio: any) {
    this.servicioAEliminar = servicio;
    this.alertVisibleLocal = true;
  }


   // Mostrar alerta para confirmar eliminación de servicio sugerido
   mostrarAlertaEliminarServicioSugerido(servicio: any) {
    this.servicioAEliminar = servicio;
    this.isServicioSugerido = true; // Es un servicio sugerido
    this.alertVisible = true;
  }

  mostrarAlertaEliminarServicioDeshabilitado(servicio: any) {
    this.servicioAEliminar = servicio;
    this.alertVisibleDeshabilitado = true;
  }

  // Confirmar eliminación de servicio
  confirmarEliminarServicio() {
    if (this.isServicioSugerido) {
        this.eliminarServicio(new Event('click'), this.servicioAEliminar);
    } else {
        this.eliminarServicioLocal(new Event('click'), this.servicioAEliminar);
    }
    this.alertVisible = false;
    this.servicioAEliminar = null;
    this.isServicioSugerido = false; // Restablecer la bandera
  }

  confirmarEliminarServicioDeshabilitado() {
    console.log('confirmarEliminarServicioDeshabilitado called');
    console.log('id_ot:', this.id_ot);
    console.log('servicioAEliminar:', this.servicioAEliminar);

    if (this.id_ot && this.servicioAEliminar && this.servicioAEliminar.id_serv) {
      console.log('Activando servicio con id_serv:', this.servicioAEliminar.id_serv);
      this.servicioOrdenService.activarServicioOrden(this.id_ot, this.servicioAEliminar.id_serv).subscribe({
        next: () => {
          console.log('Servicio habilitado exitosamente:', this.servicioAEliminar);
          // ...existing code...
        },
        error: (err) => {
          console.error('Error al habilitar el servicio:', err);
        }
      });
    } else {
      console.error('id_ot o servicioAEliminar es inválido:', { id_ot: this.id_ot, servicioAEliminar: this.servicioAEliminar });
    }
    this.alertVisibleDeshabilitado = false;
    this.servicioAEliminar = null;
  }

  // Cancelar eliminación de servicio
  cancelarEliminarServicio() {
    this.alertVisible = false;
    this.servicioAEliminar = null;
  }

  cancelarEliminarServicioDeshabilitado() {
    this.alertVisibleDeshabilitado = false;
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
      
      // Console.logs para depuración
      console.log('--- Inicio del Submit ---');
      console.log('Datos de Cotización:', this.cotizacionForm.value);
      console.log('Datos de Asignación:', this.asignacionForm.value);
      console.log('Servicios Seleccionados:', this.serviciosSeleccionados);
      console.log('Servicios Sugeridos:', this.serviciosSugeridos);
      console.log('Servicios Deshabilitados:', this.deshabilitados);
      console.log('id_ot actual:', this.id_ot);
      console.log('-------------------------');

      if (this.id_ot && this.id_ot !== 0) {
        // Log antes de actualizar
        console.log('Actualizando cotización con ID:', this.id_ot);
        console.log('Datos enviados para actualizar:', formValues);

        // Actualizar cotización existente
        this.cotizacionService.actualizarCotizacion(formValues).toPromise()
          .then(response => {
            console.log('Cotización actualizada exitosamente:', response);      
            // Actualizar id_ot en el componente
            console.log('id_ot actualizado en el componente:', this.id_ot);
            
            // Actualizar los servicios sugeridos
            const updatePromises = this.serviciosSugeridos.map(servicio => {
              console.log('Actualizando servicio sugerido:', servicio);
              const servicioData: vistaServicio = {
                id_serv: servicio.id_serv,
                fec_inicio_serv: new Date(),

                // ...otros campos necesarios
              };
              if (this.id_ot !== undefined && this.id_ot !== null) {
                return this.servicioOrdenService.actualizarServicioOrden(this.id_ot, servicio.id_serv, servicioData).toPromise();
              } else {
                console.error('id_ot es undefined o null al actualizar servicio:', servicio);
                return Promise.reject('id_ot es inválido.');
              }
            });

            // Insertar los servicios seleccionados usando ServicioOrdenService
            const insertPromises = this.serviciosSeleccionados.map(servicio => {
              console.log('Insertando servicio seleccionado:', servicio);
              const servicioData: vistaServicio = {
                id_ot: this.id_ot || 0,
                id_serv: servicio.id_serv,
                desc_serv: null,
                fec_inicio_serv: null,
                fec_ter_serv: null
              };
              return this.servicioOrdenService.insertarServicioOrden(servicioData).toPromise();
            });

            console.log('Promesas de actualización y inserción:', updatePromises, insertPromises);
            
            return Promise.all([...updatePromises, ...insertPromises]);
          })
          .then(() => {
            console.log('Todas las actualizaciones fueron exitosas');
            this.router.navigate(['/success']);
          })
          .catch(error => {
            console.error('Error al actualizar cotización o servicios:', error);
          });
      } else {
        // Log antes de crear nueva cotización
        console.log('Creando nueva cotización con datos:', formValues);

        // Crear nueva cotización
        this.cotizacionService.actualizarCotizacion(formValues).toPromise()
          .then(response => {
            console.log('Cotización creada exitosamente:', response);
     
            // Insertar los servicios seleccionados usando ServicioOrdenService
            const promises = this.serviciosSeleccionados.map(servicio => {
              console.log('Insertando servicio seleccionado:', servicio);
              const servicioData: vistaServicio = {
                id_ot: this.id_ot ?? undefined,
                id_serv: servicio.id_serv,
                desc_serv: null,
                fec_inicio_serv: null,
                fec_ter_serv: null
              };
              return this.servicioOrdenService.insertarServicioOrden(servicioData).toPromise();
            });

            console.log('Promesas de inserción de servicios:', promises);
            
            return Promise.all(promises);
          })
          .then(() => {
            console.log('Todos los servicios fueron insertados exitosamente');
            this.router.navigate(['/success']);
          })
          .catch(error => {
            console.error('Error al crear cotización o servicios:', error);
          });
      }
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




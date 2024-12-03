import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClienteService } from '../../services/cliente.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [
    MatIconModule, 
    CommonModule, 
    CronometroComponent,
    RouterModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [
    OrdenTrabajoService,
    ClienteService,
    TrabajadorService
  ]
})
export class OrdersComponent implements OnInit {

  filtros = {
    estado: '',
    fechaDesde: null,
    fechaHasta: null,
    cliente: '',
    tecnico: '',
    equipo: ''
  };

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private clienteService: ClienteService,
    private trabajadorService: TrabajadorService
  ) {}

  showFilters: boolean = false;
  OrdenTrabajo: any[] = [];

  // Variables para almacenar las listas originales
  ordenesOriginales: any[] = [];
  clientesList: any[] = [];
  tecnicosList: any[] = [];

  // Controls para autocomplete
  clienteControl = new FormControl('');
  tecnicoControl = new FormControl('');

  clientesFiltrados: any[] = [];
  tecnicosFiltrados: any[] = [];

  ngOnInit() {
    // Cargar datos iniciales
    this.cargarOrdenes();
    this.cargarClientes();
    this.cargarTecnicos();

    // Configurar listeners para autocomplete
    this.setupAutoComplete();
  }

  private setupAutoComplete() {
    this.clienteControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filtrarClientes(value || '');
    });

    this.tecnicoControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filtrarTecnicos(value || '');
    });
  }

  private filtrarClientes(valor: string) {
    const filtro = valor.toLowerCase();
    this.clientesFiltrados = this.clientesList.filter(cliente => 
      cliente.nom_cli.toLowerCase().includes(filtro) ||
      cliente.rut_cli.toLowerCase().includes(filtro)
    );
  }

  private filtrarTecnicos(valor: string) {
    const filtro = valor.toLowerCase();
    this.tecnicosFiltrados = this.tecnicosList.filter(tecnico => 
      tecnico.nom_trab.toLowerCase().includes(filtro) ||
      tecnico.rut_trab.toLowerCase().includes(filtro)
    );
  }

  aplicarFiltros() {
    let ordenesFiltradas = [...this.ordenesOriginales];

    // Filtrar por estado
    if (this.filtros.estado) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.EstadoOT.nom_estado.toLowerCase() === this.filtros.estado.toLowerCase()
      );
    }

    // Filtrar por rango de fechas
    if (this.filtros.fechaDesde && this.filtros.fechaHasta) {
      const fechaDesde = new Date(this.filtros.fechaDesde);
      const fechaHasta = new Date(this.filtros.fechaHasta);
      
      ordenesFiltradas = ordenesFiltradas.filter(orden => {
        const fechaOrden = new Date(orden.fec_creacion);
        return fechaOrden >= fechaDesde && fechaOrden <= fechaHasta;
      });
    }

    // Filtrar por cliente
    if (this.filtros.cliente) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.Cliente?.rut_cli === this.filtros.cliente ||
        orden.Cliente?.nom_cli.toLowerCase().includes(this.filtros.cliente.toLowerCase())
      );
    }

    // Filtrar por técnico
    if (this.filtros.tecnico) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.Asignacions?.[0]?.tecnico?.rut_trab === this.filtros.tecnico ||
        orden.Asignacions?.[0]?.tecnico?.nom_trab.toLowerCase().includes(this.filtros.tecnico.toLowerCase())
      );
    }

    // Filtrar por equipo
    if (this.filtros.equipo) {
      const equipoFiltro = this.filtros.equipo.toLowerCase();
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.num_ser?.toLowerCase().includes(equipoFiltro) ||
        orden.Equipo?.mod_equ?.toLowerCase().includes(equipoFiltro)
      );
    }

    // Actualizar la lista filtrada
    this.OrdenTrabajo = ordenesFiltradas;
  }

  async cargarOrdenes() {
    try {
      const ordenes = await firstValueFrom(this.ordenTrabajoService.cargarOrdenesDeTrabajo()) || [];
      this.ordenesOriginales = ordenes;
      this.OrdenTrabajo = [...ordenes];
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
      this.ordenesOriginales = [];
      this.OrdenTrabajo = [];
    }
  }

  async cargarClientes() {
    try {
      this.clientesList = await firstValueFrom(this.clienteService.obtenerClientes()) || [];
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      this.clientesList = [];
    }
  }

  async cargarTecnicos() {
    try {
      this.tecnicosList = await firstValueFrom(this.trabajadorService.getTecnicos()) || [];
    } catch (error) {
      console.error('Error al cargar técnicos:', error);
      this.tecnicosList = [];
    }
  }

  limpiarFiltros() {
    this.filtros = {
      estado: '',
      fechaDesde: null,
      fechaHasta: null,
      cliente: '',
      tecnico: '',
      equipo: ''
    };
    
    // Resetear los controles de autocomplete
    this.clienteControl.reset();
    this.tecnicoControl.reset();
    
    // Restaurar la lista original
    this.OrdenTrabajo = [...this.ordenesOriginales];
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  formatDate(date: string | Date): string {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleDateString('es-CL');
  }

  formatAsignacionDate(date: string): string {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleString('es-CL');
  }
}
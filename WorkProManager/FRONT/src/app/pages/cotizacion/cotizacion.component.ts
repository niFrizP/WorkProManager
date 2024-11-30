import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CotizacionService } from '../../services/cotizacion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface OrdenTrabajoInput {
  nom_cli: string;
  dir_cli: string;
  tel_cli: string;
  email_cli: string;
  ape_cli: string;
  rut_cli: number;
  d_ver_cli: string;
  desc_ot: string;
  fec_ter: Date;
  det_adic: string;
  num_ser: string;
  id_estado: number;
  id_marca: number;
  tip_equ: string;
  mod_equ: string;
  rut_tec: number;
  notas_asig: string;
  id_serv: number;
  desc_serv: string;
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
})
export class CotizacionComponent implements OnInit {
  cotizacionForm!: FormGroup;
  servicios = [
    { id: 1, nombre: 'Servicio 1' },
    { id: 2, nombre: 'Servicio 2' },
    // Agregar más servicios según sea necesario
  ];
  serviciosAnadidos: { id: number, nombre: string }[] = [];
  alertVisible: boolean = false;
  servicioAEliminar: { id: number, nombre: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cotizacionForm = this.fb.group({
      nom_cli: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dir_cli: ['', Validators.required],
      tel_cli: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email_cli: ['', [Validators.required, Validators.email]],
      ape_cli: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      rut_cli: [0, [Validators.required, Validators.pattern('^[0-9]+$')]],
      d_ver_cli: ['', [Validators.required, Validators.pattern('^[0-9kK]$')]],
      desc_ot: ['', Validators.required],
      fec_ter: ['', Validators.required],
      det_adic: [''],
      num_ser: [''],
      id_estado: [0, Validators.required],
      id_marca: [0, Validators.required],
      tip_equ: [''],
      mod_equ: [''],
      rut_tec: [0, Validators.required],
      notas_asig: [''],
      id_serv: [0, Validators.required],
      desc_serv: ['', Validators.required],
      id_serv_anadido: [0],
      desc_serv_anadido: [''],
    });
  }

  anadirServicio() {
    const id_serv = this.cotizacionForm.get('id_serv')?.value;
    const servicio = this.servicios.find(s => s.id === id_serv);
    if (servicio) {
      this.serviciosAnadidos.push(servicio);
    }
  }

  mostrarAlertaEliminarServicio(servicio: { id: number, nombre: string }) {
    this.servicioAEliminar = servicio;
    this.alertVisible = true;
  }

  confirmarEliminarServicio() {
    if (this.servicioAEliminar) {
      this.serviciosAnadidos = this.serviciosAnadidos.filter(s => s.id !== this.servicioAEliminar?.id);
      this.servicioAEliminar = null;
      this.alertVisible = false;
    }
  }

  cancelarEliminarServicio() {
    this.servicioAEliminar = null;
    this.alertVisible = false;
  }

  onSubmit() {
    if (this.cotizacionForm.valid) {
      this.cotizacionService.insertarCotizacion(this.cotizacionForm.value).subscribe(
        (response) => {
          console.log('Cotización enviada exitosamente:', response);
          this.router.navigate(['/success']);
        },
        (error) => {
          console.error('Error al enviar cotización:', error);
        }
      );
    }
  }
}


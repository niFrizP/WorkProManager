import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Reporte } from '../../interfaces/reporte';
import { ReporteService } from '../../services/reporte.service'; // Ajustar el path según sea necesario
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-create_report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-reporte.component.html',
  styleUrls: ['./create-reporte.component.css'] // Opcional, si tienes estilos
})
export class CreateReportComponente implements OnInit {
  reportForm: FormGroup;
  id_ot_from_api: number | undefined;
  today: string; // Variable para la fecha de hoy

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reporteService: ReporteService, 
    private aRouter: ActivatedRoute,
    private orderService: OrderService	
  ) {
    // Inicialización del formulario con la fecha deshabilitada
    this.today = new Date().toISOString().split('T')[0]; // Fecha de hoy formateada YYYY-MM-DD
    this.reportForm = this.fb.group({
      id_usuario: [7, Validators.required],
      id_ot: [null, Validators.required],
      fecha: [{ value: this.today, disabled: true }], // Fecha de hoy preestablecida y deshabilitada
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getOrderIdFromUrl(); // Obtener id_ot desde la URL
  }

  // Método para obtener el id_ot de la URL
  getOrderIdFromUrl(): void {
    this.aRouter.paramMap.subscribe(params => {
      this.id_ot_from_api = Number(params.get('id_ot')); // Obtener id_ot de la URL
      console.log('ID de OT:', this.id_ot_from_api); 
      this.reportForm.patchValue({ id_ot: this.id_ot_from_api }); // Asignar id_ot al formulario
    });
  }

  // Método para actualizar el estado de la orden y crear el reporte
  private updateOrderStateAndCreateReport(): void {
    if (this.id_ot_from_api) {
      const newOrderState = 2; // El nuevo estado que deseas establecer

      this.orderService.updateOrderState(this.id_ot_from_api, newOrderState).subscribe(
        response => {
          console.log('Estado de la orden actualizado:', response);
          this.createReport(); // Llamar a createReport después de actualizar
        },
        error => {
          console.error('Error actualizando estado de la orden:', error);
          // Manejar error (por ejemplo, mostrar mensaje al usuario)
        }
      );
    }
  }

  // Método para crear el reporte
  createReport(): void {
    if (this.reportForm.valid) {
      const newReport: Reporte = this.reportForm.getRawValue(); // Obtener valores del formulario incluso los deshabilitados
      console.log(newReport); // Verificar los datos a enviar
      
      this.reporteService.saveReporte(newReport).subscribe(
        response => {
          console.log('Reporte creado:', response);
          this.router.navigate(['/']); // Redirigir después de la creación exitosa
        },
        error => {
          console.error('Error creando reporte:', error);
          // Manejar error (por ejemplo, mostrar mensaje al usuario)
        }
      );
    }
  }
}
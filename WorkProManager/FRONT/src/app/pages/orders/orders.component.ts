import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CronometroComponent } from '../../components/cronometro/cronometro.component';

import { ListasOrdenTrabajo } from '../../interfaces/listaOT';

import { OrdenTrabajoService } from '../../services/orden-trabajo.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, CommonModule, CronometroComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  constructor(private ordenTrabajoService: OrdenTrabajoService) { }

  ngOnInit(): void {
    this.cargarOrdenesDeTrabajo();
  }

  OrdenTrabajo: ListasOrdenTrabajo[] = [];
  itemsPerPage: number = 20;
  showFilters: boolean = false;


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  cargarOrdenesDeTrabajo() {
    this.ordenTrabajoService.cargarOrdenesDeTrabajo().subscribe((data: ListasOrdenTrabajo[]) => {
      this.OrdenTrabajo = data;
      console.log(this.OrdenTrabajo);
    });
  }

  formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  formatAsignacionDate(dateString: string): string {
    const date = new Date(dateString);
    const options = { day: 'numeric' as const, month: 'numeric' as const, year: 'numeric' as const, hour: '2-digit' as const, minute: '2-digit' as const };
    return date.toLocaleDateString('es-ES', options);
  }
}

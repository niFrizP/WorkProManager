import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Order } from '../../../interfaces/order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-new-ot',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
  ], // Asegúrate de agregar ReactiveFormsModule aquí
  templateUrl: './new-ot.component.html',
  styleUrls: ['./new-ot.component.css'],
})
export class NewOtComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id_ot: number = 0;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      equipo: ['', Validators.required],
      estado: ['', Validators.required],
      costo: [null, Validators.required],
      fecha: [null, Validators.required],
    });

    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id_ot'));
  }

  ngOnInit(): void {
    if (this.id_ot !== 0) {
      this.operacion = 'Editar ';
      this.getOrder(this.id_ot);
    }
  }

  getOrder(id_ot: number): void {
    this.loading = true;
    this._orderService.getOrder(id_ot).subscribe((data: Order) => {
      this.loading = false;
      this.form.setValue({
        equipo: data.equipo,
        estado: data.estado,
        costo: data.costo,
        fecha: data.fecha,
      });
    });
  }

  addProduct(): void {
    const order: Order = {
      equipo: this.form.value.equipo,
      estado: this.form.value.estado,
      costo: this.form.value.costo,
      fecha: this.form.value.fecha,
      num_equipo: 0,
      descripcion: '',
      id_usuario: 0,
      id_serv: 0,
      id_estado: 0,
      rut_cliente: 0
    };

    this.loading = true;

    if (this.id_ot !== 0) {
      order.id_ot = this.id_ot;
      this._orderService.updateOrder(this.id_ot, order).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/']);
      });
    } else {
      this._orderService.saveOrder(order).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}

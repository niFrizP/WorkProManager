import { Component, OnInit } from '@angular/core';
import { EstadoOT } from '../../interfaces/estadoot';
import { EstadoOTService } from '../../services/estado_ot.service';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-submenu',
  templateUrl: './submenu-component.component.html',
  styleUrls: ['./submenu-component.component.css']
})
export class SubmenuComponent implements OnInit {
  estados: EstadoOT[] = [];
  selectedEstadoName = '';
  orders:Order[] = [];
  selectedEstadoID: number | null = null;
  isMenuOpen = false;
  form: FormGroup;
  id_ot: number = 0;
  id_estado_ot: number = 0;
  estadoID: number = 0;
  

  constructor(private estadoOTService: EstadoOTService, private fb: FormBuilder, private orderService:OrderService) {
    this.form = this.fb.group({
      id_estado_ot: this.selectedEstadoID
    });
  }

  ngOnInit() {
    this.loadEstados();
  }


  // Alterna la visibilidad del menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Carga los estados del servicio
  loadEstados() {
    this.estadoOTService.getListEstadosOT().subscribe(data => {
      this.estados = data;
    });
  }

  loadOrders() {
    this.orderService.getListOrders().subscribe(data => {
      this.orders = data;
    });
  }


estadoUpdated(id_estado_ot:number){
  this.estadoID = id_estado_ot;
  return this.estadoID;
}
  
  // Actualiza el formulario cuando cambia la selección
  public onUserChange( event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedEstado = this.estados.find(estado => estado.id_estado_ot?.toString() === selectedId);


    if (selectedEstado) {
      this.selectedEstadoName = selectedEstado.nom_estado_ot;
      this.selectedEstadoID = selectedEstado.id_estado_ot ?? null;
      console.log(this.selectedEstadoID);
      
      // Actualiza el valor en el formulario
      this.form.patchValue({ id_estado_ot: this.selectedEstadoID });
      console.log(this.form.value);
      
      // Emitir el evento al componente padre

      

      this.estadoUpdated(this.selectedEstadoID??0);

      console.log(this.id_ot);


      
      // Cerrar el menú
      this.isMenuOpen = false; // Cerrar el submenú
    }
  }
  
  }
  

 
  


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
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
import { DetalleOT } from '../../interfaces/detalle_ot';
import { newOrder } from '../../interfaces/newOrder';

// Services
import { OrderService } from '../../services/order.service';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { MarcaService } from '../../services/marca.service';
import { ClienteService } from '../../services/cliente.service';
import { EquipoService } from '../../services/equipo.service';

// Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DetalleOTService } from '../../services/detalle_ot.service';
import { error } from 'console';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, SidebarComponent, FormsModule],
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  mostrarSelectServicio: boolean = false; 
  servicios: Servicio[] = []; // Inicialización como array vacío
  serviciosArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);
  serviciosSeleccionados: any = []; // Cambia 'any' por el tipo adecuado
  servicioSeleccionado: number | null = null;
  usuarios: Usuario[] = [];
  marcas: Marca[] = [];
  newOrders: newOrder[] = [];
  selectedUsuarioName: string | null = null;
  selectedUsuarioSurname: string | null = null;
  selectedServicePrecio: number | null = null;
  selectedMarcaNombre: string | null = null;
  selectedServiceID: number | null = null;
  selectedUsuarioID: number | null = null;  // Add this line
  form: FormGroup;
  loading: boolean = false;
  id_ot: number ;
  id_serv: number;
  nuevoServicio: string = ''; // Variable para almacenar el nuevo servicio
  operacion: string = 'Agregar ';
  isSubmitting: boolean = false;
  orderId: number | undefined;
  newOrderId: number | null = null; // Variable para almacenar el ID de la nueva orden
  orderDetails: newOrder | null = null;
  detalleOT: DetalleOT[] = [];





  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private detalleOTService:DetalleOTService,
    private servicioService:ServicioService,
    private usuarioService:UsuarioService,
    private marcaService:MarcaService,
    private equipoService:EquipoService,
    private clienteService:ClienteService
    
  ) {
    this.form = this.fb.group({
      id_ot: [null, Validators.required],
      id_serv: [null, Validators.required],
      nom_serv: [null, Validators.required],
      fecha_detalle: [null, Validators.required],
      desc_detalle: [null, Validators.required],
      rut_usuario: [null, Validators.required],
      
    });
    
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.id_serv = Number(this.aRouter.snapshot.paramMap.get('id_serv'));
  }

  ngOnInit(): void {

    this.loadDetalle(this.id_ot, this.id_serv);
    console.log(this.id_ot);
    console.log(this.id_serv);


    

    if (this.id_ot !== 0) {
      this.operacion = 'Editar ';
      
    }
  }
  
  private log(){
    console.log(this.id_ot);
  }

  
  loadDetalle(id: number, id_serv: number): Promise<DetalleOT[]> {
    return new Promise((resolve, reject) => {
      this.detalleOTService.getDetalleOt(id, id_serv).subscribe(
        (data: DetalleOT) => {
          this.form.patchValue({
            id_serv: data.id_serv,
            fecha_detalle: data.fecha_detalle,
            nom_serv: data.Servicio.nom_serv,
            desc_detalle: data.desc_detalle,
            rut_usuario: data.rut_usuario,
          });
          console.log(data);
        },
        (error) => {
          console.error('Error al cargar los detalles:', error);
          reject(error); // Rechazando la promesa en caso de error
        }
      );
    });
  }
  
  
  private async createOrUpdateDetalleOT(): Promise<DetalleOT[]> {
    this.id_ot = Number(this.aRouter.snapshot.paramMap.get('id'));

    // Crea un array de detalles OT a partir de servicios seleccionados
    const detalleOTData: DetalleOT[] = this.serviciosSeleccionados.map((servicio: Servicio) => ({
      id_ot: this.id_ot, // Asegúrate de que newOrderId esté definido
      id_serv: servicio.id_serv!,
      fecha_detalle: new Date(),
      desc_detalle: servicio.nom_serv!,
      rut_usuario: this.form.get('rut_usuario')?.value,
    }));
  
    console.log('DetalleOT data:', JSON.stringify(detalleOTData, null, 2));
  
    const detalleOTResponses: DetalleOT[] = []; // Almacenará las respuestas de detalleOT
  
    try {
      // Itera sobre cada detalle OT
      for (const detalle of detalleOTData) {
        const existingDetalleOT = await this.detalleOTService
          .getListDetalleOTByOT(detalle.id_ot!, detalle.id_serv!)
          .toPromise()
          .catch((error) => {
            if (error.status === 404) {
              return null; // No detalleOT found, proceed to create
            }
            throw error; // Rethrow other errors
          });
  
        if (existingDetalleOT) {
          // Update existing detalleOT
          const updateDetalleOT = await this.detalleOTService
            .updateDetalleOT(detalle.id_ot!, detalle.id_serv!, detalle)
            .toPromise();
  
          if (!updateDetalleOT) throw new Error('Failed to update detalleOT');
          detalleOTResponses.push(updateDetalleOT); // Agregar a las respuestas
        } else {
          // Create a new detalleOT
          const newDetalleOT = await this.detalleOTService.saveDetalleOT(detalle).toPromise();
  
          if (!newDetalleOT) throw new Error('Failed to create detalleOT');
          console.log('New detalleOT created:', newDetalleOT);
          detalleOTResponses.push(newDetalleOT); // Agregar a las respuestas
        }
      }
  
      return detalleOTResponses; // Devuelve todas las respuestas de detalleOT
    } catch (error) {
      console.error('Error creating or updating the detalleOT:', error);
      throw error;
    }
  }
  
  
  async editProduct(): Promise<void> {
    this.loading = true;

    if (this.isSubmitting) return; // Si ya se está enviando, no hacer nada
    this.isSubmitting = true; // Desactivar el botón

    try {

      const detalleOT = await this.createOrUpdateDetalleOT();



      // Log the JSON representation of the order

      const id = this.form.get('id_ot')?.value; // Asegúrate de obtener el ID de la orden de trabajo (ot)

      // Utiliza updateOrder en lugar de saveOrder

      this.loading = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error creating order:', error);
      this.loading = false;
      // Handle error (e.g., show error message to user)
    }

    setTimeout(() => {
      // Lógica de éxito o error aquí
      console.log(this.orderDetails);
      console.log("Orden de trabajo guardada");
      this.isSubmitting = false; // Rehabilitar el botón después de completar
    }, 2000); // Simulación de un retraso de 2 segundos

  }


  // ... (resto del código sin cambios)


  
  



  deleteDetalleOT(id_ot: number, id_serv: number) {
    this.detalleOTService.deleteDetalleOT(id_ot, id_serv).subscribe({
      next: () => {
        console.log('DetalleOT deleted successfully');
      },
    });
  }



  



  
  getOrderIdFromUrl(): number {
    const urlSegments = window.location.pathname.split('/');
    return Number(urlSegments[urlSegments.length - 1]); // Asegúrate de que este índice sea correcto
  }

  

}

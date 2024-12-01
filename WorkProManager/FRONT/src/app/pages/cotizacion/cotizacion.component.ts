import { Component } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';  // Importa FormularioComponent

@Component({
  selector: 'app-cotizacion',
  standalone: true,  // Esto permite que el componente sea standalone
  template: '<app-formulario></app-formulario>',  // Usa el template directo con el selector de FormularioComponent
  styleUrls: ['./cotizacion.component.css'],
  imports: [FormularioComponent]  // Importa FormularioComponent aquí
})
export class CotizacionComponent {
  // Lógica de CotizacionComponent
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewOtComponent } from './new-ot.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({

  selector: 'app-new-ot',

  templateUrl: './new-ot.component.html',

  styleUrls: ['./new-ot.component.css']

})
export class NewOtModule {
  serviciosSeleccionados: any;
  operacion: string = 'Crear'; // or any appropriate default value


  // existing properties and methods



  eliminarServicio(servicio: any): void {

    // Implement the logic to remove the service from the list

    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(s => s !== servicio);

  }

}

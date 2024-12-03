import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component'; // Importa el componente
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule


@NgModule({
 declarations: [
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Agrega ReactiveFormsModule en los imports
    FormsModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class AppModule { }

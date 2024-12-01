import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component'; // Importa el componente
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule

@NgModule({
 declarations: [
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Agrega ReactiveFormsModule en los imports
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

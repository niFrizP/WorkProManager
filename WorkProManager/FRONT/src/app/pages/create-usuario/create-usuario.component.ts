import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CreateTrabajadorComponent } from '../../components/create-usuario/create-usuario.component';


@Component({
  selector: 'app-create-usuario',
  standalone: true,
  template: '<app-create-trabajador></app-create-trabajador>',
  styleUrls: ['./create-usuario.component.css'],
  imports: [CreateTrabajadorComponent]
})
export class CreateUsuarioComponent { }

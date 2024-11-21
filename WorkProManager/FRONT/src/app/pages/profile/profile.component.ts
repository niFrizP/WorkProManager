import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuarioForm: FormGroup;
  rut_storage: number = 0;
  isEditMode: boolean = false; // Controla el modo de edición

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nom_usu: [''],
      ap_usu: [''],
      email_usu: [''],
      cel_usu: [''],
      password: [''],
      rut_usuario: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.rut_storage = this.authService.getIdLocal() ?? 0;
    this.loadProfile();
  }

  loadProfile(): void {
    this.usuarioService.getUsuario(this.rut_storage).subscribe(
      (data: Usuario) => {
        this.usuarioForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching usuario', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.usuarioForm.disable(); // Desactiva el formulario en modo estático
    } else {
      this.usuarioForm.enable(); // Activa el formulario en modo de edición
    }
  }

  guardarCambios(): void {
    if (this.isEditMode) {
      const updatedUsuario = this.usuarioForm.getRawValue();
      this.usuarioService.updateUsuarioRegular(updatedUsuario).subscribe(
        (response) => {
          console.log('Usuario actualizado', response);
          this.toggleEditMode(); // Cambia a modo estático después de guardar
        },
        (error) => {
          console.error('Error actualizando usuario', error);
        }
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  standalone: true,
  selector: 'app-user-registration-form',
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-title>Registro de Usuario</mat-card-title>
        <mat-card-content>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>RUT</mat-label>
              <input matInput formControlName="rut_usuario" type="number">
              <mat-error *ngIf="userForm.get('rut_usuario')?.hasError('required')">RUT es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dígito Verificador</mat-label>
              <input matInput formControlName="d_veri_usu" maxlength="1">
              <mat-error *ngIf="userForm.get('d_veri_usu')?.hasError('required')">Dígito Verificador es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nom_usu">
              <mat-error *ngIf="userForm.get('nom_usu')?.hasError('required')">Nombre es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Apellido</mat-label>
              <input matInput formControlName="ap_usu">
              <mat-error *ngIf="userForm.get('ap_usu')?.hasError('required')">Apellido es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email_usu" type="email">
              <mat-error *ngIf="userForm.get('email_usu')?.hasError('required')">Email es requerido</mat-error>
              <mat-error *ngIf="userForm.get('email_usu')?.hasError('email')">Email no válido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
              <mat-error *ngIf="userForm.get('password')?.hasError('required')">Contraseña es requerida</mat-error>
              <mat-error *ngIf="userForm.get('password')?.hasError('minlength')">Mínimo 8 caracteres</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Celular</mat-label>
              <input matInput formControlName="cel_usu" type="number">
              <mat-error *ngIf="userForm.get('cel_usu')?.hasError('required')">Celular es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Rol</mat-label>
              <mat-select formControlName="id_rol">
                <mat-option [value]="1">Administrador</mat-option>
                <mat-option [value]="2">Tecnico</mat-option>
                <mat-option [value]="3">Gestor</mat-option>
              </mat-select>
              <mat-error *ngIf="userForm.get('id_rol')?.hasError('required')">Rol es requerido</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">Registrar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    mat-card {
      max-width: 400px;
      width: 100%;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 15px;
    }
    button {
      width: 100%;
    }
  `],
  imports: [ MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, ReactiveFormsModule ]
})
export class CreateUsuarioComponent implements OnInit {
  userForm: FormGroup;
  usuarios: Usuario[] = [];
  form: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {
    this.userForm = this.fb.group({
      rut_usuario: ['', [Validators.required]],
      d_veri_usu: ['', [Validators.required, Validators.maxLength(1)]],
      nom_usu: ['', [Validators.required]],
      ap_usu: ['', [Validators.required]],
      email_usu: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cel_usu: ['', [Validators.required]],
      id_rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Here you would typically send the form data to your backend
      this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
        duration: 3000
      });
    }
  }


  loadUsers(): void {
    this.usuarioService.getListUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  private async createOrUpdateUsuario(): Promise<Usuario> {
    const usuarioData: Usuario = {
        rut_usuario: this.form.get('rut_usuario')?.value,
        d_veri_usu: this.form.get('d_veri_usu')?.value,
        nom_usu: this.form.get('nom_usu')?.value,
        ap_usu: this.form.get('ap_usu')?.value,
        email_usu: this.form.get('email_usu')?.value,
        password: this.form.get('password')?.value,
        cel_usu: this.form.get('cel_usu')?.value,
        id_rol: this.form.get('id_rol')?.value
    };

    console.log('Usuario data:', JSON.stringify(usuarioData, null, 2));

    try {
        // Attempt to get the existing user
        const existingUsuario = await this.usuarioService.getUsuario(usuarioData.rut_usuario!).toPromise().catch((error) => {
            if (error.status === 404) {
                return null; // No user found, proceed to create
            }
            throw error; // Rethrow other errors
        });

        if (existingUsuario) {
            // Update existing user
            const updatedUsuario = await this.usuarioService.updateUsuario(usuarioData.rut_usuario!, usuarioData).toPromise();
            if (!updatedUsuario) throw new Error('Failed to update user');
            return updatedUsuario;
        } else {
            // Create a new user
            console.log('Attempting to create new user:', usuarioData);
            return new Promise((resolve, reject) => {
                this.usuarioService.saveUsuario(usuarioData).subscribe({
                    next: (newUsuario) => {
                        console.log('New user created:', newUsuario);
                        resolve(newUsuario);
                    },
                    error: (error) => {
                        console.error('Error creating user:', error);
                        reject(error);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error al crear o actualizar el usuario:', error);
        throw error;
    }}


}
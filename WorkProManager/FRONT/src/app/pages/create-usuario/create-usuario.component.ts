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
  templateUrl: './create-usuario.component.html',
  styles: ['create-usuario.component.css'],
  imports: [ MatCardModule, MatInputModule ,MatSelectModule, MatButtonModule, MatSnackBarModule, ReactiveFormsModule ]
})
export class CreateUsuarioComponent implements OnInit {
  userForm: FormGroup;
  usuarios: Usuario[] = [];
  form: FormGroup = new FormGroup({});

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
      this.createOrUpdateUsuario().then(
        (usuario) => {
          this.snackBar.open('Usuario registrado o actualizado con éxito', 'Cerrar', {
            duration: 3000
          });
          console.log('Usuario creado o actualizado:', usuario);
        }
      ).catch(
        (error) => {
          this.snackBar.open('Error al registrar o actualizar el usuario', 'Cerrar', {
            duration: 3000
          });
          console.error('Error en la operación:', error);
        }
      );
    } else {
      this.snackBar.open('Por favor, complete el formulario correctamente', 'Cerrar', {
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
      rut_usuario: this.userForm.get('rut_usuario')?.value,
      d_veri_usu: this.userForm.get('d_veri_usu')?.value,
      nom_usu: this.userForm.get('nom_usu')?.value,
      ap_usu: this.userForm.get('ap_usu')?.value,
      email_usu: this.userForm.get('email_usu')?.value,
      password: this.userForm.get('password')?.value,
      cel_usu: this.userForm.get('cel_usu')?.value,
      id_rol: this.userForm.get('id_rol')?.value
    };
  
    console.log('Usuario data:', JSON.stringify(usuarioData, null, 2));
  
    try {
      const existingUsuario = await this.usuarioService.getUsuario(usuarioData.rut_usuario!).toPromise().catch((error) => {
        if (error.status === 404) {
          return null;
        }
        throw error;
      });
  
      if (existingUsuario) {
        const updatedUsuario = await this.usuarioService.updateUsuario(usuarioData.rut_usuario!, usuarioData).toPromise();
        if (!updatedUsuario) throw new Error('Failed to update user');
        return updatedUsuario;
      } else {
        return new Promise((resolve, reject) => {
          this.usuarioService.saveUsuario(usuarioData).subscribe({
            next: (newUsuario) => {
              resolve(newUsuario);
            },
            error: (error) => {
              reject(error);
            }
          });
        });
      }
    } catch (error) {
      console.error('Error al crear o actualizar el usuario:', error);
      throw error;
    }
  }
  


}
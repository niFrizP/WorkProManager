import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Trabajador } from '../../interfaces/trabajador';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TrabajadorService } from '../../services/trabajador.service';
import { getTrabajadores } from '../../../../../BACK/src/controllers/trabajador';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class CreateTrabajadorComponent implements OnInit {
  userForm: FormGroup;
  trabajador: Trabajador[] = [];
  form: FormGroup = new FormGroup({});
  Trabajador: any[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private trabajadorService: TrabajadorService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      rut_trab: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      d_veri_trab: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9kK]$')]],
      nom_trab: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+$')]],
      ape_trab: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]+$')]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      id_rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();  
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.userForm.valid) {
      this.createOrUpdateTrabajador().then(
        (trabajador) => {
          this.snackBar.open('trabajador registrado o actualizado con éxito', 'Cerrar', {
            duration: 3000
          });
          console.log('trabajador creado o actualizado:', trabajador);
          this.router.navigate(['/usuarios']);
        }
      ).catch(
        (error) => {
          this.snackBar.open('Error al registrar o actualizar el trabajador', 'Cerrar', {
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
    this.trabajadorService.getTecnicos().subscribe(
      (data) => {
        this.Trabajador = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  private async createOrUpdateTrabajador(): Promise<Trabajador> {
    const trabajadorData: Trabajador = {
      rut_trab: this.userForm.get('rut_trab')?.value,
      d_veri_trab: this.userForm.get('d_veri_trab')?.value,
      nom_trab: this.userForm.get('nom_trab')?.value,
      ape_trab: this.userForm.get('ape_trab')?.value,
      clave: this.userForm.get('clave')?.value,
      id_rol: this.userForm.get('id_rol')?.value,
      activo: true // or set the appropriate value
    };

    try {
      const existingtrabajador = await this.trabajadorService.createTrabajador(trabajadorData).toPromise().catch((error) => {
        if (error.status === 404) {
          return null;
        }
        throw error;
      });

      if (existingtrabajador) {
        const updatedtrabajador = await this.trabajadorService.updateTrabajador(trabajadorData.rut_trab!.toString(), trabajadorData).toPromise();
        if (!updatedtrabajador) throw new Error('Failed to update user');
        return updatedtrabajador;
      } else {
        return new Promise((resolve, reject) => {
          this.trabajadorService.createTrabajador(trabajadorData).subscribe({
            next: (newtrabajador: Trabajador) => {
              resolve(newtrabajador);
            },
            error: (error: any) => {
              reject(error);
            }
          });
        });
      }
    } catch (error) {
      console.error('Error al crear o actualizar el trabajador:', error);
      throw error;
    }
  }
}

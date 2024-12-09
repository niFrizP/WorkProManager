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
  roles: any[] = [];

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
    this.loadRoles();
  }

  // Lógica para enviar el formulario
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.userForm.valid) {
      try {
        // Crear directamente el trabajador sin verificar su existencia
        await this.postTrabajador();
        this.snackBar.open('Trabajador creado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      } catch (error) {
        this.snackBar.open('Error al crear trabajador', 'Cerrar', { duration: 3000 });
        console.error('Error en el proceso de creación:', error);
      }
    } else {
      this.snackBar.open('Por favor, complete el formulario correctamente', 'Cerrar', { duration: 3000 });
    }
  }


  // Cargar usuarios desde el servicio
  loadUsers(): void {
    this.trabajadorService.getTecnicos().subscribe(
      (data: any) => {
        this.Trabajador = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Cargar roles desde el servicio
  loadRoles(): void {
    const idRol = 1; // Replace with the appropriate id_rol value
    this.trabajadorService.getTrabajadorRol(idRol).subscribe(
      (data: Trabajador) => {
        this.roles = [data];  // Asignar los roles al array
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }

  // Método para crear un trabajador
  private async postTrabajador(): Promise<Trabajador> {
    const trabajadorData: Trabajador = {
      rut_trab: this.userForm.get('rut_trab')?.value,
      d_veri_trab: this.userForm.get('d_veri_trab')?.value,
      nom_trab: this.userForm.get('nom_trab')?.value,
      ape_trab: this.userForm.get('ape_trab')?.value,
      clave: this.userForm.get('clave')?.value, // El backend se encarga de encriptar
      id_rol: this.userForm.get('id_rol')?.value,
      activo: true
    };

    try {
      const newTrabajador = await this.trabajadorService.postTrabajador(trabajadorData).toPromise();
      if (!newTrabajador) throw new Error('Error al crear trabajador');
      return newTrabajador;
    } catch (error) {
      console.error('Error al crear trabajador:', error);
      throw error;
    }
  }

  // Método para actualizar un trabajador
  private async updateTrabajador(rut_trab: string): Promise<Trabajador> {
    const trabajadorData: Trabajador = {
      rut_trab: this.userForm.get('rut_trab')?.value,
      d_veri_trab: this.userForm.get('d_veri_trab')?.value,
      nom_trab: this.userForm.get('nom_trab')?.value,
      ape_trab: this.userForm.get('ape_trab')?.value,
      clave: this.userForm.get('clave')?.value, // El backend se encarga de encriptar
      id_rol: this.userForm.get('id_rol')?.value,
      activo: true
    };

    try {
      const updatedTrabajador = await this.trabajadorService.updateTrabajador(rut_trab, trabajadorData).toPromise();
      if (!updatedTrabajador) throw new Error('Error al actualizar trabajador');
      return updatedTrabajador;
    } catch (error) {
      console.error('Error al actualizar trabajador:', error);
      throw error;
    }
  }

  // Método para eliminar un trabajador
  private async deleteTrabajador(rut_trab: string): Promise<void> {
    try {
      await this.trabajadorService.deleteTrabajador(rut_trab).toPromise();
    } catch (error) {
      console.error('Error al eliminar trabajador:', error);
      throw error;
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetData = {
    rut_trab: '',
    password: '',
    confirmPassword: ''
  };
  
  rutInvalido = false;
  passwordsDoNotMatch = false;

  constructor(
    private trabajadorService: TrabajadorService,
    private router: Router
  ) {}

  onSubmit() {
    // Validar que las contraseñas coincidan
    this.passwordsDoNotMatch = this.resetData.password !== this.resetData.confirmPassword;
    
    if (this.passwordsDoNotMatch || this.rutInvalido) {
      return;
    }

    // Limpia el RUT
    const rutLimpio = this.resetData.rut_trab.replace(/[.-]/g, '');

    this.trabajadorService.resetPassword(rutLimpio, this.resetData.password)
      .subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
          alert('Contraseña actualizada exitosamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error completo:', error);
          alert('Error al actualizar la contraseña');
        }
      });
  }
}

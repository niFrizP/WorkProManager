// reset-password.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetData = {
    rut_trab: '',
    newPassword: '',
    confirmNewPassword: '',
    d_veri_trab: ''
  };

  rutInvalido = false;
  passwordsDoNotMatch = false;

  constructor(
    private trabajadorService: TrabajadorService,
    private router: Router
  ) { }

  onSubmit() {
    // Validación de contraseñas
    this.passwordsDoNotMatch = this.resetData.newPassword !== this.resetData.confirmNewPassword;
    this.rutInvalido = !/^\d{7,8}-[\dkK]$/.test(this.resetData.rut_trab);

    if (this.passwordsDoNotMatch || this.rutInvalido) {
      alert('Por favor, revisa que las contraseñas coincidan y que el RUT sea válido');
      return;
    }

    // Limpiar el RUT, eliminando puntos y guiones
    const rutLimpio = this.resetData.rut_trab.replace(/[.-]/g, '');

    if (rutLimpio.length < 8) {
      alert('RUT inválido, por favor revisa el formato');
      return;
    }

    const numeroRut = rutLimpio.slice(0, -1);
    const digitoVerificador = rutLimpio.slice(-1);

    // Llamar al servicio para actualizar la contraseña
    this.trabajadorService.updatePassword(numeroRut, digitoVerificador, this.resetData.newPassword).subscribe({
      next: (response) => {
        alert('Contraseña actualizada correctamente');
        this.router.navigate(['/login']);  // Redirigir al login tras éxito
      },
      error: (err) => {
        console.error('Error al actualizar contraseña', err);
        alert('Ocurrió un error al actualizar la contraseña');
      }
    });
  }
}

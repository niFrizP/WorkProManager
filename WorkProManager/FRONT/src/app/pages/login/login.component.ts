import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: [
    `
      .caja-glass {
        background-color: rgba(255, 255, 255, 0.7) !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        border-radius: 10px;
      }

      .fixed {
        z-index: 50;
      }

      .bg-white {
        opacity: 0.95;
      }

      .animate__bounce {
        animation: bounce 1s ease;
      }

      .animate__fadeIn {
        animation: fadeIn 0.5s ease;
      }

      .animate__fadeOut {
        animation: fadeOut 0.5s ease;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `
  ]
})
export class LoginComponent {
  rut_trab: string = '';
  clave: string = '';
  showErrorModal: boolean = false;
  errorMessages: string = '';
  showSuccessModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Llamada al servicio de autenticación
    this.authService.login({ rut_trab: this.rut_trab, clave: this.clave }).subscribe(
      (res) => {
        // Mostrar notificación de éxito
        this.showSuccessModal = true;
        setTimeout(() => {
          this.showSuccessModal = false;
          // Redirigir al usuario en caso de éxito
          this.router.navigate(['/home']);
        }, 2000);
      },
      (err) => {
        // Mostrar el error en caso de fallo
        this.errorMessages = 'Error al iniciar sesión: ' + err.error.msg;
        this.showErrorModal = true;
      }
    );
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  run_login: string = '';        // Se asegura de que sea string
  login_contra: string = '';     // Para almacenar la contraseña
  loginError: string = '';       // Para mostrar los errores de login
  showErrorModal: boolean = false; // Mostrar el modal de error
  errorMessages: string = '';    // Para mensajes de error personalizados

  constructor(
    private authService: AuthService, // Usamos AuthService para manejar la autenticación
    private router: Router             // Para redirigir después de iniciar sesión
  ) { }

  // Método que se llama cuando el usuario envía el formulario de inicio de sesión
  onSubmit() {
    const loginData = {
      run: this.run_login,
      password: this.login_contra,
    };

    // Llamamos al método iniciarSesion del AuthService
    this.authService.iniciarSesion(loginData.run, this.login_contra).subscribe(
      (response) => {
        // Verificar si la respuesta contiene los datos esperados
        if (response && response.rut_usuario && response.id_rol) {
          // Guardar los datos del usuario (rut_usuario e id_rol) en el servicio
          this.authService.saveUserData(response.rut_usuario, response.id_rol);

          // Redirigir al usuario a la página de inicio (home)
          this.router.navigate(['/home']).then(() => {
            window.location.reload(); // Recargar la página después de la redirección
          });
        } else {
          this.showErrorModal = true; // Si no hay datos válidos, mostrar el modal de error
          this.errorMessages = 'Error al obtener los datos del usuario';
        }
      },
      (error) => {
        // Mostrar el modal de error en caso de fallo en la autenticación
        this.showErrorModal = true;
        // Mostrar mensaje de error personalizado según el código de error
        this.errorMessages =
          error.status === 401
            ? 'Usuario o contraseña incorrectos'
            : 'Error al iniciar sesión';
        this.loginError = error; // Guardar el error para fines de depuración
        console.error('Error de autenticación:', error); // Mostrar el error en la consola
      }
    );
  }

  // Método para cerrar el modal de error
  closeErrorModal() {
    this.showErrorModal = false; // Ocultar el modal de error
  }
}

// login.component.ts (Componente Angular)
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  run_login: any = '';
  login_contra: string = '';
  loginError: string = '';
  usuario: Usuario[] = [];
  showErrorModal: boolean = false; // Muestra el modal de error 
  errorMessages: string = ''; // Mensaje de error


  constructor(private http: HttpClient,
    private usuarioService: UsuarioService,
    private router: Router, 
    private authService: AuthService 
  ) { }

  onSubmit() {
    let loginData = {
      run: this.run_login,
      password: this.login_contra,
    };

    this.usuarioService.login(loginData.run, loginData.password).subscribe(
      (data) => {
        this.usuario = [data];
        console.log(this.usuario);
        this.router.navigate(['/home']).then(() => {
          window.location.reload();  // Recarga la página
        });

      },
      /* Manejo de errores */
      // Si el error es 401, muestra un mensaje de credenciales incorrectas 
      // Si no, muestra un mensaje de error genérico
      (error) => {
        this.showErrorModal = true; // Muestra el modal de error
        this.errorMessages =
          error.status === 401
            ? 'Usuario o contraseña incorrectos'
            : 'Error al iniciar sesión';
        this.loginError = error; // Guarda el error
        console.log(this.loginError); // Imprime el error en la consola
      }
    );
    // Verifica el token del usuario
    this.authService.verificarToken().subscribe({
      next: (data) => {
        // Guarda los datos de usuario
        this.authService.saveUserData(data.rut_usuario, data.id_rol);
        console.log('Usuario verificado:', data);
      },
      error: (err) => {
        console.error('Error al verificar el token:', err);
      },
    });
  }
  // Cierra el modal de error
  closeErrorModal() {
    this.showErrorModal = false; // Oculta el modal de error
  }
}

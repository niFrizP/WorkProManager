// login.component.ts (Componente Angular)
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  run_login: number = 0;
  login_contra: string = '';
  loginError: string = '';
  usuario: Usuario[] = [];


  constructor(private http: HttpClient, private usuarioService: UsuarioService, private router: Router,private authService:AuthService) {}

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
      (error) => {
        this.loginError = error;
        console.log(this.loginError);
      }
    );

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



}}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarOpen = false;
  resources: any[] = [];
  userRole: number | null = null; // Variable para almacenar el rol del usuario
  userRut: string | null = null; // Variable para almacenar el RUT del usuario

  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('Sidebar Component Initialized');
    this.getUserRole(); // Cargar rol y rut del usuario y inicializar los recursos
  }

  // Obtener el rol y rut del usuario desde el backend
  getUserRole() {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.userRole = response.userRole;
        this.userRut = response.userRut;
        this.initializeResources(); // Inicializa los recursos basados en el rol
      },
      (error) => {
        console.error('Error al obtener el rol del usuario', error);
        this.userRole = null; // En caso de error, el rol será nulo
      }
    );
  }

  // Inicializar los recursos según el rol del usuario
  initializeResources() {
    if (this.userRole === null) {
      return; // Si el rol no está disponible, no hacer nada
    }
    console.log('User Role:', this.userRole); // Verifica el rol del usuario

    // Define los recursos con roles permitidos
    this.resources = [
      { name: 'Inicio', link: './home', icon: 'fas fa-home', requiredRoles: [1, 2, 3] },
      { name: 'Ordenes', link: './ordenes', icon: 'fas fa-box', requiredRoles: [1, 2, 3] },
      { name: 'Usuarios', link: './usuarios', icon: 'fas fa-user', requiredRoles: [1] },
      { name: 'Cotización', link: './cotizacion', icon: 'fas fa-dollar-sign', requiredRoles: [1, 3] },
      { name: 'Marca', link: './marca', icon: 'fas fa-copyright', requiredRoles: [1] },
      { name: 'Servicios', link: './servicios', icon: 'fas fa-toolbox', requiredRoles: [1] },
      { name: 'Causa', link: './causa', icon: 'fas fa-scroll', requiredRoles: [1] },
    ];

    // Filtra los recursos en función del rol del usuario
    this.resources = this.resources.filter(resource =>
      resource.requiredRoles ? resource.requiredRoles.includes(this.userRole) : true
    );

    console.log('Filtered Resources:', this.resources); // Verifica los recursos filtrados
  }

  // Función para alternar la visibilidad del sidebar en pantallas pequeñas
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Función para refrescar los recursos
  public refreshSidebar() {
    console.log('Refreshing Sidebar...');
    this.initializeResources(); // Llama a la función para refrescar los recursos
  }
}

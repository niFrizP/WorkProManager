import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieManagementService } from '../../services/cookie.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarOpen = false;
  resources: any[] = [];



  constructor(public authService: AuthService, public cookieService: CookieManagementService) {
    this.initializeResources();
  }

  ngOnInit(): void {
    console.log('Sidebar Component Initialized');

    this.initializeResources();

  }

  initializeResources() {
    const userRole = this.authService.getRolIdLocal() // Obtén el rol del usuario actual
    console.log('User Role:', userRole); // Verifica el rol del usuario

    // Define los recursos con roles permitidos
    this.resources = [
      { name: 'Inicio', link: './home', icon: 'fas fa-home', requiredRoles: [1, 2, 3] },
      { name: 'Ordenes', link: './orders', icon: 'fas fa-box', requiredRoles: [1, 2, 3] },
      { name: 'Usuarios', link: './usuarios', icon: 'fas fa-user', requiredRoles: [1 ] },
      { name: 'Reportes', link: './reportes', icon: 'fas fa-chart-line', requiredRoles: [1, 2, 3] },
      { name: 'Aprobaciones', link: './aprobaciones', icon: 'fas fa-check', requiredRoles: [1 ] },
      { name: 'Cotización', link: './cotizacion', icon: 'fas fa-dollar-sign', requiredRoles: [1, 3 ] },
    ];

    // Filtra los recursos en función del rol del usuario
    this.resources = this.resources.filter(resource =>
      resource.requiredRoles ? resource.requiredRoles.includes(userRole) : true
    );

    console.log('Filtered Resources:', this.resources); // Verifica los recursos filtrados

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public refreshSidebar() {
    console.log('Refreshing Sidebar...');
    this.initializeResources(); // Llama a la función para refrescar los recursos
  }
}

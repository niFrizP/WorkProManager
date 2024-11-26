import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieManagementService } from '../../services/cookie.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarOpen = false;
  resources: any[] = [];
  array: any[] = [];
  contar: number = 0;
  contarReportes: number = 0;
  contarFinalizadas: number = 0;
  contarRechazadas: number = 0;
  contarTecnico: number = 0;
  contarTecnicoReportes: number = 0;


  count: number = 0;
  constructor(public authService: AuthService, public cookieService: CookieManagementService, public orderService: OrderService) {
    this.initializeResources();
  }

  ngOnInit(): void {
    console.log('Sidebar Component Initialized');

    this.contarNotificaciones()
    this.contarNotificacionesReportes()
    this.contarNotifiacionesFinalizadas()
    this.contarNotificacionesRechazadas()
    this.countOrderNotificationsCotizacionesByRut()
    this.countOrderNotificacionesReportesByRut()

    this.initializeResources();

  }

  contarNotificaciones() {
    this.orderService.countOrderNotifications().subscribe((data) => {
      this.contar = data.count;
      console.log('Conteo de notificaciones:', this.contar);
    });

  }


  countOrderNotificacionesReportesByRut() {
    const rut = this.authService.getIdLocal();
    this.orderService.countOrderNotificationsReportesByRut(rut ?? 0).subscribe((data) => {
      this.contarTecnicoReportes = data.count;
      console.log('Conteo de notificaciones:', this.contarTecnicoReportes);
    }
    );
  }

  countOrderNotificationsCotizacionesByRut() {
    const rut = this.authService.getIdLocal();
    this.orderService.countOrderNotificationsCotizacionesByRut(rut ?? 0).subscribe((data) => {
      this.contarTecnico = data.count;
      console.log('Conteo de notificaciones:', this.count);
    });
  }

  contarNotificacionesReportes() {
    this.orderService.countOrderNotificationsReportes().subscribe((data) => {
      this.contarReportes = data.count;
      console.log('Conteo de notificaciones:', this.contar);
    });
  }

  contarNotifiacionesFinalizadas() {
    this.orderService.countOrderNotificationsFinalizadas().subscribe((data) => {
      this.contarFinalizadas = data.count;
      console.log('Conteo de notificaciones:', this.contarFinalizadas);
    });
  }

  contarNotificacionesRechazadas() {
    this.orderService.countOrderNotificationsRechazadas().subscribe((data) => {
      this.contarRechazadas = data.count;
      console.log('Conteo de notificaciones:', this.contarRechazadas);
    });
  }


  initializeResources() {
    const userRole = this.authService.getRolIdLocal() // Obtén el rol del usuario actual
    console.log('User Role:', userRole); // Verifica el rol del usuario


    // Define los recursos con roles permitidos
    this.resources = [
      { name: 'Inicio', link: './home', icon: 'fas fa-home', requiredRoles: [1, 2, 3] },
      { name: 'Ordenes', link: './orders', icon: 'fas fa-box', requiredRoles: [1, 2, 3] },
      { name: 'Usuarios', link: './usuarios', icon: 'fas fa-user', requiredRoles: [1] },
      { name: 'Cotización', link: './cotizacion', icon: 'fas fa-dollar-sign', requiredRoles: [1, 3] },
      { name: 'Marca', link: './marca', icon: 'fas fa-check', requiredRoles: [1] },
      { name: 'Servicios', link: './servicios', icon: 'fas fa-check', requiredRoles: [1] },
      { name: 'Causa', link: './causa', icon: 'fas fa-check', requiredRoles: [1] },
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

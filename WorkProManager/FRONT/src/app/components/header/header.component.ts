import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/autenticacion.service';


@Component({
  selector: 'app-header',
  standalone: true,
  template: '<app-header></app-header>',
  imports: [CommonModule, RouterModule],
  providers: [TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Array<string> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Escuchar los eventos de cambio de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  goBack(): void {
    this.location.back();
  }





  // Función recursiva para generar el breadcrumb
  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<string> = []
  ): Array<string> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        breadcrumbs.push(routeURL);
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Redirigir al login después de un logout exitoso
        this.router.navigate(['/login']);  // Asegúrate de importar Router y de tener acceso a él
      },
      error: (err) => {
        console.error('Error durante el logout:', err);
      }
    });
  }
  

}

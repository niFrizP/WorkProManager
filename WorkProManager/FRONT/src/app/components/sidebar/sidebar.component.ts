import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarOpen = false;

  resources = [
    { name: 'Inicio', link: './home', icon: 'fas fa-home' },
    { name: 'Ordenes', link: './orders', icon: 'fas fa-box' },
    { name: 'Usuarios', link: './usuarios', icon: 'fas fa-plus' },
    { name: 'Perfil', link: './profile', icon: 'fas fa-user' },
    { name: 'Reportes', link: './reportes', icon: 'fas fa-chart-line' },
    { name: 'Aprobaciones', link: './aprobaciones', icon: 'fas fa-plus' },
  ];
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}

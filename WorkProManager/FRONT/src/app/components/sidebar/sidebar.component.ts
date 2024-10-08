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
  resources = [
    { name: 'Inicio', link: './home', icon: 'fas fa-home' },
    { name: 'Ordenes', link: './orders', icon: 'fas fa-box' },
    { name: 'Perfil', link: './profile', icon: 'fas fa-user' },
    { name: 'Nueva OT', link: './new-ot', icon: 'fas fa-plus' },
  ];

  // Propiedad para controlar el estado de colapsado
  isCollapsed = false;

  // Método para alternar entre colapsado/expandido
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}

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
  ];
}

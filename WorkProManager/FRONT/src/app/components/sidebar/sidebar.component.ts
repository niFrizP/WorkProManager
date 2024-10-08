import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  resources = [
    { name: 'login', link: './login' },
    { name: 'home', link: './home' },
    { name: 'orders', link: './orders' },
    { name: 'profile', link: './profile' },
  ];
}

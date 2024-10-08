import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

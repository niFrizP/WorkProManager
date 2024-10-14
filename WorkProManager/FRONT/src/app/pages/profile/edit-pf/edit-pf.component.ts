import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-pf',
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
],
  templateUrl: './edit-pf.component.html',
  styleUrl: './edit-pf.component.css'
})
export class EditPfComponent {
  profileImage: string = 'https://via.placeholder.com/150'; // Imagen de ejemplo
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  editAvatar() {
    // Aquí puedes agregar la funcionalidad para abrir un modal o cualquier otro flujo para cambiar la imagen de perfil
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      (fileInput as HTMLElement).click();
    }
  }

  onSubmit() {
    // Aquí puedes manejar la lógica para guardar el perfil actualizado
    const updatedProfile = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password ? this.password : null, // Solo actualiza si se cambia la contraseña
    };

    console.log('Perfil actualizado:', updatedProfile);

  }

}

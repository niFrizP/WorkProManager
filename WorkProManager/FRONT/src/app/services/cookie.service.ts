import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieManagementService {
  getAccessToken(): string | null {
    return this.getCookie('access_token'); // Asegúrate de que este nombre coincida con el que usas
  }

  public getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue !== undefined ? cookieValue : null;
    }
    return null;
  }
}

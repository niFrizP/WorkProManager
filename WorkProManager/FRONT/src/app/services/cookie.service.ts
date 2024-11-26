import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieManagementService {
  getAccessToken(): string | null {
    return this.getCookie('access_token'); 
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

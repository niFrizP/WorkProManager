import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/login/';
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.myApiUrl}/login`, data, { withCredentials: true });
 }

 getUserProfile(): Observable<any> {
    return this.http.get(`${this.myApiUrl}/profile`, { withCredentials: true });
 }

 logout(): Observable<any> {
    return this.http.post(`${this.myApiUrl}/logout`, {}, { withCredentials: true });
 }

 setToken(token: string) {
  localStorage.setItem('token', token);
}

}
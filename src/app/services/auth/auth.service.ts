import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.apiUrl;
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(userObj: User) {
    return this.http.post<any>(this.url + "/api/User/authenticate", userObj);
  }

  signup(userObj: User) {
    return this.http.post<any>(this.url + "/api/User/register", userObj);
  }

  storeJWT(token: string) {
    localStorage.setItem('jwt', token);
  }

  getJWT() {
    return localStorage.getItem('jwt');
  }

  decodeJWT() {
    const jwtHelperService = new JwtHelperService();
    this.userPayload = jwtHelperService.decodeToken(this.getJWT()!);
    return jwtHelperService.decodeToken(this.getJWT()!);
  }

  getMail() {
    if (this.userPayload) {
      return this.userPayload.email;
    }
  }

  getRole() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getJWT();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}

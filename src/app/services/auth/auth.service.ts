import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { UserToken } from 'src/app/models/user-token.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.apiUrl;
  private jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(userObj: User) {
    return this.http.post<any>(this.url + "/api/user/authenticate", userObj);
  }

  signup(userObj: User) {
    return this.http.post<any>(this.url + "/api/user/register", userObj);
  }

  refreshToken(userToken: UserToken) {
    return this.http.post<any>(this.url + "/api/user/refresh-token", userToken);
  }

  resetPassword(email: string) {
    return this.http.post<any>(this.url + "/api/user/reset-password-token/" + email, {});
  }

  checkResetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(this.url + "/api/user/check-reset-pass-token", resetPassword);
  }

  changePassword(UserObj: User) {
    return this.http.post<any>(this.url + "/api/user/change-password", UserObj);
  }

  storeJWT(accessToken: string, refreshToken: string) {
    localStorage.setItem('jwt', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getJWT() {
    return localStorage.getItem('jwt');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  decodeJWT() {
    return this.jwtHelperService.decodeToken(this.getJWT()!);
  }

  getMail() {
      return this.decodeJWT().email;
  }

  getRole() {
      return this.decodeJWT().role;
  }

  isLoggedIn(): boolean {
    return !!this.getJWT();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { UserProgram } from 'src/app/models/user-program.model';
import { UserToken } from 'src/app/models/user-token.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.apiUrl + '/api/user';
  private jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userObj: User) {
    return this.http.post<any>(this.url + "/authenticate", userObj);
  }

  signup(userObj: User) {
    return this.http.post<any>(this.url + "/register", userObj);
  }

  refreshToken(userToken: UserToken) {
    return this.http.post<any>(this.url + "/refresh-token", userToken);
  }

  resetPassword(email: string) {
    return this.http.post<any>(this.url + "/reset-password-token/" + email, {});
  }

  checkResetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(this.url + "/check-reset-pass-token", resetPassword);
  }

  changePassword(UserObj: User) {
    return this.http.put<any>(this.url + "/change-password", UserObj);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/" + id);
  }

  getByMail(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/get-by-mail/" + id);
  }

  create(user: User) {
    return this.http.post<any>(this.url + "/create", user);
  }

  payment(user: UserProgram) {
    return this.http.post<any>(this.url + "/payment", user);
  }

  update(user: User) {
    return this.http.put<any>(this.url + "/update", user);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url + "/" + id);
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
    this.router.navigate(['login']);
  }
}

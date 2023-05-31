import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(userObj: User) {
    return this.http.post<any>(this.url + "/api/User/authenticate", userObj);
  }

  signup(userObj: User) {
    return this.http.post<any>(this.url + "/api/User/register", userObj);
  }
}

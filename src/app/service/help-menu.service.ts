import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpMenuService {

  url="https://localhost:7189/api/SupportMenu";

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.url)
  }
}

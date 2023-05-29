import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportMenu } from '../../models/support-menu.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportMenuService {

  url: string = environment.apiUrl + "/api/SupportMenu";

  constructor(private http: HttpClient) { }

  getAll(): Observable<SupportMenu[]> {
    return this.http.get<SupportMenu[]>(this.url);
  }

  get(supportMenuID: string): Observable<SupportMenu> {
    return this.http.get<SupportMenu>(this.url + "/" + supportMenuID);
  }

  create(supportMenu: SupportMenu): Observable<SupportMenu> {
    return this.http.post<SupportMenu>(this.url, supportMenu);
  }

  update(supportMenu: SupportMenu): Observable<SupportMenu> {
    return this.http.put<SupportMenu>(this.url, supportMenu);
  }

  delete(id: string): Observable<SupportMenu> {
    return this.http.delete<SupportMenu>(this.url + "/" + id);
  }
}

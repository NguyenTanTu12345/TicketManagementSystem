import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportMenu } from '../../models/support-menu.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportMenuService {

  url: string = environment.apiUrl + "/api/support-menu";

  constructor(private http: HttpClient) { }

  getAll(): Observable<SupportMenu[]> {
    return this.http.get<SupportMenu[]>(this.url);
  }

  get(id: string): Observable<SupportMenu> {
    return this.http.get<SupportMenu>(this.url + "/" + id);
  }

  create(supportMenu: SupportMenu) {
    return this.http.post<any>(this.url + "/create", supportMenu);
  }

  createRange(supportMenus: SupportMenu[]) {
    return this.http.post<any>(this.url + "/create-range", supportMenus);
  }

  update(supportMenu: SupportMenu) {
    return this.http.put<any>(this.url + "/update", supportMenu);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url + "/" + id);
  }
}

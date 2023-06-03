import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models/program.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  url: string = environment.apiUrl + "/api/program";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.url);
  }

  get(id: string): Observable<Program> {
    return this.http.get<Program>(this.url + "/" + id);
  }

  create(program: Program) {
    return this.http.post<any>(this.url + "/create", program);
  }

  createRange(programs: Program[]) {
    return this.http.post<any>(this.url + "/create-range", programs);
  }

  update(program: Program) {
    return this.http.put<any>(this.url + "/update", program);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProgram } from 'src/app/models/list-program.model';
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
  
  getListProgram(): Observable<ListProgram[]> {
    return this.http.get<ListProgram[]>(this.url + "/get-list-program");
  }

  create(program: Program) {
    return this.http.post<any>(this.url + "/create", program);
  }

  userLike(program: Program) {
    return this.http.post<any>(this.url + "/user-like", program);
  }

  alarm(program: Program) {
    return this.http.post<any>(this.url + "/alarm", program);
  }

  createRange(programs: any[]) {
    return this.http.post<any>(this.url + "/create-range", programs);
  }

  update(program: Program) {
    return this.http.put<any>(this.url + "/update", program);
  }
}

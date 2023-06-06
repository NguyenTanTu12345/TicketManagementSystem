import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartObject } from 'src/app/models/chart-object.model';
import { ListProgram } from 'src/app/models/list-program.model';
import { ProgramDate } from 'src/app/models/program-date.model';
import { Program } from 'src/app/models/program.model';
import { UserProgram } from 'src/app/models/user-program.model';
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

  getUserLike(id: string): Observable<Program[]> {
    return this.http.get<Program[]>(this.url + "/user-like/" + id);
  }

  getAlarm(id: string): Observable<UserProgram[]> {
    return this.http.get<UserProgram[]>(this.url + "/alarm/" + id);
  }

  getTicket(mail: string): Observable<UserProgram[]> {
    return this.http.get<UserProgram[]>(this.url + "/ticket/" + mail);
  }

  getByDate(id: number): Observable<Program[]> {
    return this.http.get<Program[]>(this.url + "/get-by-date/" + id);
  }
  
  getListProgram(): Observable<ListProgram[]> {
    return this.http.get<ListProgram[]>(this.url + "/get-list-program");
  }

  getProgramDate(): Observable<ProgramDate[]> {
    return this.http.get<ProgramDate[]>(this.url + "/program-date");
  }

  getChart(): Observable<ChartObject[]> {
    return this.http.get<ChartObject[]>(this.url + "/chart");
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

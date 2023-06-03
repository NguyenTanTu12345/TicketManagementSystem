import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserScheduleService {

  url: string = environment.apiUrl + "/api/user-schedule";

  constructor(private http: HttpClient) { }

  getAll(id: string): Observable<UserSchedule> {
    return this.http.get<UserSchedule>(this.url + "/get-all/" + id);
  }

  get(id: string): Observable<UserSchedule> {
    return this.http.get<UserSchedule>(this.url + "/" + id);
  }

  create(userSchedule: UserSchedule) {
    return this.http.post<any>(this.url + "/create", userSchedule);
  }

  update(userSchedule: UserSchedule) {
    return this.http.put<any>(this.url + "/update", userSchedule);
  }
}

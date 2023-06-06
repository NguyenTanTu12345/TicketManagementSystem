import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { environment } from 'src/environments/environment';
import { History } from 'src/app/models/history.model';

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

  getSchedule(mail: string): Observable<UserSchedule[]> {
    return this.http.get<UserSchedule[]>(this.url + "/get-schedule/" + mail);
  }

  getTicketScanner(str: string): Observable<UserSchedule> {
    return this.http.get<UserSchedule>(this.url + "/ticket-scanner/" + str);
  }

  getHistory(mail: string): Observable<History[]> {
    return this.http.get<History[]>(this.url + "/history/" + mail);
  }

  create(userSchedule: UserSchedule) {
    return this.http.post<any>(this.url + "/create", userSchedule);
  }

  checkDate(userSchedule: UserSchedule) {
    return this.http.post<any>(this.url + "/check-date", userSchedule);
  }

  checkQRCode(userSchedule: UserSchedule) {
    return this.http.post<any>(this.url + "/check-qrcode", userSchedule);
  }

  update(userSchedule: UserSchedule) {
    return this.http.put<any>(this.url + "/update", userSchedule);
  }
}

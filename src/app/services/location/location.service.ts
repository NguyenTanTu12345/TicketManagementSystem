import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url: string = environment.apiUrl + "/api/Location";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url);
  }

  get(id: string): Observable<Location> {
    return this.http.get<Location>(this.url + "/" + id);
  }

  create(locationType: Location): Observable<Location> {
    return this.http.post<Location>(this.url, locationType);
  }

  update(locationType: Location): Observable<Location> {
    return this.http.put<Location>(this.url, locationType);
  }

  delete(id: string): Observable<Location> {
    return this.http.delete<Location>(this.url + "/" + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url: string = environment.apiUrl + "/api/location";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url);
  }

  getByType(id: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.url + "/get-by-type/" + id);
  }

  get(id: string): Observable<Location> {
    return this.http.get<Location>(this.url + "/" + id);
  }

  create(location: Location){
    return this.http.post<any>(this.url + "/create", location);
  }

  userLike(location: Location) {
    return this.http.post<any>(this.url + "/user-like", location);
  }

  createRange(locations: Location[]) {
    return this.http.post<any>(this.url + "/create-range", locations);
  }

  update(location: Location) {
    return this.http.put<any>(this.url+ "/update", location);
  }
}

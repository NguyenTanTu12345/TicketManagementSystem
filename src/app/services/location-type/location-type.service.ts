import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationType } from 'src/app/models/location-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {

  url: string = environment.apiUrl + "/api/LocationType";

  constructor(private http: HttpClient) { }

  getAll(): Observable<LocationType[]> {
    return this.http.get<LocationType[]>(this.url);
  }

  get(id: string): Observable<LocationType> {
    return this.http.get<LocationType>(this.url + "/" + id);
  }

  create(locationType: LocationType): Observable<LocationType> {
    return this.http.post<LocationType>(this.url + "/create", locationType);
  }

  update(locationType: LocationType): Observable<LocationType> {
    return this.http.put<LocationType>(this.url + "/update", locationType);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ListProgram } from 'src/app/models/list-program.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  url: string = environment.apiUrl + "/api/artist";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url);
  }

  get(id: string): Observable<Artist> {
    return this.http.get<Artist>(this.url + "/" + id);
  }

  getListProgram(): Observable<ListProgram[]> {
    return this.http.get<ListProgram[]>(this.url + "/get-list-program");
  }

  create(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.url + "/create", artist);
  }

  update(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(this.url + "/update", artist);
  }
}

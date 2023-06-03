import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url: string = environment.apiUrl + "/api/news";

  constructor(private http: HttpClient) { }

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(this.url);
  }

  get(id: string): Observable<News> {
    return this.http.get<News>(this.url + "/" + id);
  }

  create(news: News){
    return this.http.post<any>(this.url + "/create", news);
  }

  createRange(news: News[]) {
    return this.http.post<any>(this.url + "/create-range", news);
  }

  userLike(news: News) {
    return this.http.post<any>(this.url + "/user-like", news);
  }

  update(news: News) {
    return this.http.put<any>(this.url+ "/update", news);
  }
}

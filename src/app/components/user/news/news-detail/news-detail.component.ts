import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { News } from 'src/app/models/news.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {

  news: News = {
    newsId: '',
    newsContent: '',
    newsDate: null,
    newsTitle: '',
    newsImagePath: '',
    accessToken: ''
  };

  constructor(
    private newsService: NewsService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.newsService.get(id).subscribe({
            next: (res) => {
              this.news = res;
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  like() {
    if (this.authService.isLoggedIn()) {
      this.news.accessToken = this.authService.getJWT() ?? '';
      this.newsService.userLike(this.news).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: 'Create Successful~', duration: 4000 });
        }
      })
    }
  }
}

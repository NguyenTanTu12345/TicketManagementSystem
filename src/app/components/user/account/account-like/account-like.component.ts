import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/models/program.model';
import { LocationService } from 'src/app/services/location/location.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { Location } from 'src/app/models/location.model';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-account-like',
  templateUrl: './account-like.component.html',
  styleUrls: ['./account-like.component.css']
})
export class AccountLikeComponent {

  locations: Location[] = [];
  programs: Program[] = [];
  news: News[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private locationService: LocationService,
    private programService: ProgramService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) { 
          this.locationService.getUserLike(id).subscribe({
            next: (res) => {
              this.locations = res;
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });

          this.programService.getUserLike(id).subscribe({
            next: (res) => {
              this.programs = res;
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });

          this.newsService.getUserLike(id).subscribe({
            next: (res) => {
              this.news = res;
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }
}

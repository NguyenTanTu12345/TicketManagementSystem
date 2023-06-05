import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent {

  constructor(
    private activedRoute: ActivatedRoute
  ) {}

  abc: string = '';
  ngOnInit(): void  {
    const paramValue = this.activedRoute.snapshot.queryParamMap.get("errorCode");
    console.log(paramValue);
  }
}

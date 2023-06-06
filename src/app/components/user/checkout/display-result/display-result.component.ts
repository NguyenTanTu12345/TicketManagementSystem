import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent {

  myQRCode: string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.toast.success({ detail: "SUCCESS", summary: 'Thanh toán thành công~', duration: 4000 });
    const paramValue = this.activedRoute.snapshot.queryParamMap.get("extraData");
    this.myQRCode = paramValue + "";
  }
}

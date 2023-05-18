import { Component, OnInit } from '@angular/core';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/service/support-menu.service';

@Component({
  selector: 'app-list-support-menu',
  templateUrl: './list-support-menu.component.html',
  styleUrls: ['./list-support-menu.component.css']
})
export class SupportMenuComponent implements OnInit{

  supportMenus: SupportMenu[] = [];

  constructor(private supportMenuService: SupportMenuService){  }

  ngOnInit(): void {
    this.supportMenuService.getAll().subscribe({
      next: data => {
        this.supportMenus = data;
      },
      error: response => {
        console.log(response);
      }
    })
  }
}

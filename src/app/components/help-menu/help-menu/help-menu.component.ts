import { Component, OnInit } from '@angular/core';
import { HelpMenuService } from 'src/app/service/help-menu.service';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.css']
})
export class HelpMenuComponent {

  supportmenus:any;

  constructor(private supportmenuData: HelpMenuService){
    this.supportmenuData.GetAll().subscribe((data) =>{
      console.warn(data);
      this.supportmenus = data;
    })
  }
}

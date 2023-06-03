import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';

@Component({
  selector: 'app-support-menu',
  templateUrl: './support-menu.component.html',
  styleUrls: ['./support-menu.component.css']
})
export class SupportMenuComponent {


  supportMenu: SupportMenu = {
    supportMenuId: 0,
    supportMenuContent: '',
    supportMenuTitle: '',
    userId: '',
    accessToken: ''
  };

  constructor(
    private supportMenuService: SupportMenuService,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.supportMenuService.get(id).subscribe({
            next: (res) => {
              this.supportMenu = res
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

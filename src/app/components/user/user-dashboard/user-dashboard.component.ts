import { Component, OnInit } from '@angular/core';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  mail: any;
  supportMenu: SupportMenu[] = [];

  constructor(
    private authService: AuthService,
    private supportMenuService: SupportMenuService
  ) {}

  ngOnInit(): void {
    this.mail = this.authService.getMail();
    this.supportMenuService.getAll().subscribe({
      next: (res) => {
        this.supportMenu = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  signOut() {
    this.authService.signOut();
  }
}

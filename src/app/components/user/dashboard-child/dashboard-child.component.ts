import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-child',
  templateUrl: './dashboard-child.component.html',
  styleUrls: ['./dashboard-child.component.css']
})
export class DashboardChildComponent {

  constructor(
    private authService: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}

  goAccount() {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(['/user/dashboard/account']);
    }
    else {
      this.toast.info({ detail: "INFO", summary: 'Bạn cần đăng nhập để thực hiện chức năng này', duration: 4000 });
      this.route.navigate(['login']);
    }
  }
}

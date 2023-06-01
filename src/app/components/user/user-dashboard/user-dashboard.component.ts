import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  mail: any;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mail = this.authService.getMail();
  }

  signOut() {
    this.authService.signOut();
  }
}

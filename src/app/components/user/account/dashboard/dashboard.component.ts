import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userObj: User = {
    userId: '',
    userPassword: '',
    mail: '',
    phoneNumber: '',
    userState: true,
    cccd: '',
    fullName: '',
    dateOfBirth: new Date(Date.now()),
    roleId: '',
    accessToken: ''
  };
  
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserInfor();
  }

  getUserInfor() {
    if (this.authService.isLoggedIn()) {
      console.log(this.authService.getMail())
      this.authService.getByMail(this.authService.getMail()).subscribe({
        next: (res) => {
          this.userObj = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}

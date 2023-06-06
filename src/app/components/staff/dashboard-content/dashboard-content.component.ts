import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { UserScheduleService } from 'src/app/services/user-schedule/user-schedule.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {

  userSchedule: UserSchedule[] = [];

  constructor(
    private programService: ProgramService,
    private locationService: LocationService,
    private userScheduleService: UserScheduleService,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getAllSchedule();
  }

  getAllSchedule() {
    if (this.authService.isLoggedIn()) {
      this.userScheduleService.getSchedule(this.authService.getMail()).subscribe({
        next: (res) => {
          this.userSchedule = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  checkDate(id: number) {
    if (this.authService.isLoggedIn()) {
      this.userSchedule[id].userScheduleDate = new Date(Date.now());
      this.userSchedule[id].accessToken = this.authService.getJWT() ?? '';
      this.userSchedule[id].listProgram1 = [];
      this.userSchedule[id].listProgram2 = [];
      this.userScheduleService.checkDate(this.userSchedule[id]).subscribe({
        next: (res) => {
          this.router.navigate(['staff/dashboard/ticket-scanner/' + this.userSchedule[id].programId.trim() + "@" + this.userSchedule[id].userId.trim()]);
        },
        error: (err) => {
          console.log(err);
          this.toast.warning({ detail: "WARNING", summary: 'Not Right Time', duration: 4000 });
        }
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }
}

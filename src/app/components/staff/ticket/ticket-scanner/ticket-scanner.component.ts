import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserScheduleService } from 'src/app/services/user-schedule/user-schedule.service';

@Component({
  selector: 'app-ticket-scanner',
  templateUrl: './ticket-scanner.component.html',
  styleUrls: ['./ticket-scanner.component.css']
})
export class TicketScannerComponent {

  userSchedule: UserSchedule = {
    programId: '',
    programName: '',
    userId: '',
    fullName: '',
    userScheduleTime: '',
    userScheduleDate: null,
    listProgram1: [],
    listProgram2: [],
    accessToken: ''
  };

  constructor(
    private userScheduleService: UserScheduleService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let str = params.get('str');
        if (str) {
          this.getTicketScanner(str);
        }
      }
    });
  }

  getTicketScanner(str: string) {
    this.userScheduleService.getTicketScanner(str).subscribe({
      next: (res) => {
        this.userSchedule = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.pause(); // Detect once and pause scan!
    console.log(e[0].value);
    this.userSchedule.listProgram1 = [];
    this.userSchedule.listProgram2 = [];
    this.userSchedule.fullName = e[0].value;
    this.userSchedule.userScheduleDate = new Date(Date.now());
    this.userSchedule.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userSchedule);
    this.userScheduleService.checkQRCode(this.userSchedule).subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: 'Verify successful~', duration: 4000 });
      },
      error: (err) => {
        this.toast.error({ detail: "ERROR", summary: 'Invalid Ticket~', duration: 4000 });
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserScheduleService } from 'src/app/services/user-schedule/user-schedule.service';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent {

  customForm!: FormGroup;
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
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      userScheduleTime: ['', Validators.required],
      userScheduleDate: ['', Validators.required]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.userScheduleService.get(id).subscribe({
            next: (res) => {
              this.userSchedule = res;
              console.log(res);
              this.customForm.controls['userScheduleTime']?.setValue(res.userScheduleTime);
              this.customForm.controls['userScheduleDate']?.setValue(res.userScheduleDate);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  update() {
    this.userSchedule.userScheduleDate = this.customForm.controls['userScheduleDate']?.value;
    this.userSchedule.userScheduleTime = this.customForm.controls['userScheduleTime']?.value;
    this.userSchedule.listProgram1 = [];
    this.userSchedule.listProgram2 = [];
    this.userSchedule.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userSchedule);
    this.userScheduleService.update(this.userSchedule).subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: "Cập nhật thành công~", duration: 4000 });
        this.router.navigate(["admin/dashboard/list-user/create-user-schedule/"+this.userSchedule.userId]);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err, duration: 4000 });
        console.log(err);
      }
    });
  }
}

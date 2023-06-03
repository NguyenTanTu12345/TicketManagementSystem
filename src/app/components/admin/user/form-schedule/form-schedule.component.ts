import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserSchedule } from 'src/app/models/user-schedule.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserScheduleService } from 'src/app/services/user-schedule/user-schedule.service';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.css']
})
export class FormScheduleComponent implements OnInit {

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
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.getAll(id);
        }
      }
    });
    this.customForm = this.formBuilder.group({
      programId: ['', [Validators.required]],
      userScheduleTime: ['', Validators.required],
      userScheduleDate: ['', Validators.required]
    });
  }

  getAll(id: string) {
    this.userScheduleService.getAll(id).subscribe({
      next: (res) => {
        this.userSchedule = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  create() {
    this.userSchedule.programId = this.customForm.controls['programId']?.value;
    this.userSchedule.userScheduleDate = this.customForm.controls['userScheduleDate']?.value;
    this.userSchedule.userScheduleTime = this.customForm.controls['userScheduleTime']?.value;
    this.userSchedule.programName = '';
    this.userSchedule.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userSchedule);
    this.userScheduleService.create(this.userSchedule).subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: "Tạo mới thành công~", duration: 4000 });
        this.getAll(this.userSchedule.userId);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err, duration: 4000 });
        console.log(err);
      }
    });
  }
}

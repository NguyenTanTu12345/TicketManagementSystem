import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  hide = true;
  isValid = true;
  isCorrect = false;
  btnValue = "Gửi";
  timeLeft: number = 60;
  private resetPasswordObj: ResetPassword = {
    mail: '',
    resetPasswordToken: '',
    timeSend: ''
  }
  private userObj: User = {
    userId: '',
    userPassword: '',
    mail: '',
    phoneNumber: '',
    userState: true,
    cccd: '',
    fullName: '',
    dateOfBirth: null,
    roleId: '',
    accessToken: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      activeCode: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmitEmail() {
    if (this.resetPasswordForm.get('userEmail')?.valid) {
      this.authService.resetPassword(this.resetPasswordForm.get('userEmail')?.value).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
          this.resetPasswordForm.controls['userEmail']?.disable();
          this.isValid = false;
          this.countDown();
        },
        error: (err) => {
          console.log(err.message);
          this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
          this.isValid = true;
        }
      });
    }
  }

  onSubmitCode() {
    if (this.resetPasswordForm.get('activeCode')?.valid) {
      this.resetPasswordObj.mail = this.resetPasswordForm.get('userEmail')?.value;
      this.resetPasswordObj.resetPasswordToken = this.resetPasswordForm.get('activeCode')?.value;
      this.resetPasswordObj.timeSend = new Date(Date.now());
      this.authService.checkResetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
          this.isValid = true;
          this.isCorrect = true;
        },
        error: (err) => {
          console.log(err.message);
          this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
        }
      });
    }
  }

  onChangePassword() {
    if (this.resetPasswordForm.get('activeCode')?.valid && this.resetPasswordForm.get('confirmPassword')?.valid) {
      if (this.resetPasswordForm.get('userPassword')?.value == this.resetPasswordForm.get('confirmPassword')?.value) {
        this.userObj.mail = this.resetPasswordForm.get('userEmail')?.value;
        this.userObj.userPassword = this.resetPasswordForm.get('userPassword')?.value;
        this.authService.changePassword(this.userObj).subscribe({
          next: (res) => {
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
            this.router.navigate(['../login']);
          },
          error: (err) => {
            console.log(err.message);
            this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
          }
        });
      }
      else {
        alert("Mật khẩu và xác nhận phải giống nhau!!!");
      }
    }
  }

  countDown(): void {
    this.timeLeft = 60;
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.btnValue = "Gửi lại";
        this.isValid = true;
      }
    }, 1000)
  }
}

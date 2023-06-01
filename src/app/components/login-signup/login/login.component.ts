import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import ValidateForm from 'src/app/helpers/validate-form';
import { UserToken } from 'src/app/models/user-token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  private userObj: User = {
    userId: '',
    userPassword: '',
    mail: '',
    phoneNumber: null,
    userState: true,
    roleID: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userObj.mail = this.loginForm.value.userEmail;
      this.userObj.userPassword = this.loginForm.value.userPassword;
      this.authService.login(this.userObj).subscribe({
        next: (res) => {
          this.authService.storeJWT(res.accessToken, res.refreshToken);
          const userPayLoad = this.authService.decodeJWT();
          this.toast.success({ detail: "SUCCESS", summary: "Login Successful", duration: 5000 });
          if (userPayLoad.role === "User") {
            this.router.navigate(['../user/dashboard']);
          }
          else if (userPayLoad.role === "Admin") {
            this.router.navigate(['../admin/dashboard']);
          }
        },
        error: (err) => {
          console.log(err);
          this.toast.error({ detail: "ERROR", summary: err?.error.message, sticky: true });
        }
      });
    }
    else {
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import ValidateForm from 'src/app/helpers/validate-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  userObj: User = {
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
          localStorage.setItem('jwt', res.token);
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          this.router.navigate(['../user/dashboard']);
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

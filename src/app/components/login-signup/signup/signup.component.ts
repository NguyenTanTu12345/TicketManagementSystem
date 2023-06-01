import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import ValidateForm from 'src/app/helpers/validate-form';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  hide = true;
  private userObj: User = {
    userId: '',
    userPassword: '',
    mail: '',
    phoneNumber: null,
    userState: true,
    roleID: 'RO01'
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.userObj.mail = this.signupForm.value.userEmail;
      this.userObj.userPassword = this.signupForm.value.userPassword;
      this.authService.signup(this.userObj).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          this.router.navigate(['../login']);
        },
        error: (err) => {
          console.log(err);
          this.toast.error({ detail: "ERROR", summary: err?.error.message, sticky: true });
        }
      });
    }
    else {
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.signupForm);
    }
  }
}

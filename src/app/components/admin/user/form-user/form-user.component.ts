import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent {

  customForm!: FormGroup;
  private userObj: User = {
    userId: '',
    userPassword: '123456',
    mail: '',
    phoneNumber: '',
    userState: true,
    cccd: '',
    fullName: '',
    dateOfBirth: new Date(Date.now()),
    roleId: 'RO03',
    accessToken: ''
  };
  supportMenus: User[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userFullName: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  create() {
    this.userObj.fullName = this.customForm.controls['userFullName']?.value;
    this.userObj.mail = this.customForm.controls['userEmail']?.value;
    this.userObj.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userObj);
    this.authService.create(this.userObj).subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: "Tạo mới thành công~", duration: 4000 });
        this.router.navigate(['admin/dashboard/list-user']);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err, duration: 4000 });
        console.log(err);
      }
    });
  }
}

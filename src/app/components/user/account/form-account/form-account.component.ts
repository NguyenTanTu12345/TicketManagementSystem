import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.css']
})
export class FormAccountComponent {

  customForm!: FormGroup;
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
  supportMenus: User[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      cccd: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) { 
          this.authService.get(id).subscribe({
            next: (res) => {
              this.userObj = res;
              this.customForm.controls['fullName'].setValue(res.fullName);
              this.customForm.controls['cccd'].setValue(res.cccd);
              this.customForm.controls['dateOfBirth'].setValue(res.dateOfBirth);
              this.customForm.controls['phoneNumber'].setValue(Number(res.phoneNumber));
            }
          })
        }
      }
    });
  }

  update() {
    this.userObj.fullName = this.customForm.controls['fullName']?.value;
    this.userObj.phoneNumber = this.customForm.controls['phoneNumber']?.value.toString();
    this.userObj.dateOfBirth = this.customForm.controls['dateOfBirth']?.value;
    this.userObj.cccd = this.customForm.controls['cccd']?.value;
    this.userObj.accessToken = this.authService.getJWT() ?? '';
    console.log(this.userObj);
    this.authService.update(this.userObj).subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: "Cập nhật thành công~", duration: 4000 });
        this.router.navigate(['admin/dashboard/list-user']);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err, duration: 4000 });
        console.log(err);
      }
    });
  }
}

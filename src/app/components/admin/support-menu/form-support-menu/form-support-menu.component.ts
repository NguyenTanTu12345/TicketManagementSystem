import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-form-support-menu',
  templateUrl: './form-support-menu.component.html',
  styleUrls: ['./form-support-menu.component.css']
})
export class FormSupportMenuComponent implements OnInit {

  customForm!: FormGroup;
  supportMenu: SupportMenu = {
    supportMenuId: 0,
    supportMenuContent: '',
    supportMenuTitle: '',
    userId: '',
    accessToken: ''
  };
  btnValue: string = "";
  toastMessage: string = "";

  constructor(
    private supportMenuService: SupportMenuService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      supportMenuContent: ['', [Validators.required]],
      supportMenuTitle: ['', Validators.required],
      supportMenuId: ['', null]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.btnValue = "Cập nhật";
          this.toastMessage = "Cập nhật thành công~";
          this.supportMenuService.get(id).subscribe({
            next: (res) => {
              this.customForm.controls['supportMenuId']?.setValue(res.supportMenuId);
              this.customForm.controls['supportMenuContent']?.setValue(res.supportMenuContent);
              this.customForm.controls['supportMenuTitle']?.setValue(res.supportMenuTitle);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
        else {
          this.btnValue = "Thêm";
          this.toastMessage = "Tạo mới thành công~";
        }
      }
    });
  }

  createOrUpdate() {
    if (this.customForm.valid) {
      var result;
      this.supportMenu.supportMenuTitle = this.customForm.controls['supportMenuTitle']?.value;
      this.supportMenu.supportMenuContent = this.customForm.controls['supportMenuContent']?.value;
      this.supportMenu.accessToken = this.authService.getJWT() ?? '';
      if (this.customForm.controls['supportMenuId']?.value == '') {
        result = this.supportMenuService.create(this.supportMenu);
      }
      else {
        this.supportMenu.supportMenuId = this.customForm.controls['supportMenuId']?.value;
        result = this.supportMenuService.update(this.supportMenu);
      }
      result.subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: this.toastMessage, duration: 4000 });
          this.router.navigate(['admin/dashboard/support-menu']);
        },
        error: (err) => {
          this.toast.success({ detail: "FAILURE", summary: err.message, duration: 4000 });
          console.log(err);
        }
      });
    }
  }
}

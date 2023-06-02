import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocationType } from 'src/app/models/location-type.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-location-type',
  templateUrl: './form-location-type.component.html',
  styleUrls: ['./form-location-type.component.css']
})
export class FormLocationTypeComponent implements OnInit {

  customForm!: FormGroup;
  locationType: LocationType = {
    locationTypeId: '',
    locationTypeName: '',
    locationTypePath: '',
    accessToken: ''
  }
  btnValue: string = "";
  toastMessage: string = "";
  mySrc: string = "";

  constructor(
    private locationTypeService: LocationTypeService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      locationTypeId: ['', [Validators.required]],
      locationTypeName: ['', Validators.required]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.locationTypeService.get(id).subscribe({
            next: (res) => {
              this.btnValue = "Cập nhật";
              this.toastMessage = "Cập nhật thành công~";
              this.customForm.controls['locationTypeName']?.setValue(res.locationTypeName);
              this.mySrc = res.locationTypePath;
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
    var result;
    this.locationType.locationTypeName = this.customForm.controls['locationTypeName']?.value;
    this.locationType.locationTypePath = this.mySrc;
    this.locationType.accessToken = this.authService.getJWT() ?? '';
    if (this.customForm.controls['locationTypeId']?.value == '') {
      result = this.locationTypeService.create(this.locationType);
    }
    else {
      this.locationType.locationTypeId = this.customForm.controls['locationTypeId']?.value;
      result = this.locationTypeService.update(this.locationType);
    }
    result.subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: this.toastMessage, duration: 4000 });
        this.router.navigate(['admin/dashboard/location-type']);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
        console.log(err);
      }
    });
  }

  CLOUDINARY_UPLOAD_PRESET1: string = environment.CLOUDINARY_UPLOAD_PRESET1;
  CLOUDINARY_URL: string = environment.CLOUDINARY_URL;

  onChangeFile(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET1);
    fetch(this.CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          var url = data.secure_url;
          this.mySrc = url;
        }
      })
      .catch(err => console.error(err));
  }
}

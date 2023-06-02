import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'c:/Users/ad/source/repos/TicketManagementSystem/TicketManagementSystem_FE/src/app/models/location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';
import { LocationType } from 'src/app/models/location-type.model';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent {

  customForm!: FormGroup;
  location: Location = {
    locationId: '',
    locationName: '',
    locationSummary: '',
    locationContent: '',
    locationImagePath: '',
    locationTypeId: '',
    accessToken: ''
  }
  btnValue: string = "";
  toastMessage: string = "";
  mySrc: string = "";
  locationTypes: LocationType[] = [];

  constructor(
    private locationService: LocationService,
    private locationTypeService: LocationTypeService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.customForm = this.formBuilder.group({
      locationId: ['', [Validators.required]],
      locationName: ['', Validators.required],
      locationSummary: ['', [Validators.required]],
      locationContent: ['', Validators.required],
      locationTypeId: ['', Validators.required]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.locationService.get(id).subscribe({
            next: (res) => {
              this.btnValue = "Cập nhật";
              this.toastMessage = "Cập nhật thành công~";
              this.customForm.controls['locationName']?.setValue(res.locationName);
              this.customForm.controls['locationId']?.setValue(res.locationId);
              this.customForm.controls['locationSummary']?.setValue(res.locationSummary);
              this.customForm.controls['locationContent']?.setValue(res.locationContent);
              this.customForm.controls['locationTypeId']?.setValue(res.locationTypeId);
              this.mySrc = res.locationImagePath;
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

  getAll() {
    this.locationTypeService.getAll().subscribe({
      next: (res) => {
        this.locationTypes = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createOrUpdate() {
    var result;
    this.location.locationName = this.customForm.controls['locationName']?.value;
    this.location.locationSummary = this.customForm.controls['locationSummary']?.value;
    this.location.locationContent = this.customForm.controls['locationContent']?.value;
    this.location.locationTypeId = this.customForm.controls['locationTypeId']?.value;
    this.location.locationImagePath = this.mySrc;
    this.location.accessToken = this.authService.getJWT() ?? '';
    console.log(this.location);
    if (this.customForm.controls['locationId']?.value == '') {
      result = this.locationService.create(this.location);
    }
    else {
      this.location.locationId = this.customForm.controls['locationId']?.value;
      result = this.locationService.update(this.location);
    }
    result.subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: this.toastMessage, duration: 4000 });
        this.router.navigate(['admin/dashboard/list-location']);
      },
      error: (err) => {
        this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
        console.log(err);
      }
    });
  }

  CLOUDINARY_UPLOAD_PRESET2: string = environment.CLOUDINARY_UPLOAD_PRESET2;
  CLOUDINARY_URL: string = environment.CLOUDINARY_URL;

  onChangeFile(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET2);
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

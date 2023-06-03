import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Program } from 'src/app/models/program.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-form-program',
  templateUrl: './form-program.component.html',
  styleUrls: ['./form-program.component.css']
})
export class FormProgramComponent {

  customForm!: FormGroup;
  locations: Location[] = [];
  btnValue: string = "";
  toastMessage: string = "";
  mySrc: string = "";
  program: Program = {
    programId: '',
    programName: '',
    programContent: '',
    programTime: '',
    programTdate: null,
    programFdate: null,
    typeInOff: true,
    programPrice: 0,
    totalTicket: 0,
    programType: true,
    locationId: '',
    imagePaths: '',
    accessToken: ''
  }

  constructor(
    private locationService: LocationService,
    private programService: LocationService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.customForm = this.formBuilder.group({
      programId: ['', null],
      programName: ['', Validators.required],
      programContent: ['', Validators.required],
      programTime: ['', Validators.required],
      programTdate: ['', Validators.required],
      programFdate: ['', Validators.required],
      typeInOff: ['', Validators.required],
      programPrice: ['', Validators.required],
      totalTicket: ['', Validators.required],
      programType: ['', Validators.required],
      locationId: ['', Validators.required],
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.programService.get(id).subscribe({
            next: (res) => {
              this.btnValue = "Cập nhật";
              this.toastMessage = "Cập nhật thành công~";
              //this.customForm.controls['locationTypeName']?.setValue(res.locationTypeName);
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
    this.locationService.getAll().subscribe({
      next: (res) => {
        this.locations = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createOrUpdate() {
    if (this.customForm.valid) {
      var result;
      this.program.programName = this.customForm.controls['programName']?.value;
      this.program.programName = this.customForm.controls['programName']?.value;

      this.program.programContent = this.customForm.controls['programContent']?.value;
      this.program.programTime = this.customForm.controls['programTime']?.value;
      this.program.programTdate = this.customForm.controls['programTdate']?.value;
      this.program.programFdate = this.customForm.controls['programFdate']?.value;
      this.program.typeInOff = this.customForm.controls['typeInOff']?.value;
      this.program.programPrice = this.customForm.controls['programPrice']?.value;
      this.program.totalTicket = this.customForm.controls['totalTicket']?.value;
      this.program.programType = this.customForm.controls['programType']?.value;
      this.program.locationId = this.customForm.controls['locationId']?.value;
      this.program.imagePaths = this.mySrc;

      this.program.accessToken = this.authService.getJWT() ?? '';
      if (this.customForm.controls['programId']?.value == '') {
        console.log(this.program);
        //result = this.programService.create(this.program);
      }
      else {
        //this.locationType.locationTypeId = this.customForm.controls['locationTypeId']?.value;
        //result = this.locationTypeService.update(this.locationType);
      }
      /*result.subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: this.toastMessage, duration: 4000 });
          this.router.navigate(['admin/dashboard/location-type']);
        },
        error: (err) => {
          this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
          console.log(err);
        }
      });*/
    }
  }

  CLOUDINARY_UPLOAD_PRESET5: string = environment.CLOUDINARY_UPLOAD_PRESET5;
  CLOUDINARY_URL: string = environment.CLOUDINARY_URL;

  onChangeFile(event: any) {
    let length = event.target.files.length;
    for (let i = 0; i < length; i++) {
      const formData = new FormData();
      formData.append('file', event.target.files[i]);
      formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET5);
      fetch(this.CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then((data) => {
          if (data.secure_url !== '') {
            let url = data.secure_url;
            if (i == length) {
              this.mySrc += url;
            }
            else {
              this.mySrc += url + "@";
            }
          } else {
            alert('upload thất bại');
          }
        })
        .catch(err => console.error(err));
    }
  }
}
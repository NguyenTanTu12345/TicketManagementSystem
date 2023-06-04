import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Artist } from 'src/app/models/artist.model';
import { ListProgram } from 'src/app/models/list-program.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-artist',
  templateUrl: './form-artist.component.html',
  styleUrls: ['./form-artist.component.css']
})
export class FormArtistComponent {

  customForm!: FormGroup;
  artist: Artist = {
    artistId: '',
    artistName: '',
    artistImagePath: '',
    programId: [],
    accessToken: ''
  };
  btnValue: string = "";
  toastMessage: string = "";
  mySrc: string = "";
  programs: ListProgram[] = [];

  constructor(
    private artistService: ArtistService,
    private programService: ProgramService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      artistId: ['', null],
      artistName: ['', Validators.required],
      programId: ['', Validators.required]
    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.artistService.get(id).subscribe({
            next: (res) => {
              this.btnValue = "Cập nhật";
              this.toastMessage = "Cập nhật thành công~";
              this.customForm.controls['artistName']?.setValue(res.artistName);
              this.customForm.controls['artistId']?.setValue(res.artistId);
              this.mySrc = res.artistImagePath;
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
    this.programService.getListProgram().subscribe({
      next: (res) => {
        this.programs = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createOrUpdate() {
    if (this.customForm.valid) {
      var result;
      this.artist.artistName = this.customForm.controls['artistName']?.value;
      this.artist.programId = this.customForm.controls['programId']?.value;
      this.artist.artistImagePath = this.mySrc;
      this.artist.accessToken = this.authService.getJWT() ?? '';
      if (this.customForm.controls['artistId']?.value == '') {
        result = this.artistService.create(this.artist);
      }
      else {
        this.artist.artistId = this.customForm.controls['artistId']?.value;
        result = this.artistService.update(this.artist);
      }
      result.subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: this.toastMessage, duration: 4000 });
          this.router.navigate(['admin/dashboard/list-artist']);
        },
        error: (err) => {
          this.toast.error({ detail: "FAILURE", summary: err.message, duration: 4000 });
          console.log(err);
        }
      });
    }
  }

  CLOUDINARY_UPLOAD_PRESET3: string = environment.CLOUDINARY_UPLOAD_PRESET3;
  CLOUDINARY_URL: string = environment.CLOUDINARY_URL;

  onChangeFile(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET3);
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

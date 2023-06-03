import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { News } from 'src/app/models/news.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent {

  customForm!: FormGroup;
  news: News = {
    newsId: '',
    newsContent: '',
    newsDate: null,
    newsTitle: '',
    newsImagePath: '',
    accessToken: ''
  }
  btnValue: string = "";
  toastMessage: string = "";
  mySrc: string = "";

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      newsId: ['', null],
      newsContent: ['', Validators.required],
      newsTitle: ['', [Validators.required]],

    });
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.newsService.get(id).subscribe({
            next: (res) => {
              this.btnValue = "Cập nhật";
              this.toastMessage = "Cập nhật thành công~";
              this.customForm.controls['newsId']?.setValue(res.newsId);
              this.customForm.controls['newsContent']?.setValue(res.newsContent);
              this.customForm.controls['newsTitle']?.setValue(res.newsTitle);
              this.mySrc = res.newsImagePath;
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
      this.news.newsContent = this.customForm.controls['newsContent']?.value;
      this.news.newsTitle = this.customForm.controls['newsTitle']?.value;
      this.news.newsImagePath = this.mySrc;
      this.news.newsDate = new Date(Date.now());
      this.news.accessToken = this.authService.getJWT() ?? '';
      console.log(this.news);
      if (this.customForm.controls['newsId']?.value == '') {
        result = this.newsService.create(this.news);
      }
      else {
        this.news.newsId = this.customForm.controls['newsId']?.value;
        result = this.newsService.update(this.news);
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
  }

  CLOUDINARY_UPLOAD_PRESET4: string = environment.CLOUDINARY_UPLOAD_PRESET4;
  CLOUDINARY_URL: string = environment.CLOUDINARY_URL;

  onChangeFile(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET4);
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

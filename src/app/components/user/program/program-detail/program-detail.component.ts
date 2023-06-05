import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Artist } from 'src/app/models/artist.model';
import { Program } from 'src/app/models/program.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { saveAs} from 'file-saver';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent {

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
  };
  arrImage: string[] = [];
  locationName: string = '';
  artist: Artist[] = [];
  selectedDate: Date | null | undefined;
  selectedTime: string = '';

  constructor(
    private artistService: ArtistService,
    private locationService: LocationService,
    private programService: ProgramService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.programService.get(id).subscribe({
            next: (res) => {
              this.program = res;
              let myString = res.imagePaths;
              this.arrImage = myString.split("@");
              this.getLocation(res.locationId);
              this.getAllArtist(res.programId);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  getAllArtist(id: string) {
    this.artistService.getByProgram(id).subscribe({
      next: (res) => {
        this.artist = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLocation(id: string) {
    this.locationService.get(id).subscribe({
      next: (res) => {
        this.locationName = res.locationName;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  like() {
    if (this.authService.isLoggedIn()) {
      this.program.accessToken = this.authService.getJWT() ?? '';
      this.programService.userLike(this.program).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
        },
        error: (err) => {
          this.toast.error({ detail: "FAILURE", summary: err.error?.message, duration: 4000 });
        }
      });
    }
  }

  downloadImage(){
    if (this.arrImage != null) {
      this.arrImage.forEach(element => {
        saveAs(element, this.program.programName + '.png');
      });
    }
  }

  setAlarm () {
    if (this.authService.isLoggedIn()) {
      this.program.programTdate = this.selectedDate ?? new Date(Date.now());
      this.program.programTime = this.selectedTime;
      this.program.accessToken = this.authService.getJWT() ?? '';
      this.programService.alarm(this.program).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
        },
        error: (err) => {
          this.toast.error({ detail: "FAILURE", summary: err.error?.message, duration: 4000 });
        }
      });
    }
  }

  checkout() {
    if (this.authService.isLoggedIn()) {
      this.authService.getByMail(this.authService.getMail()).subscribe({
        next: (res) => {
          if (res.cccd != null && res.phoneNumber != null && res.fullName != null) {
            this.route.navigate(['user/dashboard/checkout/' + this.program.programId]);
          }
          else {
            this.toast.info({ detail: "INFO", summary: 'Bạn cần điền đầy đủ thông tin trước', duration: 4000 });
            this.route.navigate(['user/dashboard/form-account/' + res.userId]);
          }
        }
      })
    }
    else {
      this.toast.info({ detail: "INFO", summary: 'Bạn cần đăng nhập trước', duration: 4000 });
      this.route.navigate(['login']);
    }
  }
}

import { Component } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'c:/Users/ad/source/repos/TicketManagementSystem/TicketManagementSystem_FE/src/app/models/location.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { saveAs} from 'file-saver';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent {

  location: Location = {
    locationId: '',
    locationName: '',
    locationSummary: '',
    locationContent: '',
    locationImagePath: '',
    locationTypeId: '',
    accessToken: ''
  }
  toastMessage: string = "";

  constructor(
    private locationService: LocationService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.locationService.get(id).subscribe({
            next: (res) => {
              this.location = res;
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  like() {
    if (this.authService.isLoggedIn()) {
      this.location.accessToken = this.authService.getJWT() ?? '';
      this.locationService.userLike(this.location).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 4000 });
        },
        error: (err) => {
          console.log(err);
          this.toast.error({ detail: "FAILURE", summary: err.error?.message, duration: 4000 });
        }
      });
    }
  }

  downloadImage(){
    saveAs(this.location.locationImagePath, this.location.locationName+'.png');
  }
}

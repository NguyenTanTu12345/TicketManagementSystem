import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { LocationType } from 'src/app/models/location-type.model';
import { LocationService } from 'src/app/services/location/location.service';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent {

  location: Location = {
    locationId: '',
    locationName: '',
    locationSummary: '',
    locationContent: '',
    locationImagePath: '',
    locationTypeID: ''
  }

  locations: Location[] = [];

  locationTypes: LocationType[] = [];

  constructor(private _locationService: LocationService, private _locationTypeService: LocationTypeService, private _router: Router, private _activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._locationTypeService.getAll().subscribe({
      next: (value) => {
        this.locationTypes = value;
      }
    });
    this._activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this._locationService.get(id).subscribe({
            next: (value) => {
              this.location = value;
            }
          });
        }
        else {
          this._locationService.getAll().subscribe({
            next: (data) => {
              this.locations = data;
            },
            error: (response) => {
              console.log(response);
            }
          });
        }
      }
    });
  }

  generateID(): string {
    let newID = '';
    let index = this.locations.length - 1;
    let item: Location = this.locations[index];
    let lastChar = item.locationId.substring(2, 4);
    let ID = parseInt(lastChar) + 1;
    if (ID < 10) {
      newID = 'LO' + '0' + ID;
    }
    else if (ID > 10) {
      newID = 'LO' + ID;
    }
    return newID;
  }

  createOrUpdate() {
    var result;
    if (this.location.locationId == '') {
      this.location.locationId = this.generateID();
      result = this._locationService.create(this.location);
    }
    else {
      result = this._locationService.update(this.location);
    }
    result.subscribe({
      next: data => {
        this._router.navigate(['location']);
      },
      error: response => {
        console.log(response);
      }
    });
  }

  delete(id: string) {
    this._locationService.delete(id).subscribe({
      next: data => {
        this._router.navigate(['location']);
      },
      error: response => {
        console.log(response);
      }
    });
  }
}

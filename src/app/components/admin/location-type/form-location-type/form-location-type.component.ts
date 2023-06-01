import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationType } from 'src/app/models/location-type.model';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';

@Component({
  selector: 'app-form-location-type',
  templateUrl: './form-location-type.component.html',
  styleUrls: ['./form-location-type.component.css']
})
export class FormLocationTypeComponent implements OnInit {

  locationType: LocationType = {
    locationTypeId: '',
    locationTypeName: '',
    locationTypePath: ''
  }

  locationTypes: LocationType[] = [];

  constructor(private locationTypeService: LocationTypeService, private router: Router
    , private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: params => {
        let id = params.get('id');
        if (id) {
          this.locationTypeService.get(id).subscribe({
            next: value => {
              this.locationType = value;
            }
          });
        }
        else {
          this.locationTypeService.getAll().subscribe({
            next: data => {
              this.locationTypes = data;
            },
            error: response => {
              console.log(response);
            }
          });
        }
      }
    });
  }

  createOrUpdate() {
    var result;
    if (this.locationType.locationTypeId == '') {
      this.locationType.locationTypeId = 'LT03';
      result = this.locationTypeService.create(this.locationType);
    }
    else {
      result = this.locationTypeService.update(this.locationType);
    }
    result.subscribe({
      next: data => {
        this.router.navigate(['location-type']);
      },
      error: response => {
        console.log(response);
      }
    });
  }
}

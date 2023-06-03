import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LocationType } from 'src/app/models/location-type.model';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrls: ['./location-type.component.css']
})
export class LocationTypeComponent {

  displayedColumns: string[] = ['No.'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  locationTypes: LocationType[] = [];

  constructor(
    private locationTypeService: LocationTypeService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.locationTypeService.getAll().subscribe({
      next: (res) => {
        this.locationTypes = res;
        this.dataSource = new MatTableDataSource(this.locationTypes);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

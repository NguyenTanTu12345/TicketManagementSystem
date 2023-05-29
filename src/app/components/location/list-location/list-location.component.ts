import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent {

  displayedColumns: string[] = ['No.', 'lolocationName', 'locationSummary', 'locationTypeID', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  locations: Location[] = [];

  index: number = 0;

  constructor(private _locationService: LocationService){  }

  ngOnInit(): void {
    this._locationService.getAll().subscribe({
      next: (data) => {
        this.locations = data;
        this.dataSource = new MatTableDataSource(this.locations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: response => {
        console.log(response);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

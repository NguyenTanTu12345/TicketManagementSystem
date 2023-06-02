import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationType } from 'src/app/models/location-type.model';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';

@Component({
  selector: 'app-list-location-type',
  templateUrl: './list-location-type.component.html',
  styleUrls: ['./list-location-type.component.css']
})
export class ListLocationTypeComponent {

  displayedColumns: string[] = ['No.', 'locationTypePath', 'locationTypeName', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

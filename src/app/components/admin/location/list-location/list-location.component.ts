import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'c:/Users/ad/source/repos/TicketManagementSystem/TicketManagementSystem_FE/src/app/models/location.model';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent {
  displayedColumns: string[] = ['No.', 'locationImagePath', 'locationName', 'locationSummary', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  locations: Location[] = [];

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.locationService.getAll().subscribe({
      next: (res) => {
        this.locations = res;
        this.dataSource = new MatTableDataSource(this.locations);
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

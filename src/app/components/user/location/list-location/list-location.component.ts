import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent {

  displayedColumns: string[] = ['No.'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  locations: Location[] = [];

  constructor(
    private nlocationService: LocationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.nlocationService.getAll().subscribe({
      next: (res) => {
        this.locations = res;
        this.dataSource = new MatTableDataSource(this.locations);
        this.dataSource.paginator = this.paginator;
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

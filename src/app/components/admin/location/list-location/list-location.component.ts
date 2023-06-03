import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'c:/Users/ad/source/repos/TicketManagementSystem/TicketManagementSystem_FE/src/app/models/location.model';
import { ExcelService } from 'src/app/services/excel/excel.service';
import * as XLSX from 'xlsx';

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
    private locationService: LocationService,
    private excelService: ExcelService
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

  excelData: any;
  importFileExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      this.locationService.createRange(this.excelData).subscribe({
        next: (res) => {
          console.log(res);
          this.getAll();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  exportFileExcel() {
    this.excelService.exportExcelFile(this.locations, 'locations');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

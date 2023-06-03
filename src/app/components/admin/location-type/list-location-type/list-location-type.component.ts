import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationType } from 'src/app/models/location-type.model';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { LocationTypeService } from 'src/app/services/location-type/location-type.service';
import * as XLSX from 'xlsx';

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
    private locationTypeService: LocationTypeService,
    private excelService: ExcelService
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

  excelData: any;
  importFileExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      this.locationTypeService.createRange(this.excelData).subscribe({
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
    this.excelService.exportExcelFile(this.locationTypes, 'location_types');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

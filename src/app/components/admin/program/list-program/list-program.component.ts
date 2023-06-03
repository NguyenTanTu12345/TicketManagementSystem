import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Program } from 'src/app/models/program.model';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ProgramService } from 'src/app/services/program/program.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css']
})
export class ListProgramComponent {

  displayedColumns: string[] = ['No.', 'programName', 'programTdate', 'programFdate', 'status','other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  programs: Program[] = [];

  constructor(
    private programService: ProgramService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.programService.getAll().subscribe({
      next: (res) => {
        this.programs = res;
        this.dataSource = new MatTableDataSource(this.programs);
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
      this.programService.createRange(this.excelData).subscribe({
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
    this.excelService.exportExcelFile(this.programs, 'programs');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

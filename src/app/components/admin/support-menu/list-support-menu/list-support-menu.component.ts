import { Component, OnInit, ViewChild } from '@angular/core';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel/excel.service';

@Component({
  selector: 'app-list-support-menu',
  templateUrl: './list-support-menu.component.html',
  styleUrls: ['./list-support-menu.component.css']
})
export class ListSupportMenuComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'supportMenuTitle', 'supportMenuContent', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  supportMenus: SupportMenu[] = [];

  constructor(
    private supportMenuService: SupportMenuService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.supportMenuService.getAll().subscribe({
      next: (res) => {
        this.supportMenus = res;
        this.dataSource = new MatTableDataSource(this.supportMenus);
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
      this.supportMenuService.createRange(this.excelData).subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportFileExcel() {
    this.excelService.exportExcelFile(this.supportMenus, 'support_menu');
  }

  checkDelete(id: number) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      this.delete(id);
    }
  }

  delete(id: number) {
    this.supportMenuService.delete(id).subscribe({
      next: (res) => {
        this.getAll();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
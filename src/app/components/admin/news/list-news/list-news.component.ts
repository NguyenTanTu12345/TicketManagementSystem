import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { News } from 'src/app/models/news.model';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NewsService } from 'src/app/services/news/news.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent {
  displayedColumns: string[] = ['No.', 'newsImagePath', 'newsTitle', 'newsDate', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  news: News[] = [];

  constructor(
    private newsService: NewsService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.newsService.getAll().subscribe({
      next: (res) => {
        this.news = res;
        this.dataSource = new MatTableDataSource(this.news);
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
      this.newsService.createRange(this.excelData).subscribe({
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
    this.excelService.exportExcelFile(this.news, 'news');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

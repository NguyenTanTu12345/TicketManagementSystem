import { Component, OnInit, ViewChild } from '@angular/core';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-support-menu',
  templateUrl: './list-support-menu.component.html',
  styleUrls: ['./list-support-menu.component.css']
})
export class ListSupportMenuComponent implements OnInit{

  displayedColumns: string[] = ['No.', 'supportMenuTitle', 'supportMenuContent', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  supportMenus: SupportMenu[] = [];

  constructor(
    private supportMenuService: SupportMenuService
    ){  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { SupportMenu } from 'src/app/models/support-menu.model';
import { SupportMenuService } from 'src/app/services/support-menu/support-menu.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-support-menu',
  templateUrl: './list-support-menu.component.html',
  styleUrls: ['./list-support-menu.component.css']
})
export class ListSupportMenuComponent implements OnInit{

  displayedColumns: string[] = ['supportMenuId', 'supportMenuTitle', 'supportMenuContent', 'userId', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  supportMenus: SupportMenu[] = [];

  index: number = 0;

  constructor(private supportMenuService: SupportMenuService){  }

  ngOnInit(): void {
    this.supportMenuService.getAll().subscribe({
      next: data => {
        this.supportMenus = data;
        this.dataSource = new MatTableDataSource(this.supportMenus);
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

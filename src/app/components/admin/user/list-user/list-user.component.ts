import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'fullName', 'mail', 'phoneNumber', 'userState', 'roleId', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: User[] = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.authService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users[0]);
        this.dataSource = new MatTableDataSource(this.users);
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
    if (confirm("Bạn có muốn chuyển người dùng này thành ngưng hoạt động?")) {
      this.delete(id);
    }
  }

  delete(id: number) {
    this.authService.delete(id).subscribe({
      next: (res) => {
        this.getAll();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

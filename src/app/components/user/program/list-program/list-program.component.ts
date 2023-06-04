import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist.model';
import { ListProgram } from 'src/app/models/list-program.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css']
})
export class ListProgramComponent {

  displayedColumns: string[] = ['No.'];
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  dataSource3!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatPaginator) paginator3!: MatPaginator;

  programs: ListProgram[] = [];
  focal: ListProgram[] = [];
  community: ListProgram[] = [];
  artist: Artist[] = [];

  constructor(
    private programService: ProgramService,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.programService.getListProgram().subscribe({
      next: (res) => {
        this.programs = res;
        this.programs.forEach(element => {
          if (element.typeInOff == true) {
            this.focal.push(element);
            console.log(this.focal);
          }
          else {
            this.community.push(element);
          }
        });
        this.dataSource1 = new MatTableDataSource(this.focal);
        console.log(this.dataSource1);
        this.dataSource1.paginator = this.paginator1;

        this.dataSource2 = new MatTableDataSource(this.community);
        this.dataSource2.paginator = this.paginator2;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.artistService.getAll().subscribe({
      next: (res) => {
        this.artist = res;
        this.dataSource3 = new MatTableDataSource(this.artist);
        this.dataSource3.paginator = this.paginator3;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist.model';
import { ListProgram } from 'src/app/models/list-program.model';
import { ProgramDate } from 'src/app/models/program-date.model';
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
  dataSource4!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatPaginator) paginator3!: MatPaginator;
  @ViewChild(MatPaginator) paginator4!: MatPaginator;

  programs: ListProgram[] = [];
  focal: ListProgram[] = [];
  community: ListProgram[] = [];
  artist: Artist[] = [];
  programDates: ProgramDate[] = [];

  constructor(
    private programService: ProgramService,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.getAllProgram();
  }

  getAllProgram() {
    this.programService.getListProgram().subscribe({
      next: (res) => {
        this.programs = res;
        this.programs.forEach(element => {
          if (element.typeInOff == true) {
            this.focal.push(element);
          }
          else {
            this.community.push(element);
          }
        });
        this.dataSource1 = new MatTableDataSource(this.focal);
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2 = new MatTableDataSource(this.community);
        this.dataSource2.paginator = this.paginator2;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onClickArtist() {
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

  onClickProgramDate() {
    this.programService.getProgramDate().subscribe({
      next: (res) => {
        console.log(res);
        this.programDates = res;
        this.dataSource4 = new MatTableDataSource(this.programDates);
        this.dataSource4.paginator = this.paginator4;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getDayOfWeek(dateTime: string): string {
    const date = new Date(dateTime);
    const daysOfWeek = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'];
    const day = daysOfWeek[date.getDay()];
    return day;
  }
  
  getDay(dateTime: string): number {
    const date = new Date(dateTime);
    return date.getDay();
  }

  getMonth(dateTime: string): number {
    const date = new Date(dateTime);
    return date.getMonth();
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

  applyFilter4(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
  }
}
